import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Free Background Remover - Remove Image Backgrounds | ToolSnap Omni",
  description:
    "Remove backgrounds from images automatically. Perfect for product photos, portraits, and design work. Download as PNG with transparency.",
  keywords: "background remover, remove background, image editor, transparent background",
}

export default function BackgroundRemoverPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Background Remover</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Remove backgrounds from images automatically using AI. Perfect for product photos, portraits, and design
            work.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#remover">Remove Background</a>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Remover Tool */}
          <div id="remover" className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Upload Image</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center mb-6">
              <p className="text-muted-foreground mb-4">Drag and drop your image here or click to browse</p>
              <input type="file" className="hidden" id="image-input" accept="image/*" />
              <Button asChild variant="outline">
                <label htmlFor="image-input" className="cursor-pointer">
                  Choose Image
                </label>
              </Button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Output Format</label>
              <select className="w-full border border-border rounded-lg p-2 bg-background text-foreground">
                <option>PNG (Transparent)</option>
                <option>JPG (White Background)</option>
                <option>JPG (Custom Color)</option>
              </select>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Remove Background</Button>
          </div>

          {/* Use Cases */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Perfect For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">E-Commerce Products</h3>
                <p className="text-muted-foreground">
                  Create professional product photos with transparent backgrounds for your online store.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Professional Portraits</h3>
                <p className="text-muted-foreground">
                  Remove backgrounds from headshots and portraits for LinkedIn, resumes, and professional use.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Social Media Graphics</h3>
                <p className="text-muted-foreground">
                  Create eye-catching social media posts with transparent backgrounds and custom overlays.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Design Projects</h3>
                <p className="text-muted-foreground">
                  Easily integrate images into designs without worrying about unwanted backgrounds.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Tips for Best Results</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">📸</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Use Clear, Well-Lit Images</h3>
                  <p className="text-muted-foreground">
                    Images with good lighting and clear subject definition produce better results. Avoid blurry or
                    low-contrast photos.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Ensure Subject Contrast</h3>
                  <p className="text-muted-foreground">
                    The subject should contrast clearly with the background. High contrast makes background removal more
                    accurate.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✂️</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Manual Refinement</h3>
                  <p className="text-muted-foreground">
                    For complex images, use photo editing software to manually refine edges after automatic removal.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔄</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Test Different Formats</h3>
                  <p className="text-muted-foreground">
                    Try different output formats to see which works best for your specific use case.
                  </p>
                </div>
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
