"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, Download, X, FileImage, FileAudio, FileVideo } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ConvertedFile {
  name: string
  originalFormat: string
  targetFormat: string
  size: string
  url: string
  status: "converting" | "completed" | "error"
}

interface FileFormat {
  category: string
  formats: string[]
  icon: React.ComponentType<any>
}

const supportedFormats: FileFormat[] = [
  {
    category: "Images",
    formats: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico"],
    icon: FileImage,
  },
  {
    category: "Documents",
    formats: ["pdf", "doc", "docx", "txt", "rtf", "odt"],
    icon: FileText,
  },
  {
    category: "Audio",
    formats: ["mp3", "wav", "ogg", "aac", "flac", "m4a"],
    icon: FileAudio,
  },
  {
    category: "Video",
    formats: ["mp4", "avi", "mov", "wmv", "flv", "webm"],
    icon: FileVideo,
  },
]

export default function FileConverterPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [targetFormat, setTargetFormat] = useState("")
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || ""
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getAvailableFormats = () => {
    if (selectedFiles.length === 0) return []

    const firstFileExt = getFileExtension(selectedFiles[0].name)
    const category = supportedFormats.find((cat) => cat.formats.includes(firstFileExt))

    return category ? category.formats.filter((format) => format !== firstFileExt) : []
  }

  const simulateConversion = async (file: File, targetFormat: string): Promise<ConvertedFile> => {
    // Simulate conversion process
    return new Promise((resolve) => {
      setTimeout(
        () => {
          // Create a mock converted file
          const convertedFile: ConvertedFile = {
            name: file.name.replace(/\.[^/.]+$/, `.${targetFormat}`),
            originalFormat: getFileExtension(file.name),
            targetFormat: targetFormat,
            size: formatFileSize(file.size),
            url: URL.createObjectURL(file), // In real app, this would be the converted file
            status: "completed",
          }
          resolve(convertedFile)
        },
        2000 + Math.random() * 3000,
      ) // Random delay between 2-5 seconds
    })
  }

  const convertFiles = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select files to convert",
        variant: "destructive",
      })
      return
    }

    if (!targetFormat) {
      toast({
        title: "Error",
        description: "Please select a target format",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)
    setConversionProgress(0)

    try {
      const conversions = selectedFiles.map(async (file, index) => {
        const converted = await simulateConversion(file, targetFormat)

        // Update progress
        setConversionProgress(((index + 1) / selectedFiles.length) * 100)

        return converted
      })

      const results = await Promise.all(conversions)
      setConvertedFiles((prev) => [...results, ...prev])
      setSelectedFiles([])
      setTargetFormat("")

      toast({
        title: "Success",
        description: `${results.length} file(s) converted successfully!`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConverting(false)
      setConversionProgress(0)
    }
  }

  const downloadFile = (file: ConvertedFile) => {
    const a = document.createElement("a")
    a.href = file.url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    toast({
      title: "Downloaded",
      description: `${file.name} saved to your downloads folder`,
    })
  }

  const availableFormats = getAvailableFormats()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">File Converter</h1>
            <p className="text-muted-foreground text-pretty">Convert files between different formats with ease</p>
          </div>

          {/* File Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Files</span>
              </CardTitle>
              <CardDescription>Select files to convert between different formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Input */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.ico,.pdf,.doc,.docx,.txt,.rtf,.odt,.mp3,.wav,.ogg,.aac,.flac,.m4a,.mp4,.avi,.mov,.wmv,.flv,.webm"
                />
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">Supports images, documents, audio, and video files</p>
                <Button onClick={() => fileInputRef.current?.click()}>Select Files</Button>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Selected Files ({selectedFiles.length})</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {getFileExtension(file.name).toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-8 w-8 p-0">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Format Selection */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Convert to:</label>
                  <Select value={targetFormat} onValueChange={setTargetFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target format" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFormats.map((format) => (
                        <SelectItem key={format} value={format}>
                          {format.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Convert Button */}
              {selectedFiles.length > 0 && targetFormat && (
                <div className="space-y-4">
                  {isConverting && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Converting files...</span>
                        <span>{Math.round(conversionProgress)}%</span>
                      </div>
                      <Progress value={conversionProgress} className="w-full" />
                    </div>
                  )}
                  <Button onClick={convertFiles} disabled={isConverting} className="w-full">
                    {isConverting
                      ? "Converting..."
                      : `Convert ${selectedFiles.length} file(s) to ${targetFormat.toUpperCase()}`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Converted Files */}
          {convertedFiles.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Converted Files</span>
                </CardTitle>
                <CardDescription>Your converted files are ready for download</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {convertedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.originalFormat.toUpperCase()} → {file.targetFormat.toUpperCase()} • {file.size}
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => downloadFile(file)} className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Supported Formats */}
          <Card>
            <CardHeader>
              <CardTitle>Supported Formats</CardTitle>
              <CardDescription>File types and formats available for conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {supportedFormats.map((category) => {
                  const Icon = category.icon
                  return (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="font-medium">{category.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {category.formats.map((format) => (
                          <span key={format} className="px-2 py-1 bg-muted text-xs rounded">
                            {format.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
