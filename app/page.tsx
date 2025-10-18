import Link from "next/link"
import { Button } from "@/components/ui/button"
import Script from "next/script" // Import Script for the small inline activation script

export default function Home() {
  const tools = [
    {
      name: "File Converter",
      description: "Convert files between different formats including images, documents, and videos with ease.",
      href: "/tools/file-converter",
      icon: "📁",
    },
    {
      name: "QR Code Generator",
      description: "Create custom QR codes for URLs, text, and contact information instantly.",
      href: "/tools/qr-code",
      icon: "📱",
    },
    {
      name: "URL Shortener",
      description: "Shorten long URLs for easy sharing on social media and messaging platforms.",
      href: "/tools/url-shortener",
      icon: "🔗",
    },
    {
      name: "Unit Converter",
      description: "Convert between various units of measurement including length, weight, temperature, and more.",
      href: "/tools/unit-converter",
      icon: "⚖️",
    },
    {
      name: "Password Generator",
      description: "Generate strong, secure passwords with customizable length and character options.",
      href: "/tools/password-generator",
      icon: "🔐",
    },
    {
      name: "Background Remover",
      description: "Remove backgrounds from images automatically for professional-looking photos.",
      href: "/tools/background-remover",
      icon: "🎨",
    },
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
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">All Your Tools in One Place</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            ToolSnap Omni is your comprehensive utility suite for everyday tasks. Convert files, generate QR codes,
            shorten URLs, and more—all free, all online, no downloads required.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#tools">Explore Tools</Link>
          </Button>
        </div>
      </section>

      {/* --- START AdSense Header Ad Unit (Slot 2304735028) --- */}
      <div className="max-w-6xl mx-auto py-6 px-4 text-center">
        <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4388013707550348"
            data-ad-slot="2304735028" // Header Ad Slot
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
        {/* The small push script activates the ad unit */}
        <Script id="header-ad-script" strategy="lazyOnload">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>
      {/* --- END AdSense Header Ad Unit --- */}


      {/* Tools Grid */}
      <section id="tools" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer h-full">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{tool.name}</h3>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <span className="text-primary font-medium">Use Tool →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-16 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ToolSnap Omni?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Process your files instantly with our optimized servers and reliable infrastructure.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is processed securely. We don't store or share your files with third parties.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">100% Free</h3>
              <p className="text-muted-foreground">
                All tools are completely free to use. No hidden fees, no premium plans required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">Choose any tool above and start working on your tasks right now.</p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link href="#tools">Browse All Tools</Link>
          </Button>
        </div>
      </section>
      
      {/* --- START AdSense Footer Ad Unit (Slot 5545427292) --- */}
      <div className="max-w-6xl mx-auto py-6 px-4 text-center">
        <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-4388013707550348"
            data-ad-slot="5545427292" // Footer Ad Slot
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
        {/* The small push script activates the ad unit */}
        <Script id="footer-ad-script" strategy="lazyOnload">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>
      {/* --- END AdSense Footer Ad Unit --- */}


      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">ToolSnap Omni</h4>
              <p className="text-muted-foreground text-sm">Your all-in-one utility suite for everyday tasks.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/tools/file-converter" className="text-muted-foreground hover:text-primary">
                    File Converter
                  </Link>
                </li>
                <li>
                  <Link href="/tools/qr-code" className="text-muted-foreground hover:text-primary">
                    QR Code
                  </Link>
                </li>
                <li>
                  <Link href="/tools/url-shortener" className="text-muted-foreground hover:text-primary">
                    URL Shortener
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2025 ToolSnap Omni. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}