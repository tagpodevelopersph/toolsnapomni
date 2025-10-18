import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog - Tips, Guides & Resources | ToolSnap Omni",
  description:
    "Read our blog for helpful guides on file conversion, QR codes, URL shortening, unit conversion, password security, and more.",
  keywords: "blog, guides, tutorials, tips, resources, file conversion, QR codes",
}

export default function BlogPage() {
  const articles = [
    {
      id: "file-format-guide",
      title: "How to Choose the Right File Format for Your Needs",
      excerpt:
        "Understanding different file formats and when to use them can save you time and prevent compatibility issues.",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Guide",
    },
    {
      id: "qr-codes-2025",
      title: "QR Codes in 2025: Beyond Marketing - Real-World Applications",
      excerpt:
        "Discover how QR codes have evolved beyond marketing and are now essential tools in business, education, and daily life.",
      date: "2025-01-12",
      readTime: "10 min read",
      category: "Trends",
    },
    {
      id: "url-shortening-best-practices",
      title: "URL Shortening Best Practices: Security & Analytics",
      excerpt:
        "Learn how to use shortened URLs safely and effectively while tracking performance and maintaining security.",
      date: "2025-01-10",
      readTime: "7 min read",
      category: "Guide",
    },
    {
      id: "unit-conversion-mistakes",
      title: "Unit Conversion Mistakes That Cost Businesses Money",
      excerpt: "Real-world scenarios where unit conversion errors led to costly mistakes and how to prevent them.",
      date: "2025-01-08",
      readTime: "9 min read",
      category: "Business",
    },
    {
      id: "password-security-101",
      title: "Password Security 101: Creating Unbreakable Passwords",
      excerpt:
        "Master the fundamentals of password security and learn techniques to create passwords that are nearly impossible to crack.",
      date: "2025-01-05",
      readTime: "11 min read",
      category: "Security",
    },
    {
      id: "background-removal-tips",
      title: "Background Removal in Professional Design: Tips & Tricks",
      excerpt:
        "Professional techniques for using background removal in product photography, social media, and design work.",
      date: "2025-01-02",
      readTime: "8 min read",
      category: "Design",
    },
    {
      id: "toolsnap-productivity",
      title: "Why ToolSnap Omni Saves You Time: A Productivity Guide",
      excerpt: "Discover how using an all-in-one utility suite can streamline your workflow and boost productivity.",
      date: "2024-12-30",
      readTime: "6 min read",
      category: "Productivity",
    },
    {
      id: "file-conversion-problems",
      title: "Common File Conversion Problems & Solutions",
      excerpt: "Troubleshooting guide for the most common file conversion issues and how to resolve them quickly.",
      date: "2024-12-27",
      readTime: "7 min read",
      category: "Troubleshooting",
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
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">ToolSnap Omni Blog</h1>
          <p className="text-lg text-muted-foreground">
            Tips, guides, and resources to help you get the most out of our tools and improve your productivity.
          </p>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <article className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <span className="text-muted-foreground text-sm">{article.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{article.title}</h2>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">{article.readTime}</span>
                    <span className="text-primary font-medium">Read Article →</span>
                  </div>
                </article>
              </Link>
            ))}
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
