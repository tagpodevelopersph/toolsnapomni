import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "toolsnapomni - Quick & Snappy Web Tools",
  description:
    "Your all-in-one platform for productivity and creative web tools. Time zone converter, unit converter, URL shortener, email validator, text tools, and more. Fast, accurate, and designed for professionals.",
  generator: "v0.app",
  keywords:
    "productivity tools, converter, URL shortener, email validator, text case converter, grammar checker, keyword generator, web tools",
  openGraph: {
    title: "toolsnapomni - Quick & Snappy Web Tools",
    description: "Your all-in-one platform for productivity and creative web tools.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
