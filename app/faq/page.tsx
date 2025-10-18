import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | ToolSnap Omni",
  description:
    "Find answers to common questions about ToolSnap Omni tools, security, privacy, and how to use our platform.",
  keywords: "FAQ, frequently asked questions, help, support",
}

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is ToolSnap Omni?",
          a: "ToolSnap Omni is a free, all-in-one utility suite that provides online tools for everyday tasks including file conversion, QR code generation, URL shortening, unit conversion, password generation, and background removal.",
        },
        {
          q: "Is ToolSnap Omni really free?",
          a: "Yes, absolutely! All tools on ToolSnap Omni are completely free to use. There are no hidden fees, no premium plans, and no subscriptions. We believe powerful tools should be accessible to everyone.",
        },
        {
          q: "Do I need to create an account?",
          a: "No, you don't need to create an account to use ToolSnap Omni. All tools are accessible immediately without registration or login.",
        },
        {
          q: "What devices can I use ToolSnap Omni on?",
          a: "ToolSnap Omni works on any device with a web browser, including desktop computers, laptops, tablets, and smartphones. No installation is required.",
        },
      ],
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          q: "Is my data secure on ToolSnap Omni?",
          a: "Yes, security is our top priority. All data is transmitted using SSL encryption, and we never store your files permanently. Files are processed securely and automatically deleted after conversion.",
        },
        {
          q: "Do you store my files?",
          a: "No, we do not store your files. All processing happens in real-time, and files are automatically deleted after the operation is complete. Your data is never stored on our servers.",
        },
        {
          q: "Do you share my data with third parties?",
          a: "No, we never share your data with third parties. Your information is kept confidential and used only to provide our services. See our Privacy Policy for more details.",
        },
        {
          q: "Is my password safe when I generate one?",
          a: "Yes, passwords are generated locally in your browser and are never transmitted to our servers. You have complete control over your generated passwords.",
        },
      ],
    },
    {
      category: "Tools & Features",
      questions: [
        {
          q: "What file formats does the File Converter support?",
          a: "Our File Converter supports a wide range of formats including images (PNG, JPG, GIF, WebP), documents (PDF, DOCX, XLSX), videos (MP4, AVI, MOV), and audio files (MP3, WAV, FLAC).",
        },
        {
          q: "What's the maximum file size I can convert?",
          a: "We support files up to 500MB. For larger files, consider splitting them into smaller parts before conversion.",
        },
        {
          q: "Can I customize QR codes?",
          a: "Yes, you can customize QR codes by adjusting size, format, and error correction levels. Some features like custom colors and logos may be available depending on your needs.",
        },
        {
          q: "How long are shortened URLs valid?",
          a: "Shortened URLs created with ToolSnap Omni remain valid indefinitely as long as our service is active. We maintain all shortened links permanently.",
        },
        {
          q: "Can I track clicks on my shortened URLs?",
          a: "Yes, our URL Shortener provides analytics showing click counts, geographic data, and referrer information to help you understand your audience.",
        },
      ],
    },
    {
      category: "Technical Issues",
      questions: [
        {
          q: "Why is my file conversion taking so long?",
          a: "Conversion time depends on file size and format complexity. Most conversions complete within seconds, but larger files may take a minute or two. If it takes longer, try refreshing the page.",
        },
        {
          q: "Why did my conversion fail?",
          a: "Conversions can fail due to corrupted source files, unsupported formats, or server issues. Try uploading a different file or using a different format. If problems persist, contact support.",
        },
        {
          q: "Does ToolSnap Omni work offline?",
          a: "No, ToolSnap Omni requires an internet connection to function. All processing happens on our servers, so you need to be online to use our tools.",
        },
        {
          q: "Which browsers does ToolSnap Omni support?",
          a: "ToolSnap Omni works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.",
        },
      ],
    },
    {
      category: "Account & Usage",
      questions: [
        {
          q: "Are there any usage limits?",
          a: "We don't impose strict usage limits, but we do have fair use policies to ensure service quality for all users. Excessive usage may be throttled temporarily.",
        },
        {
          q: "Can I use ToolSnap Omni for commercial purposes?",
          a: "Yes, you can use ToolSnap Omni for commercial purposes. Our tools are free for both personal and business use.",
        },
        {
          q: "Can I embed ToolSnap Omni tools on my website?",
          a: "Currently, our tools are designed for use on the ToolSnap Omni platform. Contact us if you're interested in embedding options.",
        },
        {
          q: "How do I report a bug or suggest a feature?",
          a: "We'd love to hear from you! Use our Contact page to report bugs or suggest new features. Your feedback helps us improve ToolSnap Omni.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            ToolSnap Omni
          </Link>
          <div className="flex gap-6">
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition">
              Blog
            </Link>
            <Link href="/faq" className="text-foreground hover:text-primary transition">
              FAQ
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about ToolSnap Omni and how to use our tools.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold text-foreground mb-6">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((item, idx) => (
                  <details key={idx} className="bg-card border border-border rounded-lg p-6 group">
                    <summary className="cursor-pointer font-semibold text-foreground flex justify-between items-center">
                      {item.q}
                      <span className="text-primary group-open:rotate-180 transition">▼</span>
                    </summary>
                    <p className="text-muted-foreground mt-4">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Didn't find your answer?</h2>
          <p className="mb-6 opacity-90">
            If you have a question that's not answered here, please don't hesitate to contact us.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-foreground text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary-foreground/90 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2025 ToolSnap Omni. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
