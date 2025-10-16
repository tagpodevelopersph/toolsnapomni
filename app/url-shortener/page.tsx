"use client"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LinkIcon, Copy, ExternalLink, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShortenedUrl {
  original: string
  shortened: string
  alias: string
  clicks: number
  created: string
}

export default function URLShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [customAlias, setCustomAlias] = useState("")
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([])
  const [isShortening, setIsShortening] = useState(false)
  const { toast } = useToast()

  const generateShortId = () => {
    return Math.random().toString(36).substring(2, 8)
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      })
      return
    }

    if (!isValidUrl(originalUrl)) {
      toast({
        title: "Error",
        description: "Please enter a valid URL (include http:// or https://)",
        variant: "destructive",
      })
      return
    }

    setIsShortening(true)

    try {
      // Generate a short ID or use custom alias
      const shortId = customAlias.trim() || generateShortId()
      
      // Check if custom alias already exists
      if (customAlias.trim() && shortenedUrls.some((url) => url.alias === customAlias.trim())) {
        toast({
          title: "Error",
          description: "This custom alias is already taken",
          variant: "destructive",
        })
        setIsShortening(false)
        return
      }

      // Create the shortened URL with TSO branding
      const shortenedUrl = `tso.ly/${shortId}`

      const newShortenedUrl: ShortenedUrl = {
        original: originalUrl,
        shortened: shortenedUrl,
        alias: shortId,
        clicks: 0,
        created: new Date().toLocaleDateString(),
      }

      setShortenedUrls((prev) => [newShortenedUrl, ...prev])
      
      // Store in memory instead of localStorage for Claude.ai compatibility
      setOriginalUrl("")
      setCustomAlias("")
      
      toast({
        title: "Success",
        description: "URL shortened successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsShortening(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied",
        description: "URL copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      })
    }
  }

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">TSO URL Shortener</h1>
            <p className="text-muted-foreground text-pretty">
              Create short TSO.ly URLs powered by ToolSnap Omni
            </p>
          </div>

          {/* URL Shortening Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LinkIcon className="w-5 h-5" />
                <span>Shorten URL</span>
              </CardTitle>
              <CardDescription>Enter a long URL to create a shortened TSO.ly version</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="original-url">Original URL</Label>
                <Input
                  id="original-url"
                  type="url"
                  placeholder="https://example.com/very/long/url/path"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-alias">Custom Alias (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground font-mono">tso.ly/</span>
                  <Input
                    id="custom-alias"
                    placeholder="my-custom-link"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Leave empty for auto-generated alias. Only letters, numbers, and hyphens allowed.
                </p>
              </div>
              <Button onClick={shortenUrl} disabled={isShortening || !originalUrl.trim()} className="w-full">
                {isShortening ? "Shortening..." : "Create TSO.ly Link"}
              </Button>
            </CardContent>
          </Card>

          {/* Shortened URLs List */}
          {shortenedUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your TSO.ly Links</CardTitle>
                <CardDescription>Manage and track your shortened links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shortenedUrls.map((url, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-primary font-mono">{url.shortened}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(url.shortened)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openUrl(url.original)}
                                className="h-6 w-6 p-0"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{url.original}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Created: {url.created}</span>
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="w-3 h-3" />
                            <span>{url.clicks} clicks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How TSO.ly Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">TSO Branding</h4>
                  <p className="text-muted-foreground">
                    All shortened URLs use the TSO.ly domain, reflecting ToolSnap Omni's identity
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Custom Aliases</h4>
                  <p className="text-muted-foreground">
                    Create memorable custom aliases like tso.ly/mylink or use auto-generated codes
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Click Tracking</h4>
                  <p className="text-muted-foreground">
                    Monitor engagement with built-in analytics for all your TSO.ly links
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