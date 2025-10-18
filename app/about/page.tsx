import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About ToolSnap Omni - Our Mission & Values",
  description:
    "Learn about ToolSnap Omni's mission to provide free, reliable, and secure online tools for everyday tasks.",
  keywords: "about us, mission, values, company, team",
}

export default function AboutPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">About ToolSnap Omni</h1>
          <p className="text-lg text-muted-foreground">
            Empowering users with free, reliable, and secure online tools for everyday tasks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              ToolSnap Omni was founded with a simple mission: to provide free, high-quality online tools that help
              people accomplish their daily tasks more efficiently. We believe that powerful tools shouldn't require
              expensive subscriptions or complicated software installations. Instead, they should be accessible to
              everyone, everywhere, at no cost.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our vision is to become the go-to platform for online utilities, trusted by millions of users worldwide
              for reliability, security, and ease of use.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe powerful tools should be free and accessible to everyone, regardless of their technical
                  skill level or financial situation.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Security</h3>
                <p className="text-muted-foreground">
                  Your data is sacred. We implement industry-leading security practices to protect your information and
                  maintain your privacy.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Reliability</h3>
                <p className="text-muted-foreground">
                  Our tools are built to be dependable and consistent. We maintain high uptime and performance standards
                  so you can rely on us.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve and expand our tool suite, incorporating user feedback and the latest
                  technologies.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose ToolSnap Omni?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Completely Free</h3>
                  <p className="text-muted-foreground">
                    All our tools are 100% free. No hidden fees, no premium plans, no subscriptions. Ever.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">No Installation Required</h3>
                  <p className="text-muted-foreground">
                    Access all tools directly from your browser. No downloads, no installations, no bloatware.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Privacy First</h3>
                  <p className="text-muted-foreground">
                    Your data is never stored or shared. All processing happens securely on our servers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Always Available</h3>
                  <p className="text-muted-foreground">
                    Access ToolSnap Omni from any device, anywhere, anytime. Our tools work on desktop, tablet, and
                    mobile.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Continuously Improving</h3>
                  <p className="text-muted-foreground">
                    We regularly add new tools and improve existing ones based on user feedback and emerging needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment to You</h2>
            <p className="text-muted-foreground mb-4">
              We're committed to maintaining the highest standards of quality, security, and user experience. We listen
              to our users and continuously evolve our platform to meet your needs. Whether you're a student, a
              professional, or a business owner, ToolSnap Omni is here to help you work smarter and more efficiently.
            </p>
            <p className="text-muted-foreground">
              Thank you for choosing ToolSnap Omni. We're honored to be part of your daily workflow.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/">Explore Our Tools</Link>
            </Button>
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
