import Link from "next/link"
<<<<<<< HEAD
import { Button } from "@/components/ui/button"

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
=======
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { FileText, QrCode, LinkIcon, Calculator, Key, ImageIcon, ArrowRight } from "lucide-react"

const tools = [
  {
    name: "File Converter",
    description: "Convert files between different formats with ease",
    href: "/file-converter",
    icon: FileText,
    features: ["Multiple formats", "Batch conversion", "Download results"],
  },
  {
    name: "QR Code Generator",
    description: "Generate accurate QR codes for any text or URL",
    href: "/qr-generator",
    icon: QrCode,
    features: ["High accuracy", "Custom sizes", "Download as PNG"],
  },
  {
    name: "URL Shortener",
    description: "Create short URLs that redirect to your original links",
    href: "/url-shortener",
    icon: LinkIcon,
    features: ["Preserve functionality", "Custom aliases", "Click tracking"],
  },
  {
    name: "Unit Converter",
    description: "Convert between different units of measurement",
    href: "/unit-converter",
    icon: Calculator,
    features: ["Multiple categories", "Precise calculations", "Real-time conversion"],
  },
  {
    name: "Password Generator",
    description: "Generate secure passwords with customizable options",
    href: "/password-generator",
    icon: Key,
    features: ["Customizable length", "Character options", "Secure generation"],
  },
  {
    name: "Background Remover",
    description: "Remove backgrounds from images automatically",
    href: "/background-remover",
    icon: ImageIcon,
    features: ["AI-powered", "High quality", "Download results"],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-balance mb-4">ToolSnapOmni</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Everything you need for productivity in one place. Convert files, generate QR codes, shorten URLs, and much
            more with our comprehensive toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-105 border-border">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">{tool.description}</CardDescription>
                    <ul className="space-y-1 mb-4">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:text-primary">
                      Try it now
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
>>>>>>> 21447ab113fc3597b8d0f8e46447c9fe12cfa53e
    </div>
  )
}
