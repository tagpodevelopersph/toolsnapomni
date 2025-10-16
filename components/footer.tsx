"use client"

import { useState } from "react"
import Link from "next/link"
import { FaFacebookF, FaDiscord, FaInstagram, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"
import { FaEnvelope, FaHeart, FaCoffee } from "react-icons/fa"
import { HiOutlineExternalLink } from "react-icons/hi"

export default function Footer() {
  const [isSocialPopupVisible, setIsSocialPopupVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const currentYear = new Date().getFullYear()

  const toolCategories = [
    { name: "File Converter", href: "/converter" },
    { name: "QR Generator", href: "/qr-generator" },
    { name: "URL Shortener", href: "/url-shortener" },
    { name: "Background Remover", href: "/background-remover" },
  ]

  const companyLinks = [
    { name: "About Us", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ]

  const handleSocialToggle = () => {
    setIsSocialPopupVisible(!isSocialPopupVisible)
  }

  const handleClosePopup = () => {
    setIsSocialPopupVisible(false)
  }

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  ToolSnap Omni
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  Your ultimate professional utility suite. Powerful tools made simple, 
                  accessible, and completely free for everyone.
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-4 text-xs text-gray-500">
                <div className="text-center">
                  <div className="font-semibold text-white">10K+</div>
                  <div>Users</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white">50K+</div>
                  <div>Files Processed</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white">99.9%</div>
                  <div>Uptime</div>
                </div>
              </div>
            </div>

            {/* Tools Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <h4 className="text-lg font-semibold text-white">Popular Tools</h4>
              <nav className="space-y-2">
                {toolCategories.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="flex items-center justify-center lg:justify-start text-gray-400 hover:text-blue-400 transition-all duration-200 group"
                  >
                    <span>{tool.name}</span>
                    <HiOutlineExternalLink className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company Links */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <nav className="space-y-2">
                {companyLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-center lg:justify-start text-gray-400 hover:text-blue-400 transition-all duration-200 group"
                  >
                    <span>{link.name}</span>
                    <HiOutlineExternalLink className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
              
              {/* Support Email */}
              <a 
                href="mailto:support@toolsnapomni.com" 
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-200 group"
              >
                <FaEnvelope className="mr-2 group-hover:scale-110 transition-transform" /> 
                <span>Support</span>
              </a>

              {/* Developer Follow Button */}
              <div className="relative">
                <button
                  onClick={handleSocialToggle}
                  className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 border border-gray-700 hover:border-gray-600"
                  type="button"
                >
                  <FaHeart className="mr-2 text-red-400" />
                  <span className="text-sm">Follow Developer</span>
                </button>
                
                {/* Enhanced Social Media Popup */}
                {isSocialPopupVisible && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-xl z-20 min-w-max">
                    <div className="text-xs text-gray-400 text-center mb-3">Follow me on social media</div>
                    <div className="flex space-x-3">
                      <a 
                        href="https://www.facebook.com/acedigitalsphl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-colors duration-200 group"
                        title="Facebook"
                      >
                        <FaFacebookF size={16} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a 
                        href="https://www.facebook.com/acedigitalsphl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-gray-700 hover:bg-pink-600 rounded-lg transition-colors duration-200 group"
                        title="Instagram"
                      >
                        <FaInstagram size={16} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a 
                        href="https://www.facebook.com/acedigitalsphl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-gray-700 hover:bg-indigo-600 rounded-lg transition-colors duration-200 group"
                        title="Discord"
                      >
                        <FaDiscord size={16} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a 
                        href="https://www.facebook.com/acedigitalsphl" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 group"
                        title="X (Twitter)"
                      >
                        <FaXTwitter size={16} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a 
                        href="https://github.com/yourprofile" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 group"
                        title="GitHub"
                      >
                        <FaGithub size={16} className="group-hover:scale-110 transition-transform" />
                      </a>
                      <a 
                        href="https://linkedin.com/in/yourprofile" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-gray-700 hover:bg-blue-500 rounded-lg transition-colors duration-200 group"
                        title="LinkedIn"
                      >
                        <FaLinkedinIn size={16} className="group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                    {/* Popup Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                )}
              </div>

              {/* Buy Me Coffee */}
              <a 
                href="buymeacoffee.com/acecandar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-colors duration-200 font-medium text-sm"
              >
                <FaCoffee className="mr-2" />
                <span>Buy me a coffee</span>
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400">
                  &copy; {currentYear} ToolSnap Omni. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Built with <FaHeart className="inline w-3 h-3 text-red-400 mx-1" /> for the community
                </p>
              </div>

              {/* Version & Back to Top */}
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded">
                  v2.0.0
                </span>
                <button
                  onClick={scrollToTop}
                  className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
                  type="button"
                >
                  <span className="mr-1">Back to top</span>
                  <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close popup */}
      {isSocialPopupVisible && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={handleClosePopup}
        />
      )}
    </footer>
  )
}