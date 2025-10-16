"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ShortenedUrl {
  original: string
  shortened: string
  alias: string
  clicks: number
  created: string
}

export default function RedirectPage() {
  const params = useParams()
  const alias = params.alias as string
  const [urlData, setUrlData] = useState<ShortenedUrl | null>(null)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Find the URL data from localStorage
    const stored = localStorage.getItem("shortenedUrls")
    if (stored) {
      const urls: ShortenedUrl[] = JSON.parse(stored)
      const found = urls.find((url) => url.alias === alias)

      if (found) {
        setUrlData(found)

        // Update click count
        const updated = urls.map((url) => (url.alias === alias ? { ...url, clicks: url.clicks + 1 } : url))
        localStorage.setItem("shortenedUrls", JSON.stringify(updated))

        // Start countdown and redirect
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              window.location.href = found.original
              return 0
            }
            return prev - 1
          })
        }, 1000)

        return () => clearInterval(timer)
      }
    }
  }, [alias])

  const redirectNow = () => {
    if (urlData) {
      window.location.href = urlData.original
    }
  }

  if (!urlData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Link Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">The shortened URL you're looking for doesn't exist or has expired.</p>
            <Link href="/">
              <Button className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Go Home</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Redirecting...</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold text-primary">{countdown}</div>
          <p className="text-muted-foreground">You will be redirected to:</p>
          <p className="text-sm font-mono bg-muted p-2 rounded break-all">{urlData.original}</p>
          <div className="flex flex-col space-y-2">
            <Button onClick={redirectNow} className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Go Now</span>
            </Button>
            <Link href="/url-shortener">
              <Button variant="outline" className="w-full bg-transparent">
                Cancel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
