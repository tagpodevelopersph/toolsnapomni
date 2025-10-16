"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, QrCode, LinkIcon, Calculator, Key, ImageIcon } from "lucide-react"

const tools = [
  { name: "File Converter", href: "/file-converter", icon: FileText },
  { name: "QR Generator", href: "/qr-generator", icon: QrCode },
  { name: "URL Shortener", href: "/url-shortener", icon: LinkIcon },
  { name: "Unit Converter", href: "/unit-converter", icon: Calculator },
  { name: "Password Generator", href: "/password-generator", icon: Key },
  { name: "Background Remover", href: "/background-remover", icon: ImageIcon },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
  <div className="flex items-center justify-between h-16">
  <Link href="/" className="flex items-center space-x-2">
   <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
  <FileText className="w-5 h-5 text-primary-foreground" />
   </div>
    <span className="font-bold text-xl">ToolSnap Omni</span>
    </Link>

          <div className="hidden md:flex items-center space-x-1">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === tool.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tool.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
