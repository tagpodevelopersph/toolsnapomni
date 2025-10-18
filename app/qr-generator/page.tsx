"use client"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Download, QrCode } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QRGeneratorPage() {
  const [text, setText] = useState("")
  const [size, setSize] = useState("256")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter text or URL to generate QR code",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Using QR Server API for accurate QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&format=png`
      setQrCodeUrl(qrUrl)

      toast({
        title: "Success",
        description: "QR code generated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qr-code-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      toast({
        title: "Downloaded",
        description: "QR code saved to your downloads folder",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">QR Code Generator</h1>
            <p className="text-muted-foreground text-pretty">Generate accurate QR codes for any text, URL, or data</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5" />
                  <span>QR Code Settings</span>
                </CardTitle>
                <CardDescription>Enter your text or URL and customize the QR code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text or URL</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter text, URL, or any data you want to encode..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128x128 px</SelectItem>
                      <SelectItem value="256">256x256 px</SelectItem>
                      <SelectItem value="512">512x512 px</SelectItem>
                      <SelectItem value="1024">1024x1024 px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateQRCode} disabled={isGenerating || !text.trim()} className="w-full">
                  {isGenerating ? "Generating..." : "Generate QR Code"}
                </Button>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card>
              <CardHeader>
                <CardTitle>Preview & Download</CardTitle>
                <CardDescription>Your generated QR code will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  {qrCodeUrl ? (
                    <>
                      <div className="border border-border rounded-lg p-4 bg-white">
                        <img
                          src={qrCodeUrl || "/placeholder.svg"}
                          alt="Generated QR Code"
                          className="max-w-full h-auto"
                          style={{ imageRendering: "pixelated" }}
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Size: {size}x{size} pixels
                        </p>
                        <Button onClick={downloadQRCode} className="flex items-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Download PNG</span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                      <QrCode className="w-16 h-16 mb-4 opacity-50" />
                      <p>Generate a QR code to see preview</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">High Accuracy</h4>
                  <p className="text-muted-foreground">
                    Our QR codes are generated with error correction to ensure reliable scanning
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Multiple Formats</h4>
                  <p className="text-muted-foreground">
                    Support for URLs, text, contact info, WiFi credentials, and more
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Download Ready</h4>
                  <p className="text-muted-foreground">
                    Download as high-quality PNG files ready for print or digital use
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
