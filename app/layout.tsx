import type React from "react"
import type { Metadata } from "next"
<<<<<<< HEAD
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
=======
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"
import Footer from "../components/footer"

export const metadata: Metadata = {
  title: "ToolSnap Omni - Professional Utility Suite",
  description: "Convert files, generate QR codes, shorten URLs, remove backgrounds, and more with our comprehensive toolkit",
  generator: "v0.app",
  keywords: "tools, utilities, file converter, QR code generator, URL shortener, background remover",
  authors: [{ name: "ToolSnap Omni" }],
  viewport: "width=device-width, initial-scale=1",
}

// Google AdSense Header Ad Component
function HeaderAd() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3">
      <div className="text-xs text-muted-foreground text-center mb-1">Advertisement</div>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4388013707550348"
        data-ad-slot="2304735028"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Google AdSense Footer Ad Component
function FooterAd() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3">
      <div className="text-xs text-muted-foreground text-center mb-1">Advertisement</div>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4388013707550348"
        data-ad-slot="5545427292"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Enhanced Loading Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto"></div>
          <div className="animate-pulse absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-primary/40"></div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">Loading ToolSnap Omni</p>
          <p className="text-sm text-muted-foreground">Preparing your toolkit...</p>
        </div>
      </div>
    </div>
  )
>>>>>>> 21447ab113fc3597b8d0f8e46447c9fe12cfa53e
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
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
=======
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense Script - No onError prop, as it's a Server Component */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4388013707550348"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        <meta name="google-adsense-account" content="ca-pub-4388013707550348" />

        {/* Preconnect to improve performance */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Additional meta tags for better SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
      </head>
      
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          {/* Header Ad Section */}
          <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
            <HeaderAd />
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            <Suspense fallback={<LoadingSpinner />}>
              <div className="flex-1">
                {children}
              </div>
            </Suspense>
            
            {/* Footer Component - Part of Main Content */}
            <Footer />
          </main>

          {/* Footer Ad Section */}
          <section className="bg-background border-t border-border/50 mt-auto">
            <FooterAd />
            
            {/* Copyright Section */}
            <div className="border-t border-border/30">
              <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} ToolSnap Omni. All rights reserved.
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Professional utility suite for all your digital needs
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {}
>>>>>>> 21447ab113fc3597b8d0f8e46447c9fe12cfa53e
        <Analytics />
      </body>
    </html>
  )
}
