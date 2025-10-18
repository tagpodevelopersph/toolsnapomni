'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function QRCodePage() {
  const [qrType, setQrType] = useState("URL")
  const [content, setContent] = useState("")
  const [size, setSize] = useState("400")
  const [qrGenerated, setQrGenerated] = useState(false)

  const handleGenerate = () => {
    if (content.trim()) {
      setQrGenerated(true)
    } else {
      alert("Please enter content for the QR code")
    }
  }

  const handleDownload = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}`
    const link = document.createElement("a")
    link.href = qrUrl
    link.download = "qrcode.png"
    link.click()
  }

  const qrUrl = qrGenerated ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(content)}` : ""

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            ToolSnap Omni
          </Link>
          <div className="flex gap-6">
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition">
              Blog
            </Link>
            <Link href="/faq" className="text-foreground hover:text-primary transition">
              FAQ
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">QR Code Generator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create professional QR codes for URLs, text, contact information, and more. Customize colors and download
            instantly.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#generator">Generate QR Code</a>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Generator Tool */}
          <div id="generator" className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Create Your QR Code</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">QR Code Type</label>
              <select 
                value={qrType}
                onChange={(e) => setQrType(e.target.value)}
                className="w-full border border-border rounded-lg p-2 bg-background text-foreground"
              >
                <option>URL</option>
                <option>Text</option>
                <option>Email</option>
                <option>Phone</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-border rounded-lg p-3 bg-background text-foreground"
                rows={4}
                placeholder="Enter URL, text, or other content"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select 
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full border border-border rounded-lg p-2 bg-background text-foreground"
                >
                  <option value="200">Small (200x200)</option>
                  <option value="400">Medium (400x400)</option>
                  <option value="600">Large (600x600)</option>
                  <option value="1000">Extra Large (1000x1000)</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleGenerate}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Generate QR Code
            </Button>
          </div>

          {/* QR Code Display */}
          {qrGenerated && content && (
            <div className="bg-card border border-border rounded-lg p-8 mb-12 text-center">
              <h3 className="text-xl font-bold mb-6">Your QR Code</h3>
              <div className="flex justify-center mb-6 bg-white p-4 rounded-lg">
                <img 
                  src={qrUrl} 
                  alt="Generated QR Code"
                  style={{ width: `${size}px`, height: `${size}px` }}
                />
              </div>
              <Button 
                onClick={handleDownload}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Download QR Code
              </Button>
            </div>
          )}

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">QR Code Features</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Universal Compatibility</h3>
                  <p className="text-muted-foreground">
                    Generated QR codes work with any smartphone camera or QR code reader app. No special software
                    required.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🎨</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Multiple Sizes</h3>
                  <p className="text-muted-foreground">
                    Choose from small to extra large sizes. Download as PNG for any use case.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Multiple Data Types</h3>
                  <p className="text-muted-foreground">
                    Support for URLs, text, emails, phone numbers, and more.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">⚙️</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">High Error Correction</h3>
                  <p className="text-muted-foreground">
                    QR codes remain scannable even if partially damaged or obscured.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Marketing & Advertising</h3>
                <p className="text-muted-foreground">
                  Add QR codes to print ads, billboards, and packaging to drive traffic to your website.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Event Management</h3>
                <p className="text-muted-foreground">
                  Generate QR codes for event tickets, registration, and check-in processes.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Business Cards</h3>
                <p className="text-muted-foreground">
                  Include QR codes on business cards linking to your contact information or portfolio.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">WiFi Sharing</h3>
                <p className="text-muted-foreground">
                  Create QR codes for WiFi networks to simplify guest access without sharing passwords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2025 ToolSnap Omni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}