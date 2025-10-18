"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Key, Copy, RefreshCw, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PasswordOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  excludeSimilar: boolean
}

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("")
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
  })
  const [strength, setStrength] = useState(0)
  const [strengthLabel, setStrengthLabel] = useState("")
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([])
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""

    if (options.includeLowercase) {
      charset += options.excludeSimilar ? "abcdefghjkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz"
    }
    if (options.includeUppercase) {
      charset += options.excludeSimilar ? "ABCDEFGHJKMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (options.includeNumbers) {
      charset += options.excludeSimilar ? "23456789" : "0123456789"
    }
    if (options.includeSymbols) {
      charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"
    }

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      })
      return
    }

    let newPassword = ""
    const array = new Uint8Array(options.length)
    crypto.getRandomValues(array)

    for (let i = 0; i < options.length; i++) {
      newPassword += charset[array[i] % charset.length]
    }

    setPassword(newPassword)

    // Add to history (keep last 5)
    setGeneratedPasswords((prev) => [newPassword, ...prev.slice(0, 4)])
  }

  const calculateStrength = (pwd: string): { score: number; label: string } => {
    let score = 0

    // Length bonus
    if (pwd.length >= 8) score += 25
    if (pwd.length >= 12) score += 25

    // Character variety bonus
    if (/[a-z]/.test(pwd)) score += 10
    if (/[A-Z]/.test(pwd)) score += 10
    if (/[0-9]/.test(pwd)) score += 10
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20

    // Determine label
    let label = "Very Weak"
    if (score >= 80) label = "Very Strong"
    else if (score >= 60) label = "Strong"
    else if (score >= 40) label = "Medium"
    else if (score >= 20) label = "Weak"

    return { score: Math.min(score, 100), label }
  }

  useEffect(() => {
    if (password) {
      const { score, label } = calculateStrength(password)
      setStrength(score)
      setStrengthLabel(label)
    }
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [options])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied",
        description: "Password copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy password",
        variant: "destructive",
      })
    }
  }

  const getStrengthColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-blue-500"
    if (score >= 40) return "bg-yellow-500"
    if (score >= 20) return "bg-orange-500"
    return "bg-red-500"
  }

  const getStrengthIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (score >= 60) return <Shield className="w-4 h-4 text-blue-500" />
    if (score >= 40) return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    return <AlertTriangle className="w-4 h-4 text-red-500" />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">Password Generator</h1>
            <p className="text-muted-foreground text-pretty">Generate secure passwords with customizable options</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Password Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Password Options</span>
                </CardTitle>
                <CardDescription>Customize your password generation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Length Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Password Length</Label>
                    <span className="text-sm font-medium">{options.length}</span>
                  </div>
                  <Slider
                    value={[options.length]}
                    onValueChange={(value) => setOptions((prev) => ({ ...prev, length: value[0] }))}
                    min={4}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Character Options */}
                <div className="space-y-4">
                  <Label>Include Characters</Label>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={options.includeUppercase}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeUppercase: checked as boolean }))
                      }
                    />
                    <Label htmlFor="uppercase" className="text-sm">
                      Uppercase Letters (A-Z)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={options.includeLowercase}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeLowercase: checked as boolean }))
                      }
                    />
                    <Label htmlFor="lowercase" className="text-sm">
                      Lowercase Letters (a-z)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={options.includeNumbers}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeNumbers: checked as boolean }))
                      }
                    />
                    <Label htmlFor="numbers" className="text-sm">
                      Numbers (0-9)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={options.includeSymbols}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeSymbols: checked as boolean }))
                      }
                    />
                    <Label htmlFor="symbols" className="text-sm">
                      Symbols (!@#$%^&*)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exclude-similar"
                      checked={options.excludeSimilar}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, excludeSimilar: checked as boolean }))
                      }
                    />
                    <Label htmlFor="exclude-similar" className="text-sm">
                      Exclude Similar Characters (0, O, l, I)
                    </Label>
                  </div>
                </div>

                <Button onClick={generatePassword} className="w-full flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Generate New Password</span>
                </Button>
              </CardContent>
            </Card>

            {/* Generated Password */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Password</CardTitle>
                <CardDescription>Your secure password is ready to use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Password Display */}
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={password}
                      readOnly
                      className="font-mono text-sm"
                      placeholder="Generated password will appear here"
                    />
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(password)} disabled={!password}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Password Strength */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Password Strength</Label>
                      <div className="flex items-center space-x-2">
                        {getStrengthIcon(strength)}
                        <span className="text-sm font-medium">{strengthLabel}</span>
                      </div>
                    </div>
                    <Progress value={strength} className="w-full" />
                  </div>
                )}

                {/* Password History */}
                {generatedPasswords.length > 0 && (
                  <div className="space-y-2">
                    <Label>Recent Passwords</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {generatedPasswords.map((pwd, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded">
                          <code className="flex-1 text-xs truncate">{pwd}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(pwd)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Security Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Password Security Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Use Unique Passwords</h4>
                  <p className="text-muted-foreground">Never reuse passwords across different accounts or services</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Enable 2FA</h4>
                  <p className="text-muted-foreground">Add two-factor authentication for an extra layer of security</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Use a Password Manager</h4>
                  <p className="text-muted-foreground">
                    Store your passwords securely with a reputable password manager
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
