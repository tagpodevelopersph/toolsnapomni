import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Free Password Generator - Create Strong Passwords | ToolSnap Omni",
  description:
    "Generate strong, secure passwords with customizable length and character options. Protect your accounts with complex passwords.",
  keywords: "password generator, strong password, secure password, random password generator",
}

export default function PasswordGeneratorPage() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Password Generator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Create strong, secure passwords instantly. Customize length, character types, and generate multiple
            passwords at once.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#generator">Generate Password</a>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Generator Tool */}
          <div id="generator" className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Create Strong Password</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password Length: 16</label>
              <input type="range" min="8" max="32" defaultValue="16" className="w-full" />
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-foreground">Uppercase Letters (A-Z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-foreground">Lowercase Letters (a-z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-foreground">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-foreground">Special Characters (!@#$%)</span>
              </label>
            </div>

            <div className="mb-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Generated Password:</p>
              <p className="text-2xl font-mono text-foreground break-all">Kx9@mL2$pQ7vN4wR</p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Generate</Button>
              <Button variant="outline">Copy</Button>
            </div>
          </div>

          {/* Password Security Guide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Password Security 101</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">🔐</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Use Long Passwords</h3>
                  <p className="text-muted-foreground">
                    Longer passwords are exponentially harder to crack. Aim for at least 12-16 characters for important
                    accounts.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔤</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Mix Character Types</h3>
                  <p className="text-muted-foreground">
                    Combine uppercase, lowercase, numbers, and special characters. This dramatically increases password
                    complexity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🚫</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Avoid Common Patterns</h3>
                  <p className="text-muted-foreground">
                    Don't use birthdays, names, or sequential numbers. Hackers use dictionary attacks targeting common
                    patterns.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔄</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Use Unique Passwords</h3>
                  <p className="text-muted-foreground">
                    Never reuse passwords across multiple accounts. If one account is compromised, all others remain
                    secure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Password Manager Recommendation */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">Use a Password Manager</h3>
            <p className="text-muted-foreground mb-4">
              Remembering complex passwords for multiple accounts is difficult. Consider using a password manager like
              Bitwarden, 1Password, or LastPass to securely store your passwords.
            </p>
            <p className="text-muted-foreground">
              Password managers encrypt your passwords and require only one master password to access them all.
            </p>
          </div>

          {/* Common Mistakes */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Common Password Mistakes</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Writing Passwords Down</h3>
                <p className="text-muted-foreground">
                  Never write passwords on sticky notes or in unsecured documents. Use a password manager instead.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Sharing Passwords</h3>
                <p className="text-muted-foreground">
                  Don't share passwords via email or messaging apps. Use secure password sharing features in password
                  managers.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Using Personal Information</h3>
                <p className="text-muted-foreground">
                  Avoid using names, birthdates, or other personal information that can be found on social media.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Ignoring Two-Factor Authentication</h3>
                <p className="text-muted-foreground">
                  Enable 2FA whenever available. It adds an extra security layer even if your password is compromised.
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
