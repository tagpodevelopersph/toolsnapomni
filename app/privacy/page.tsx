import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - ToolSnap Omni",
  description: "Read ToolSnap Omni's privacy policy to understand how we protect your data and privacy.",
  keywords: "privacy policy, data protection, privacy",
}

export default function PrivacyPage() {
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

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                ToolSnap Omni ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                and use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect information in the following ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Files and Data You Upload:</strong> When you use our tools, you may upload files or enter
                  data. This information is processed temporarily to provide the service.
                </li>
                <li>
                  <strong>Usage Information:</strong> We collect information about how you interact with our services,
                  including tool usage patterns and feature preferences.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect information about your device, including browser type,
                  operating system, and IP address.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies to enhance your experience and analyze usage patterns.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide, maintain, and improve our services</li>
                <li>To understand how users interact with our platform</li>
                <li>To detect and prevent fraud and abuse</li>
                <li>To comply with legal obligations</li>
                <li>To send you service-related announcements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Storage and Retention</h2>
              <p>
                We do not permanently store files you upload to our services. Files are processed in real-time and
                automatically deleted after the operation is complete. Usage data and analytics information may be
                retained for up to 90 days to improve our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your information, including SSL encryption,
                secure servers, and regular security audits. However, no method of transmission over the internet is
                100% secure. We cannot guarantee absolute security of your information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Third-Party Services</h2>
              <p>
                We may use third-party services for analytics and performance monitoring. These services may collect
                information about your usage. We do not share your personal files or sensitive data with third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the following rights regarding your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The right to access your information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to opt-out of certain data collection</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
              <p>
                ToolSnap Omni is not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If we become aware that we have collected information from a child
                under 13, we will delete such information immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date. Your continued use of ToolSnap
                Omni after any changes constitutes your acceptance of the new Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at
                privacy@toolsnapomni.com.
              </p>
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
