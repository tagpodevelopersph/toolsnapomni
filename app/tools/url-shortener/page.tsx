'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// In-memory storage for shortened URLs
const urlMap = new Map<string, string>()

export default function URLShortenerPage() {
  const [longUrl, setLongUrl] = useState("")
  const [customName, setCustomName] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [savedUrls, setSavedUrls] = useState<Array<{ short: string; long: string }>>([])

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8)
  }

  const handleShortenUrl = () => {
    if (!longUrl.trim()) {
      alert("Please enter a URL")
      return
    }

    let shortCode = ""
    if (customName.trim()) {
      const sanitized = customName.replace(/[^a-z0-9-]/gi, "").toLowerCase()
      if (urlMap.has(sanitized)) {
        alert("This custom name is already in use. Please choose another.")
        return
      }
      shortCode = sanitized
    } else {
      shortCode = generateRandomCode()
    }

    // Store the mapping in memory
    urlMap.set(shortCode, longUrl)

    const shortened = `snap.link/${shortCode}`
    setShortUrl(shortened)
    setShowResult(true)
    setCopySuccess(false)

    // Add to saved URLs list
    setSavedUrls([{ short: shortened, long: longUrl }, ...savedUrls])

    // Reset inputs
    setLongUrl("")
    setCustomName("")
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleOpenShortUrl = (short: string) => {
    const code = short.replace("snap.link/", "")
    const original = urlMap.get(code)
    if (original) {
      window.open(original, "_blank")
    }
  }

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
          <h1 className="text-4xl font-bold text-foreground mb-4">URL Shortener</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Convert long URLs into short, shareable links. Perfect for social media, messaging, and marketing campaigns.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#shortener">Shorten URL</a>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Shortener Tool */}
          <div id="shortener" className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Shorten Your URL</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Long URL</label>
              <input
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="w-full border border-border rounded-lg p-3 bg-background text-foreground"
                placeholder="https://example.com/very/long/url/that/needs/shortening"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Custom Short Link (Optional)</label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 bg-muted text-muted-foreground rounded-lg">snap.link/</span>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value.replace(/[^a-z0-9-]/gi, ""))}
                  className="flex-1 border border-border rounded-lg p-3 bg-background text-foreground"
                  placeholder="custom-name"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Leave empty for a random short code</p>
            </div>
            <Button 
              onClick={handleShortenUrl}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Shorten URL
            </Button>
          </div>

          {/* Result Display */}
          {showResult && (
            <div className="bg-card border border-border rounded-lg p-8 mb-12">
              <h3 className="text-xl font-bold mb-4">Your Shortened URL</h3>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">Shortened Link:</p>
                <p className="text-lg font-mono font-bold text-foreground break-all">{shortUrl}</p>
              </div>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Original URL:</p>
                <p className="text-sm font-mono text-foreground break-all">{longUrl}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleCopyToClipboard}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {copySuccess ? "Copied!" : "Copy Short Link"}
                </Button>
                <Button 
                  onClick={() => handleOpenShortUrl(shortUrl)}
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Open Link
                </Button>
              </div>
            </div>
          )}

          {/* Saved URLs */}
          {savedUrls.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-8 mb-12">
              <h3 className="text-xl font-bold mb-4">Your Shortened URLs</h3>
              <div className="space-y-4">
                {savedUrls.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-mono font-bold text-primary">{item.short}</p>
                      <Button 
                        onClick={() => handleOpenShortUrl(item.short)}
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Open
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground break-all">→ {item.long}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Shorten Your URLs?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Perfect for Social Media</h3>
                  <p className="text-muted-foreground">
                    Long URLs take up valuable character space. Short links look cleaner and are more likely to be
                    clicked.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Easy Sharing</h3>
                  <p className="text-muted-foreground">
                    Share links in messages, emails, and texts without cluttering your content. Short URLs are more
                    professional and easier to type.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Professional Appearance</h3>
                  <p className="text-muted-foreground">
                    Custom short links with your branding look more professional and trustworthy than random character
                    strings.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔗</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Easy to Remember</h3>
                  <p className="text-muted-foreground">
                    Short, memorable links are easier to type, share verbally, and remember compared to long URLs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div>
            <h2 className="text-2xl font-bold mb-6">URL Shortening Best Practices</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Use Descriptive Custom Links</h3>
                <p className="text-muted-foreground">
                  Instead of random characters, use descriptive names that hint at the content. Example:
                  snap.link/summer-sale instead of snap.link/a7k9x2
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Keep Custom Names Short</h3>
                <p className="text-muted-foreground">
                  The shorter your custom name, the shorter the overall link. Use hyphens to separate words for
                  readability.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Test Before Sharing</h3>
                <p className="text-muted-foreground">
                  Always verify your shortened link works correctly before sharing it widely on social media or in
                  campaigns.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Note: Session-Based Storage</h3>
                <p className="text-muted-foreground">
                  Links are stored in memory during your session. Refreshing the page will clear all mappings. For production use, a database is recommended.
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