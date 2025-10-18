'use client'

import { useState } from "react"

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSpecial, setUseSpecial] = useState(true)
  const [password, setPassword] = useState("Kx9@mL2$pQ7vN4wR")
  const [copySuccess, setCopySuccess] = useState(false)
  const [passwordHistory, setPasswordHistory] = useState([])

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let chars = ""
    if (useUppercase) chars += uppercase
    if (useLowercase) chars += lowercase
    if (useNumbers) chars += numbers
    if (useSpecial) chars += special

    if (chars === "") {
      alert("Please select at least one character type")
      return
    }

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    setPassword(newPassword)
    setPasswordHistory([newPassword, ...passwordHistory.slice(0, 9)])
    setCopySuccess(false)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const copyHistoryPassword = (pwd) => {
    navigator.clipboard.writeText(pwd)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">
            ToolSnap Omni
          </a>
          <div className="flex gap-6">
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </a>
            <a href="/blog" className="text-gray-700 hover:text-blue-600 transition">
              Blog
            </a>
            <a href="/faq" className="text-gray-700 hover:text-blue-600 transition">
              FAQ
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Password Generator</h1>
          <p className="text-lg text-gray-600 mb-8">
            Create strong, secure passwords instantly. Customize length, character types, and generate multiple
            passwords at once.
          </p>
          <a href="#generator" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Generate Password
          </a>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Generator Tool */}
          <div id="generator" className="bg-white border border-gray-200 rounded-lg p-8 mb-12 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Create Strong Password</h2>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Password Length: {length}</label>
                <span className="text-sm text-gray-500">(8-32 characters)</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="32" 
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useUppercase}
                  onChange={(e) => setUseUppercase(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-700">Uppercase Letters (A-Z)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useLowercase}
                  onChange={(e) => setUseLowercase(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-700">Lowercase Letters (a-z)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-700">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useSpecial}
                  onChange={(e) => setUseSpecial(e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-gray-700">Special Characters (!@#$%)</span>
              </label>
            </div>

            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Generated Password:</p>
              <p className="text-2xl font-mono text-gray-900 break-all select-all">{password}</p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={generatePassword}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Generate
              </button>
              <button 
                onClick={handleCopyToClipboard}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                {copySuccess ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Password History */}
          {passwordHistory.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Recently Generated</h3>
              <div className="space-y-2">
                {passwordHistory.map((pwd, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <span className="font-mono text-sm">{pwd}</span>
                    <button 
                      onClick={() => copyHistoryPassword(pwd)}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Password Security Guide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Password Security 101</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">🔐</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Long Passwords</h3>
                  <p className="text-gray-600">
                    Longer passwords are exponentially harder to crack. Aim for at least 12-16 characters for important
                    accounts.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔤</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Mix Character Types</h3>
                  <p className="text-gray-600">
                    Combine uppercase, lowercase, numbers, and special characters. This dramatically increases password
                    complexity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🚫</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Avoid Common Patterns</h3>
                  <p className="text-gray-600">
                    Don't use birthdays, names, or sequential numbers. Hackers use dictionary attacks targeting common
                    patterns.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🔄</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Unique Passwords</h3>
                  <p className="text-gray-600">
                    Never reuse passwords across multiple accounts. If one account is compromised, all others remain
                    secure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Password Manager Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Use a Password Manager</h3>
            <p className="text-gray-600 mb-4">
              Remembering complex passwords for multiple accounts is difficult. Consider using a password manager like
              Bitwarden, 1Password, or LastPass to securely store your passwords.
            </p>
            <p className="text-gray-600">
              Password managers encrypt your passwords and require only one master password to access them all.
            </p>
          </div>

          {/* Common Mistakes */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Common Password Mistakes</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Writing Passwords Down</h3>
                <p className="text-gray-600">
                  Never write passwords on sticky notes or in unsecured documents. Use a password manager instead.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Sharing Passwords</h3>
                <p className="text-gray-600">
                  Don't share passwords via email or messaging apps. Use secure password sharing features in password
                  managers.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Using Personal Information</h3>
                <p className="text-gray-600">
                  Avoid using names, birthdates, or other personal information that can be found on social media.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Ignoring Two-Factor Authentication</h3>
                <p className="text-gray-600">
                  Enable 2FA whenever available. It adds an extra security layer even if your password is compromised.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2025 ToolSnap Omni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}