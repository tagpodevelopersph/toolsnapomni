import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Free URL Shortener - Shorten Long Links | ToolSnap Omni",
  description:
    "Shorten long URLs for easy sharing on social media. Track clicks, customize short links, and manage your URLs.",
  keywords: "URL shortener, link shortener, short URL, custom short links",
}

export default function URLShortenerPage() {
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
                  className="flex-1 border border-border rounded-lg p-3 bg-background text-foreground"
                  placeholder="custom-name"
                />
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Shorten URL</Button>
          </div>

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
                  <h3 className="font-semibold text-foreground mb-1">Click Tracking & Analytics</h3>
                  <p className="text-muted-foreground">
                    Monitor how many people click your links and when. Valuable data for marketing campaigns and content
                    strategy.
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
                <h3 className="font-semibold text-foreground mb-2">Track Your Links</h3>
                <p className="text-muted-foreground">
                  Monitor click-through rates to understand which links perform best. Use this data to optimize your
                  marketing strategy.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Test Before Sharing</h3>
                <p className="text-muted-foreground">
                  Always click your shortened link to verify it works correctly before sharing it widely on social media
                  or in campaigns.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Avoid Suspicious Patterns</h3>
                <p className="text-muted-foreground">
                  Don't use shortened links that look suspicious or misleading. Users are less likely to click links
                  they don't trust.
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
