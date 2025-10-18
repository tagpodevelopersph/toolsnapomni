import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service - ToolSnap Omni",
  description: "Read ToolSnap Omni's terms of service to understand the rules and conditions for using our platform.",
  keywords: "terms of service, terms and conditions, legal",
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using ToolSnap Omni, you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials on ToolSnap Omni for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on ToolSnap Omni</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
              <p>
                The materials on ToolSnap Omni are provided on an 'as is' basis. ToolSnap Omni makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
              <p>
                In no event shall ToolSnap Omni or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on ToolSnap Omni, even if ToolSnap Omni or an authorized
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on ToolSnap Omni could include technical, typographical, or photographic errors.
                ToolSnap Omni does not warrant that any of the materials on its website are accurate, complete, or
                current. ToolSnap Omni may make changes to the materials contained on its website at any time without
                notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Materials and Content</h2>
              <p>
                ToolSnap Omni has not reviewed all of the sites linked to its website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by ToolSnap Omni
                of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
              <p>
                ToolSnap Omni may revise these terms of service for its website at any time without notice. By using
                this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction
                in which ToolSnap Omni operates, and you irrevocably submit to the exclusive jurisdiction of the courts
                in that location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Prohibited Activities</h2>
              <p className="mb-4">You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Harassing or causing distress or inconvenience to any person</li>
                <li>Obscene or abusive language or content</li>
                <li>Disrupting the normal flow of dialogue within our website</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using our services for illegal purposes</li>
                <li>Uploading malware or harmful content</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Termination</h2>
              <p>
                ToolSnap Omni may terminate or suspend your access to our services immediately, without prior notice or
                liability, for any reason whatsoever, including if you breach the Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at support@toolsnapomni.com.
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
