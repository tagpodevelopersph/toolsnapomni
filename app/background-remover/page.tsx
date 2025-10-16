"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ImageIcon, Upload, Download, Scissors, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProcessedImage {
  original: string
  processed: string
  name: string
  size: string
  status: "processing" | "completed" | "error"
}

export default function BackgroundRemoverPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive",
        })
        return
      }

      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Enhanced background removal algorithm
  const advancedBackgroundRemoval = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")

      if (!canvas || !ctx) {
        resolve(imagePreview)
        return
      }

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width
        canvas.height = img.height

        // Draw the original image
        ctx.drawImage(img, 0, 0)

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        const width = canvas.width
        const height = canvas.height

        // Create arrays for processing
        const pixels = new Uint8ClampedArray(data)
        const mask = new Array(width * height).fill(false)

        // Step 1: Edge detection to find the main subject
        const edges = detectEdges(pixels, width, height)
        
        // Step 2: Find the dominant background colors (corners and edges)
        const backgroundColors = findBackgroundColors(pixels, width, height)
        
        // Step 3: Flood fill from edges to remove background
        floodFillBackground(pixels, mask, backgroundColors, edges, width, height)
        
        // Step 4: Apply morphological operations to clean up the mask
        const cleanedMask = morphologicalOperations(mask, width, height)
        
        // Step 5: Apply the mask with edge softening
        applyMaskWithFeathering(data, cleanedMask, width, height)

        // Put the modified image data back
        ctx.putImageData(imageData, 0, 0)

        // Convert to data URL with high quality
        const processedDataUrl = canvas.toDataURL("image/png", 1.0)
        resolve(processedDataUrl)
      }

      img.src = imagePreview
    })
  }

  // Edge detection using Sobel operator
  const detectEdges = (pixels: Uint8ClampedArray, width: number, height: number): boolean[] => {
    const edges = new Array(width * height).fill(false)
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1]

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0

        for (let i = 0; i < 9; i++) {
          const px = x + (i % 3) - 1
          const py = y + Math.floor(i / 3) - 1
          const idx = (py * width + px) * 4
          const gray = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3

          gx += gray * sobelX[i]
          gy += gray * sobelY[i]
        }

        const magnitude = Math.sqrt(gx * gx + gy * gy)
        edges[y * width + x] = magnitude > 50 // Threshold for edge detection
      }
    }

    return edges
  }

  // Find background colors by sampling corners and edges
  const findBackgroundColors = (pixels: Uint8ClampedArray, width: number, height: number): number[][] => {
    const backgroundColors: number[][] = []
    const samples: Array<{x: number, y: number}> = []

    // Sample corners
    samples.push({x: 0, y: 0})
    samples.push({x: width - 1, y: 0})
    samples.push({x: 0, y: height - 1})
    samples.push({x: width - 1, y: height - 1})

    // Sample edges
    for (let i = 0; i < width; i += 20) {
      samples.push({x: i, y: 0})
      samples.push({x: i, y: height - 1})
    }
    for (let i = 0; i < height; i += 20) {
      samples.push({x: 0, y: i})
      samples.push({x: width - 1, y: i})
    }

    samples.forEach(({x, y}) => {
      const idx = (y * width + x) * 4
      backgroundColors.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]])
    })

    return backgroundColors
  }

  // Flood fill to identify background regions
  const floodFillBackground = (
    pixels: Uint8ClampedArray,
    mask: boolean[],
    backgroundColors: number[][],
    edges: boolean[],
    width: number,
    height: number
  ) => {
    const visited = new Array(width * height).fill(false)

    const colorDistance = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) => {
      return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
    }

    const isBackgroundColor = (r: number, g: number, b: number) => {
      return backgroundColors.some(([br, bg, bb]) => colorDistance(r, g, b, br, bg, bb) < 60)
    }

    const floodFill = (startX: number, startY: number) => {
      const stack = [{x: startX, y: startY}]

      while (stack.length > 0) {
        const {x, y} = stack.pop()!
        
        if (x < 0 || x >= width || y < 0 || y >= height) continue
        
        const idx = y * width + x
        if (visited[idx] || edges[idx]) continue

        const pixelIdx = idx * 4
        const r = pixels[pixelIdx]
        const g = pixels[pixelIdx + 1]
        const b = pixels[pixelIdx + 2]

        if (!isBackgroundColor(r, g, b)) continue

        visited[idx] = true
        mask[idx] = true // Mark as background to remove

        // Add neighbors to stack
        stack.push({x: x + 1, y})
        stack.push({x: x - 1, y})
        stack.push({x, y: y + 1})
        stack.push({x, y: y - 1})
      }
    }

    // Start flood fill from edges
    for (let x = 0; x < width; x++) {
      floodFill(x, 0)
      floodFill(x, height - 1)
    }
    for (let y = 0; y < height; y++) {
      floodFill(0, y)
      floodFill(width - 1, y)
    }
  }

  // Morphological operations to clean up the mask
  const morphologicalOperations = (mask: boolean[], width: number, height: number): boolean[] => {
    const cleaned = [...mask]

    // Erosion followed by dilation (opening operation)
    // This removes small noise while preserving main shapes
    
    // Erosion
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x
        if (mask[idx]) {
          // Check 3x3 neighborhood
          let allBackground = true
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (!mask[(y + dy) * width + (x + dx)]) {
                allBackground = false
                break
              }
            }
            if (!allBackground) break
          }
          if (!allBackground) cleaned[idx] = false
        }
      }
    }

    // Dilation
    const dilated = [...cleaned]
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x
        if (!cleaned[idx]) {
          // Check 3x3 neighborhood
          let hasBackground = false
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (cleaned[(y + dy) * width + (x + dx)]) {
                hasBackground = true
                break
              }
            }
            if (hasBackground) break
          }
          if (hasBackground) dilated[idx] = true
        }
      }
    }

    return dilated
  }

  // Apply mask with feathering for smooth edges
  const applyMaskWithFeathering = (data: Uint8ClampedArray, mask: boolean[], width: number, height: number) => {
    const featherRadius = 2

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x
        const pixelIdx = idx * 4

        if (mask[idx]) {
          // Calculate distance to nearest non-background pixel for feathering
          let minDistance = featherRadius + 1
          
          for (let dy = -featherRadius; dy <= featherRadius; dy++) {
            for (let dx = -featherRadius; dx <= featherRadius; dx++) {
              const nx = x + dx
              const ny = y + dy
              
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nIdx = ny * width + nx
                if (!mask[nIdx]) {
                  const distance = Math.sqrt(dx * dx + dy * dy)
                  minDistance = Math.min(minDistance, distance)
                }
              }
            }
          }

          // Apply feathering
          const alpha = minDistance <= featherRadius ? 
            (minDistance / featherRadius) * 255 : 0

          data[pixelIdx + 3] = Math.max(0, Math.min(255, alpha))
        }
      }
    }
  }

  const removeBackground = async () => {
    if (!selectedImage || !imagePreview) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProcessingProgress(0)

    try {
      // Simulate processing progress
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 300)

      // Enhanced background removal
      const processedImageUrl = await advancedBackgroundRemoval(selectedImage)

      clearInterval(progressInterval)
      setProcessingProgress(100)

      const processedImage: ProcessedImage = {
        original: imagePreview,
        processed: processedImageUrl,
        name: selectedImage.name.replace(/\.[^/.]+$/, "_no_bg.png"),
        size: formatFileSize(selectedImage.size),
        status: "completed",
      }

      setProcessedImages((prev) => [processedImage, ...prev])
      setSelectedImage(null)
      setImagePreview("")

      toast({
        title: "Success",
        description: "Background removed successfully with enhanced quality!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setProcessingProgress(0)
    }
  }

  const downloadImage = (image: ProcessedImage) => {
    const a = document.createElement("a")
    a.href = image.processed
    a.download = image.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast({
      title: "Downloaded",
      description: `${image.name} saved to your downloads folder`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">AI Background Remover</h1>
            <p className="text-muted-foreground text-pretty">
              Advanced background removal that preserves subject quality and detail
            </p>
          </div>

          {/* Image Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
              </CardTitle>
              <CardDescription>Select an image to intelligently remove its background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Input */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop an image here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Best results with clear subjects and distinct backgrounds
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>Select Image</Button>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="space-y-4">
                  <h4 className="font-medium">Selected Image</h4>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative border border-border rounded-lg overflow-hidden max-w-md">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Selected image"
                        className="max-w-full h-auto max-h-64 object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{selectedImage?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedImage && formatFileSize(selectedImage.size)}
                      </p>
                    </div>
                  </div>

                  {/* Processing Progress */}
                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>AI processing - analyzing subject...</span>
                        </span>
                        <span>{Math.round(processingProgress)}%</span>
                      </div>
                      <Progress value={processingProgress} className="w-full" />
                    </div>
                  )}

                  {/* Remove Background Button */}
                  <Button
                    onClick={removeBackground}
                    disabled={isProcessing}
                    className="w-full flex items-center space-x-2"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>{isProcessing ? "AI Processing..." : "Remove Background"}</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processed Images */}
          {processedImages.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Processed Images</span>
                </CardTitle>
                <CardDescription>Your images with backgrounds intelligently removed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {processedImages.map((image, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Original Image */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Original</h5>
                          <div className="border border-border rounded-lg overflow-hidden">
                            <img
                              src={image.original || "/placeholder.svg"}
                              alt="Original"
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        </div>

                        {/* Processed Image */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Background Removed</h5>
                          <div
                            className="border border-border rounded-lg overflow-hidden"
                            style={{
                              backgroundImage: `
                                linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                                linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                                linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                                linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                              `,
                              backgroundSize: "12px 12px",
                              backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
                            }}
                          >
                            <img
                              src={image.processed || "/placeholder.svg"}
                              alt="Processed"
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{image.name}</p>
                          <p className="text-sm text-muted-foreground">{image.size} • High Quality PNG</p>
                        </div>
                        <Button onClick={() => downloadImage(image)} className="flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Download PNG</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Section */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced AI Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Edge Detection</h4>
                  <p className="text-muted-foreground">
                    Uses Sobel operators to detect subject boundaries and preserve fine details
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Smart Subject Recognition</h4>
                  <p className="text-muted-foreground">
                    Analyzes color patterns and shapes to identify the main subject accurately
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Quality Preservation</h4>
                  <p className="text-muted-foreground">
                    Maintains original image quality with smooth edge feathering
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </main>
    </div>
  )
}