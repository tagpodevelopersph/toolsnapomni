import Link from "next/link"
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
    </div>
  )
}
