import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ToolSnap Omni - Professional Utility Suite for Everyday Tasks",
  description:
    "Free online tools for file conversion, QR codes, URL shortening, unit conversion, password generation, and background removal. All-in-one utility suite.",
  generator: "v0.app",
  keywords:
    "file converter, QR code generator, URL shortener, unit converter, password generator, background remover, online tools",
  metadataBase: new URL("https://toolsnapomni.site"),
  alternates: {
    canonical: "https://toolsnapomni.site",
  },
  openGraph: {
    title: "ToolSnap Omni - Professional Utility Suite",
    description:
      "Free online tools for file conversion, QR codes, URL shortening, unit conversion, password generation, and background removal.",
    type: "website",
    url: "https://toolsnapomni.site",
    siteName: "ToolSnap Omni",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolSnap Omni - Professional Utility Suite",
    description: "Free online tools for everyday tasks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ToolSnap Omni",
              description:
                "Free online utility suite with tools for file conversion, QR codes, URL shortening, unit conversion, password generation, and background removal",
              url: "https://toolsnapomni.site",
              applicationCategory: "Utility",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1000",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
