import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Free File Converter - Convert Images, Documents & Videos | ToolSnap Omni",
  description:
    "Convert files between multiple formats including PNG, JPG, PDF, DOCX, MP4, and more. Fast, secure, and completely free online file conversion tool.",
  keywords: "file converter, image converter, document converter, video converter, online conversion",
}

export default function FileConverterPage() {
  const supportedFormats = [
    { category: "Images", formats: ["PNG", "JPG", "JPEG", "GIF", "BMP", "WEBP", "SVG"] },
    { category: "Documents", formats: ["PDF", "DOCX", "DOC", "XLSX", "XLS", "PPTX", "TXT"] },
    { category: "Videos", formats: ["MP4", "AVI", "MOV", "MKV", "FLV", "WMV"] },
    { category: "Audio", formats: ["MP3", "WAV", "FLAC", "AAC", "OGG", "M4A"] },
  ]

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
          <h1 className="text-4xl font-bold text-foreground mb-4">File Converter</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Convert your files between multiple formats instantly. Support for images, documents, videos, and audio
            files.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#converter">Start Converting</a>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Converter Tool */}
          <div id="converter" className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Upload Your File</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center mb-6">
              <p className="text-muted-foreground mb-4">Drag and drop your file here or click to browse</p>
              <input type="file" className="hidden" id="file-input" />
              <Button asChild variant="outline">
                <label htmlFor="file-input" className="cursor-pointer">
                  Choose File
                </label>
              </Button>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Convert to Format</label>
              <select className="w-full border border-border rounded-lg p-2 bg-background text-foreground">
                <option>Select output format</option>
                <option>PNG</option>
                <option>JPG</option>
                <option>PDF</option>
                <option>DOCX</option>
                <option>MP4</option>
              </select>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Convert File</Button>
          </div>

          {/* Supported Formats */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Supported Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportedFormats.map((group) => (
                <div key={group.category} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.formats.map((format) => (
                      <span key={format} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Use Our File Converter?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Lightning Fast Conversion</h3>
                  <p className="text-muted-foreground">
                    Our optimized servers process your files in seconds, not minutes. Experience instant conversions
                    regardless of file size.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Complete Privacy Protection</h3>
                  <p className="text-muted-foreground">
                    Your files are never stored on our servers. They're processed in real-time and automatically deleted
                    after conversion.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">High Quality Output</h3>
                  <p className="text-muted-foreground">
                    Maintain original quality during conversion. Our advanced algorithms preserve image resolution,
                    document formatting, and video clarity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">💻</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Works on Any Device</h3>
                  <p className="text-muted-foreground">
                    No software installation needed. Convert files directly from your browser on desktop, tablet, or
                    mobile device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">What file sizes can I convert?</h3>
                <p className="text-muted-foreground">
                  We support files up to 500MB. For larger files, consider splitting them into smaller parts.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Is my data secure?</h3>
                <p className="text-muted-foreground">
                  Yes, absolutely. All conversions happen on secure servers with SSL encryption. Files are never stored
                  permanently.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">How long does conversion take?</h3>
                <p className="text-muted-foreground">
                  Most conversions complete within seconds. Larger files may take a minute or two depending on file size
                  and format complexity.
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
