'use client'

import { useState } from "react"

export default function FileConverter() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [outputFormat, setOutputFormat] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [notification, setNotification] = useState(null)
  const [convertedFile, setConvertedFile] = useState(null)

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
      setSelectedFile(e.dataTransfer.files[0])
      setConvertedFile(null)
      showNotification("File uploaded successfully!", "success")
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
      setConvertedFile(null)
      showNotification("File uploaded successfully!", "success")
    }
  }

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase()
  }

  // Convert image to another format or PDF
  const convertImage = async (file, targetFormat) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          
          const ctx = canvas.getContext('2d')
          
          // White background for formats that don't support transparency
          if (targetFormat === 'JPEG' || targetFormat === 'JPG' || targetFormat === 'PDF') {
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }
          
          ctx.drawImage(img, 0, 0)
          
          if (targetFormat === 'PDF') {
            canvas.toBlob((blob) => {
              if (blob) {
                createPDFFromImage(blob, img.width, img.height)
                  .then(resolve)
                  .catch(reject)
              } else {
                reject(new Error('Failed to create image blob'))
              }
            }, 'image/jpeg', 0.95)
          } else {
            const mimeTypes = {
              'PNG': 'image/png',
              'JPEG': 'image/jpeg',
              'JPG': 'image/jpeg'
            }
            
            const mimeType = mimeTypes[targetFormat] || 'image/png'
            
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Conversion failed'))
              }
            }, mimeType, 0.95)
          }
        }
        
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target.result
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  // Create PDF from image using jsPDF-like approach
  const createPDFFromImage = async (imageBlob, width, height) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const imgData = reader.result.split(',')[1]
        
        // PDF page dimensions (A4: 595x842 points)
        const pageWidth = 595
        const pageHeight = 842
        const margin = 40
        
        // Calculate scaled dimensions to fit page with margins
        const maxWidth = pageWidth - (margin * 2)
        const maxHeight = pageHeight - (margin * 2)
        const scale = Math.min(maxWidth / width, maxHeight / height, 1)
        const scaledWidth = width * scale
        const scaledHeight = height * scale
        
        // Center the image
        const xPos = (pageWidth - scaledWidth) / 2
        const yPos = (pageHeight - scaledHeight) / 2
        
        // Create PDF content
        const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 5 0 R >>
endobj
4 0 obj
<< /XObject << /Im1 6 0 R >> >>
endobj
5 0 obj
<< /Length 58 >>
stream
q
${scaledWidth.toFixed(2)} 0 0 ${scaledHeight.toFixed(2)} ${xPos.toFixed(2)} ${yPos.toFixed(2)} cm
/Im1 Do
Q
endstream
endobj
6 0 obj
<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgData.length} >>
stream
${atob(imgData)}
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000229 00000 n 
0000000278 00000 n 
0000000385 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
${600 + imgData.length}
%%EOF`
        
        const blob = new Blob([pdfContent], { type: 'application/pdf' })
        resolve(blob)
      }
      reader.onerror = () => reject(new Error('Failed to read image data'))
      reader.readAsDataURL(imageBlob)
    })
  }

  // Convert PDF to image (first page only)
  const convertPDFToImage = async (file, targetFormat) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        try {
          // Load PDF.js from CDN
          if (!window.pdfjsLib) {
            const script = document.createElement('script')
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
            document.head.appendChild(script)
            
            await new Promise((res, rej) => {
              script.onload = res
              script.onerror = () => rej(new Error('Failed to load PDF.js'))
            })
            
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
              'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
          }
          
          const pdf = await window.pdfjsLib.getDocument({ data: e.target.result }).promise
          const page = await pdf.getPage(1)
          
          const scale = 2
          const viewport = page.getViewport({ scale })
          
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          
          const ctx = canvas.getContext('2d')
          
          await page.render({
            canvasContext: ctx,
            viewport: viewport
          }).promise
          
          const mimeTypes = {
            'PNG': 'image/png',
            'JPEG': 'image/jpeg',
            'JPG': 'image/jpeg'
          }
          
          const mimeType = mimeTypes[targetFormat] || 'image/png'
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to create image'))
            }
          }, mimeType, 0.95)
          
        } catch (error) {
          reject(new Error('PDF conversion failed: ' + error.message))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read PDF file'))
      reader.readAsArrayBuffer(file)
    })
  }

  // Convert DOCX to PDF (simplified text extraction)
  const convertDOCXToPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        try {
          // Load mammoth.js for DOCX parsing
          if (!window.mammoth) {
            const script = document.createElement('script')
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js'
            document.head.appendChild(script)
            
            await new Promise((res, rej) => {
              script.onload = res
              script.onerror = () => rej(new Error('Failed to load mammoth.js'))
            })
          }
          
          const result = await window.mammoth.extractRawText({ arrayBuffer: e.target.result })
          const text = result.value
          
          const pdfBlob = createTextPDF(text)
          resolve(pdfBlob)
          
        } catch (error) {
          reject(new Error('DOCX conversion failed: ' + error.message))
        }
      }
      
      reader.onerror = () => reject(new Error('Failed to read DOCX file'))
      reader.readAsArrayBuffer(file)
    })
  }

  // Create PDF from text
  const createTextPDF = (text) => {
    const lines = text.split('\n').filter(line => line.trim())
    const pageWidth = 595
    const pageHeight = 842
    const margin = 50
    const lineHeight = 14
    const maxLinesPerPage = Math.floor((pageHeight - margin * 2) / lineHeight)
    
    let yPos = pageHeight - margin
    let content = 'BT\n/F1 11 Tf\n' + lineHeight + ' TL\n'
    
    const escapeText = (txt) => {
      return txt.replace(/\\/g, '\\\\')
                .replace(/\(/g, '\\(')
                .replace(/\)/g, '\\)')
                .replace(/\r/g, '')
    }
    
    let lineCount = 0
    for (const line of lines) {
      if (lineCount >= maxLinesPerPage) break
      
      const wrappedLines = wrapText(line, 70)
      for (const wrappedLine of wrappedLines) {
        if (lineCount >= maxLinesPerPage) break
        content += margin + ' ' + yPos + ' Td\n'
        content += '(' + escapeText(wrappedLine) + ') Tj\n'
        content += 'T*\n'
        yPos -= lineHeight
        lineCount++
      }
    }
    
    content += 'ET'
    
    const pdfDoc = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>
endobj
5 0 obj
<< /Length ${content.length} >>
stream
${content}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000229 00000 n 
0000000337 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + content.length}
%%EOF`
    
    return new Blob([pdfDoc], { type: 'application/pdf' })
  }

  const wrapText = (text, maxLength) => {
    if (text.length <= maxLength) return [text]
    
    const words = text.split(' ')
    const lines = []
    let currentLine = ''
    
    for (const word of words) {
      if ((currentLine + ' ' + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word
      } else {
        if (currentLine) lines.push(currentLine)
        currentLine = word
      }
    }
    if (currentLine) lines.push(currentLine)
    
    return lines
  }

  const handleConvert = async () => {
    if (!selectedFile) {
      showNotification("Please select a file first", "error")
      return
    }
    if (!outputFormat) {
      showNotification("Please select an output format", "error")
      return
    }

    const inputExt = getFileExtension(selectedFile.name)
    
    setIsConverting(true)
    setConvertedFile(null)

    try {
      let convertedBlob
      
      // Image to Image/PDF
      if (['PNG', 'JPG', 'JPEG'].includes(inputExt)) {
        if (['PNG', 'JPG', 'JPEG', 'PDF'].includes(outputFormat)) {
          convertedBlob = await convertImage(selectedFile, outputFormat)
        } else {
          throw new Error('Unsupported conversion')
        }
      }
      // PDF to Image
      else if (inputExt === 'PDF') {
        if (['PNG', 'JPG', 'JPEG'].includes(outputFormat)) {
          convertedBlob = await convertPDFToImage(selectedFile, outputFormat)
        } else {
          throw new Error('PDF can only be converted to PNG, JPG, or JPEG')
        }
      }
      // DOCX to PDF
      else if (inputExt === 'DOCX') {
        if (outputFormat === 'PDF') {
          convertedBlob = await convertDOCXToPDF(selectedFile)
        } else {
          throw new Error('DOCX can only be converted to PDF')
        }
      }
      else {
        throw new Error('Unsupported file type')
      }
      
      const originalName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'))
      const newFileName = originalName + '.' + outputFormat.toLowerCase()
      
      setConvertedFile({
        blob: convertedBlob,
        name: newFileName,
        size: convertedBlob.size,
        url: URL.createObjectURL(convertedBlob)
      })
      
      showNotification('File converted successfully!', "success")
      
    } catch (error) {
      showNotification('Conversion failed: ' + error.message, "error")
      console.error(error)
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!convertedFile) return
    
    const link = document.createElement('a')
    link.href = convertedFile.url
    link.download = convertedFile.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    showNotification("Download started!", "success")
  }

  const handleReset = () => {
    if (convertedFile?.url) {
      URL.revokeObjectURL(convertedFile.url)
    }
    setSelectedFile(null)
    setConvertedFile(null)
    setOutputFormat("")
  }

  const getAvailableFormats = () => {
    if (!selectedFile) return []
    
    const inputExt = getFileExtension(selectedFile.name)
    
    if (['PNG', 'JPG', 'JPEG'].includes(inputExt)) {
      return ['PNG', 'JPG', 'JPEG', 'PDF']
    } else if (inputExt === 'PDF') {
      return ['PNG', 'JPG', 'JPEG']
    } else if (inputExt === 'DOCX') {
      return ['PDF']
    }
    
    return []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-4 rounded-lg shadow-lg max-w-md text-white ${
            notification.type === "success" ? "bg-green-500" :
            notification.type === "error" ? "bg-red-500" :
            "bg-blue-500"
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            File Converter
          </h1>
          <p className="text-xl text-gray-600">
            Convert between PDF, JPEG, PNG, and DOCX instantly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-all ${
              dragActive 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="space-y-3">
                <div className="text-5xl mb-2">📄</div>
                <p className="text-gray-900 font-semibold text-lg">Selected File:</p>
                <p className="text-gray-700 break-all font-medium">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {getFileExtension(selectedFile.name)}
                </p>
                <button
                  onClick={handleReset}
                  className="text-red-600 hover:text-red-700 text-sm font-medium underline mt-2"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-4">📁</div>
                <p className="text-gray-700 mb-4 text-lg">Drag and drop your file here</p>
                <p className="text-gray-500 mb-6">or</p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="file-input"
                  onChange={handleFileSelect}
                  accept=".pdf,.png,.jpg,.jpeg,.docx"
                />
                <label 
                  htmlFor="file-input" 
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer font-medium text-lg shadow-md hover:shadow-lg"
                >
                  Choose File
                </label>
                <p className="text-sm text-gray-500 mt-6">
                  Supported: PDF, PNG, JPG, JPEG, DOCX
                </p>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-gray-700">
                Convert to:
              </label>
              <select 
                className="w-full border-2 border-gray-300 rounded-lg p-4 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg font-medium"
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
              >
                <option value="">Select output format</option>
                {getAvailableFormats().map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
            </div>
          )}

          <button 
            onClick={handleConvert}
            disabled={isConverting || !selectedFile || !outputFormat}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold text-lg shadow-lg disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isConverting ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </span>
            ) : "Convert File"}
          </button>

          {convertedFile && (
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-green-800 font-bold text-lg mb-2">✓ Conversion Complete!</p>
                  <p className="text-sm text-green-700 font-medium">{convertedFile.name}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Size: {(convertedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow-md hover:shadow-lg"
                  >
                    Download
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    New File
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Supported Conversions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-900">Images (PNG, JPG, JPEG)</p>
              <p className="text-sm text-gray-600 mt-1">→ PNG, JPG, JPEG, PDF</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="font-semibold text-gray-900">PDF</p>
              <p className="text-sm text-gray-600 mt-1">→ PNG, JPG, JPEG</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="font-semibold text-gray-900">DOCX</p>
              <p className="text-sm text-gray-600 mt-1">→ PDF</p>
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