"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

interface AdBannerProps {
  adClient: string
  adSlot: string
}

export default function AdBanner({ adClient, adSlot }: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error("AdsbyGoogle error:", err)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}
