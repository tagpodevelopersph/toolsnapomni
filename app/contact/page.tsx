import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact Us - ToolSnap Omni Support",
  description: "Get in touch with ToolSnap Omni. Report bugs, suggest features, or ask questions about our tools.",
  keywords: "contact, support, feedback, bug report, feature request",
}

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground">support@toolsnapomni.com</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
            <p className="text-muted-foreground">Within 24 hours</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="font-semibold text-foreground mb-2">Available</h3>
            <p className="text-muted-foreground">24/7 Support</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Name</label>
              <input
                type="text"
                className="w-full border border-border rounded-lg p-3 bg-background text-foreground"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-border rounded-lg p-3 bg-background text-foreground"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <select className="w-full border border-border rounded-lg p-3 bg-background text-foreground">
                <option>General Inquiry</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea
                className="w-full border border-border rounded-lg p-3 bg-background text-foreground"
                rows={6}
                placeholder="Tell us what's on your mind..."
                required
              />
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Send Message</Button>
          </form>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">What to Include in Your Message</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">For Bug Reports</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Describe the issue in detail</li>
                <li>• Include your browser and device</li>
                <li>• Provide steps to reproduce</li>
                <li>• Attach screenshots if possible</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">For Feature Requests</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>• Explain the feature you want</li>
                <li>• Describe the use case</li>
                <li>• Explain why it would be useful</li>
                <li>• Suggest implementation ideas</li>
              </ul>
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
