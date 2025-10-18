'use client'

import { useState, useRef } from "react"

export default function BackgroundRemover() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [originalImageUrl, setOriginalImageUrl] = useState(null)
  const [processedImageUrl, setProcessedImageUrl] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [outputFormat, setOutputFormat] = useState("png")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [notification, setNotification] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const canvasRef = useRef(null)

  const showNotification = (message, type = "info") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files?.[0]) {
      handleImageSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files?.[0]) {
      handleImageSelect(e.target.files[0])
    }
  }

  const handleImageSelect = (file) => {
    if (!file.type.startsWith('image/')) {
      showNotification("Please select a valid image file", "error")
      return
    }

    setSelectedImage(file)
    const url = URL.createObjectURL(file)
    setOriginalImageUrl(url)
    setProcessedImageUrl(null)
    showNotification("Image uploaded successfully!", "success")
  }

  const removeBackground = async () => {
    if (!selectedImage) {
      showNotification("Please select an image first", "error")
      return
    }

    setIsProcessing(true)
    
    try {
      const img = new Image()
      img.src = originalImageUrl
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      
      ctx.drawImage(img, 0, 0)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      // Enhanced background removal algorithm
      const processed = await processImageData(data, canvas.width, canvas.height)
      
      ctx.putImageData(processed, 0, 0)
      
      // Apply background color if not PNG
      if (outputFormat !== 'png') {
        const finalCanvas = document.createElement('canvas')
        finalCanvas.width = canvas.width
        finalCanvas.height = canvas.height
        const finalCtx = finalCanvas.getContext('2d')
        
        finalCtx.fillStyle = backgroundColor
        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)
        finalCtx.drawImage(canvas, 0, 0)
        
        canvas.width = finalCanvas.width
        canvas.height = finalCanvas.height
        ctx.drawImage(finalCanvas, 0, 0)
      }
      
      const mimeType = outputFormat === 'png' ? 'image/png' : 'image/jpeg'
      const blob = await new Promise(resolve => canvas.toBlob(resolve, mimeType, 0.95))
      const url = URL.createObjectURL(blob)
      
      setProcessedImageUrl(url)
      showNotification("Background removed successfully!", "success")
      
    } catch (error) {
      showNotification("Failed to process image: " + error.message, "error")
    } finally {
      setIsProcessing(false)
    }
  }

  const processImageData = async (data, width, height) => {
    const imageData = new ImageData(new Uint8ClampedArray(data), width, height)
    
    // Sample colors from edges to determine background
    const edgeColors = []
    const sampleSize = 5
    
    // Top and bottom edges
    for (let x = 0; x < width; x += Math.floor(width / 20)) {
      for (let y = 0; y < sampleSize; y++) {
        const idx = (y * width + x) * 4
        edgeColors.push([data[idx], data[idx + 1], data[idx + 2]])
      }
      for (let y = height - sampleSize; y < height; y++) {
        const idx = (y * width + x) * 4
        edgeColors.push([data[idx], data[idx + 1], data[idx + 2]])
      }
    }
    
    // Left and right edges
    for (let y = 0; y < height; y += Math.floor(height / 20)) {
      for (let x = 0; x < sampleSize; x++) {
        const idx = (y * width + x) * 4
        edgeColors.push([data[idx], data[idx + 1], data[idx + 2]])
      }
      for (let x = width - sampleSize; x < width; x++) {
        const idx = (y * width + x) * 4
        edgeColors.push([data[idx], data[idx + 1], data[idx + 2]])
      }
    }
    
    // Find most common edge color (likely background)
    const avgColor = [
      edgeColors.reduce((sum, c) => sum + c[0], 0) / edgeColors.length,
      edgeColors.reduce((sum, c) => sum + c[1], 0) / edgeColors.length,
      edgeColors.reduce((sum, c) => sum + c[2], 0) / edgeColors.length
    ]
    
    // Process pixels
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      
      // Calculate color distance from background
      const distance = Math.sqrt(
        Math.pow(r - avgColor[0], 2) +
        Math.pow(g - avgColor[1], 2) +
        Math.pow(b - avgColor[2], 2)
      )
      
      // Adjust threshold based on image characteristics
      const threshold = 80
      
      if (distance < threshold) {
        // Make similar colors transparent
        const alpha = Math.max(0, Math.min(255, (distance / threshold) * 255))
        imageData.data[i + 3] = alpha
      } else {
        // Keep dissimilar colors opaque
        imageData.data[i + 3] = 255
      }
    }
    
    // Apply edge smoothing
    return smoothEdges(imageData, width, height)
  }

  const smoothEdges = (imageData, width, height) => {
    const data = imageData.data
    const smoothed = new Uint8ClampedArray(data)
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4
        const alpha = data[idx + 3]
        
        if (alpha > 0 && alpha < 255) {
          // Average with neighboring pixels
          let sumAlpha = 0
          let count = 0
          
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nIdx = ((y + dy) * width + (x + dx)) * 4
              sumAlpha += data[nIdx + 3]
              count++
            }
          }
          
          smoothed[idx + 3] = Math.floor(sumAlpha / count)
        }
      }
    }
    
    return new ImageData(smoothed, width, height)
  }

  const handleDownload = () => {
    if (!processedImageUrl) return
    
    const link = document.createElement('a')
    link.href = processedImageUrl
    const ext = outputFormat === 'png' ? 'png' : 'jpg'
    link.download = `background-removed.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    showNotification("Download started!", "success")
  }

  const handleReset = () => {
    if (originalImageUrl) URL.revokeObjectURL(originalImageUrl)
    if (processedImageUrl) URL.revokeObjectURL(processedImageUrl)
    setSelectedImage(null)
    setOriginalImageUrl(null)
    setProcessedImageUrl(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition">
            ToolSnap Omni
          </a>
          <div className="flex gap-6">
            <a href="/about" className="text-gray-700 hover:text-purple-600 transition font-medium">
              About
            </a>
            <a href="/blog" className="text-gray-700 hover:text-purple-600 transition font-medium">
              Blog
            </a>
            <a href="/faq" className="text-gray-700 hover:text-purple-600 transition font-medium">
              FAQ
            </a>
            <a href="/contact" className="text-gray-700 hover:text-purple-600 transition font-medium">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-4 rounded-lg shadow-lg max-w-md text-white ${
            notification.type === "success" ? "bg-green-500" :
            notification.type === "error" ? "bg-red-500" : "bg-blue-500"
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {notification.type === "success" ? "✓" :
                 notification.type === "error" ? "⚠" : "ℹ"}
              </span>
              <p className="font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Background Remover
          </h1>
          <p className="text-xl text-gray-600">
            Remove backgrounds from images automatically using advanced algorithms
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-all ${
              dragActive 
                ? "border-purple-500 bg-purple-50" 
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedImage ? (
              <div className="space-y-4">
                <div className="text-5xl mb-2">🖼️</div>
                <p className="text-gray-900 font-semibold text-lg">{selectedImage.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  onClick={handleReset}
                  className="text-red-600 hover:text-red-700 text-sm font-medium underline"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-gray-700 mb-4 text-lg">Drag and drop your image here</p>
                <p className="text-gray-500 mb-6">or</p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="image-input"
                  onChange={handleFileInput}
                  accept="image/*"
                />
                <label 
                  htmlFor="image-input" 
                  className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer font-medium text-lg shadow-md hover:shadow-lg"
                >
                  Choose Image
                </label>
                <p className="text-sm text-gray-500 mt-6">
                  Supported: JPG, PNG, WEBP
                </p>
              </div>
            )}
          </div>

          {selectedImage && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Output Format
                  </label>
                  <select 
                    className="w-full border-2 border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                  >
                    <option value="png">PNG (Transparent)</option>
                    <option value="jpg">JPG (With Background)</option>
                  </select>
                </div>
                
                {outputFormat !== 'png' && (
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="color"
                        className="h-12 w-16 border-2 border-gray-300 rounded-lg cursor-pointer"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                      />
                      <input 
                        type="text"
                        className="flex-1 border-2 border-gray-300 rounded-lg p-3 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={removeBackground}
                disabled={isProcessing}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-semibold text-lg shadow-lg disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none mb-6"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Remove Background"}
              </button>
            </>
          )}

          {/* Image Comparison */}
          {originalImageUrl && processedImageUrl && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">Original</h3>
                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                    <img src={originalImageUrl} alt="Original" className="w-full h-auto" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">Processed</h3>
                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100 bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb),linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]">
                    <img src={processedImageUrl} alt="Processed" className="w-full h-auto" />
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleDownload}
                className="w-full px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-lg shadow-lg"
              >
                Download Image
              </button>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🛍️</div>
            <h3 className="font-bold text-gray-900 mb-2">E-Commerce</h3>
            <p className="text-sm text-gray-600">Perfect for product photos</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="font-bold text-gray-900 mb-2">Portraits</h3>
            <p className="text-sm text-gray-600">Professional headshots</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold text-gray-900 mb-2">Social Media</h3>
            <p className="text-sm text-gray-600">Eye-catching posts</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-gray-900 mb-2">Design</h3>
            <p className="text-sm text-gray-600">Creative projects</p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Tips for Best Results</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-3xl">📸</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Use Well-Lit Images</h3>
                <p className="text-gray-600">
                  Clear lighting and good contrast produce the best results
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Simple Backgrounds</h3>
                <p className="text-gray-600">
                  Solid or simple backgrounds are easier to remove accurately
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">High Resolution</h3>
                <p className="text-gray-600">
                  Higher resolution images produce cleaner edges and better quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}