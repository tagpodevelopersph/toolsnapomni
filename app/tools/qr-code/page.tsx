import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Free QR Code Generator - Create Custom QR Codes | ToolSnap Omni",
  description:
    "Generate QR codes for URLs, text, contact information, and WiFi networks. Customize colors, sizes, and download as PNG or SVG.",
  keywords: "QR code generator, QR code creator, custom QR codes, free QR code",
}

export default function QRCodePage() {
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
              <select className="w-full border border-border rounded-lg p-2 bg-background text-foreground">
                <option>URL</option>
                <option>Text</option>
                <option>Email</option>
                <option>Phone</option>
                <option>WiFi</option>
                <option>vCard</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                className="w-full border border-border rounded-lg p-3 bg-background text-foreground"
                rows={4}
                placeholder="Enter URL, text, or other content"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select className="w-full border border-border rounded-lg p-2 bg-background text-foreground">
                  <option>Small (200x200)</option>
                  <option>Medium (400x400)</option>
                  <option>Large (600x600)</option>
                  <option>Extra Large (1000x1000)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <select className="w-full border border-border rounded-lg p-2 bg-background text-foreground">
                  <option>PNG</option>
                  <option>SVG</option>
                  <option>JPG</option>
                </select>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Generate QR Code</Button>
          </div>

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
                  <h3 className="font-semibold text-foreground mb-1">Full Customization</h3>
                  <p className="text-muted-foreground">
                    Customize colors, add logos, and adjust error correction levels to match your brand identity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Multiple Data Types</h3>
                  <p className="text-muted-foreground">
                    Support for URLs, text, emails, phone numbers, WiFi credentials, and vCard contact information.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">⚙️</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Error Correction</h3>
                  <p className="text-muted-foreground">
                    QR codes remain scannable even if partially damaged or obscured. Choose your error correction level.
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
