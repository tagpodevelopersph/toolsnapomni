"use client"

import { useState } from "react"
import { X, Zap, Copy, Check, ChevronDown } from "lucide-react"
import AdBanner from "@/components/AdBanner"

type Tool =
  | "timezone"
  | "unit"
  | "urlshortener"
  | "emailvalidator"
  | "datecalculator"
  | "textcase"
  | "wordcounter"
  | "hashtag"
  | null

type Section = "tools" | "tutorials" | "faqs" | null

interface FAQItem {
  question: string
  answer: string
}

interface Tutorial {
  tool: string
  title: string
  steps: string[]
  tips: string[]
}

interface Blog {
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tools: string[]
}

export default function Page() {
  const [activeTool, setActiveTool] = useState<Tool>(null)
  const [activeSection, setActiveSection] = useState<Section>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const tools = [
    {
      id: "timezone",
      name: "Time Zone Converter",
      description: "Convert times across the globe",
      icon: "🌍",
    },
    {
      id: "unit",
      name: "Unit Converter",
      description: "Currency, length, weight & more",
      icon: "⚙️",
    },
    {
      id: "urlshortener",
      name: "URL Shortener",
      description: "Create short, shareable links",
      icon: "🔗",
    },
    {
      id: "emailvalidator",
      name: "Email Validator",
      description: "Verify email addresses instantly",
      icon: "✉️",
    },
    {
      id: "datecalculator",
      name: "Date Calculator",
      description: "Calculate days between dates",
      icon: "📅",
    },
    {
      id: "textcase",
      name: "Text Case Converter",
      description: "Change text formatting instantly",
      icon: "🔤",
    },
    {
      id: "wordcounter",
      name: "Word & Character Counter",
      description: "Count words, characters & more",
      icon: "📊",
    },
    {
      id: "hashtag",
      name: "Hashtag Generator",
      description: "Create trending hashtags easily",
      icon: "#️⃣",
    },
  ]

  const faqs: FAQItem[] = [
    {
      question: "Are my conversions accurate?",
      answer:
        "Absolutely. Our tools use industry-standard conversion rates updated regularly. All calculations are performed on your device for instant, offline-capable results.",
    },
    {
      question: "Is my data secure on toolsnapomni?",
      answer:
        "Yes. We never store or transmit your data to our servers. All processing happens locally on your browser. No cookies, no tracking, no data collection.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, most tools work offline since processing happens in your browser. Just load the page while online first.",
    },
    {
      question: "How are you making money if it's free?",
      answer:
        "We believe in building quality tools first. Currently, toolsnapomni is maintained as a free service. Future monetization may include optional premium features. Also, we currently run google ads on our website.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "toolsnapomni works on all modern browsers: Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for best performance.",
    },
    {
      question: "Can I use these tools for commercial purposes?",
      answer:
        "Yes! All tools are completely free to use for personal and commercial projects. No attribution needed, though we appreciate it.",
    },
    {
      question: "How often are you adding new tools?",
      answer:
        "We regularly analyze user feedback and industry needs to add new tools. Check back regularly or follow our updates for the latest additions.",
    },
    {
      question: "Can I embed these tools on my website?",
      answer:
        "Currently, the tools are designed for standalone use. We're exploring embedding options. Feel free to reach out if interested.",
    },
  ]

  const tutorials: Tutorial[] = [
    {
      tool: "Time Zone Converter",
      title: "Convert Times Across Time Zones",
      steps: [
        "Select your starting time zone from the first dropdown",
        "Select your destination time zone from the second dropdown",
        "Enter the time in 24-hour format (e.g., 14:30 for 2:30 PM)",
        "The converted time appears instantly below",
        "Use this for scheduling calls, meetings, or events across regions",
      ],
      tips: [
        "Bookmark your frequently used timezone pairs for quick access",
        "Remember that daylight saving time affects conversions in spring and fall",
        "Use the current time option to check what time it is right now in other zones",
      ],
    },
    {
      tool: "Unit Converter",
      title: "Convert Units Accurately",
      steps: [
        "Choose the unit type you want to convert from the 'From' dropdown",
        "Select the unit you want to convert to in the 'To' dropdown",
        "Enter the value you want to convert",
        "See the result instantly displayed below",
        "Supported conversions: weight (kg, lb, oz), distance (m, ft, cm, in)",
      ],
      tips: [
        "The converter handles decimal values for precise measurements",
        "Useful for international business, travel, and scientific calculations",
        "Bookmark common conversions for faster access",
      ],
    },
    {
      tool: "URL Shortener",
      title: "Create Shortened Links",
      steps: [
        "Paste your long URL into the input field",
        "Click 'Generate Short URL' to create a shortened version",
        "Copy the generated short URL using the copy button",
        "Share the short link anywhere - social media, emails, messages",
        "Short links are cleaner and easier to remember",
      ],
      tips: [
        "Use short links for social media posts to save character space",
        "Shortened URLs are perfect for text messages and QR codes",
        "Share analytics-friendly links with a consistent brand prefix",
      ],
    },
    {
      tool: "Email Validator",
      title: "Verify Email Addresses",
      steps: [
        "Type or paste an email address into the field",
        "Click the 'Validate' button",
        "See instant feedback on whether the email is valid",
        "Valid emails follow the format: name@domain.com",
        "Use for form validation and email list cleaning",
      ],
      tips: [
        "Valid format doesn't guarantee the email is active",
        "Use this before sending bulk emails to verify addresses",
        "Helpful for building clean contact lists",
      ],
    },
    {
      tool: "Date Calculator",
      title: "Calculate Days Between Dates",
      steps: [
        "Select your start date using the date picker",
        "Select your end date using the second date picker",
        "The number of days between them calculates automatically",
        "Use for project timelines, deadlines, and age calculations",
        "Perfect for determining project duration and milestones",
      ],
      tips: [
        "Use for deadline tracking and project planning",
        "Calculate vacation days, contract periods, or event countdowns",
        "Plan deliverables with accurate day counts",
      ],
    },
    {
      tool: "Text Case Converter",
      title: "Convert Text Formatting",
      steps: [
        "Paste or type your text into the input area",
        "See all case variations generate automatically",
        "Uppercase: ALL LETTERS CAPITALIZED",
        "Lowercase: all letters small",
        "Title Case: Each Word Starts With Capital Letter",
        "Capitalize: First word capitalized",
      ],
      tips: [
        "Perfect for formatting headlines, titles, and headings",
        "Use for social media posts and marketing content",
        "Quickly fix accidental ALL CAPS text",
      ],
    },
    {
      tool: "Word & Character Counter",
      title: "Count Words and Characters",
      steps: [
        "Paste your content into the text area",
        "View instant statistics for your text",
        "Characters: Total including spaces",
        "Characters (no spaces): Only letters and punctuation",
        "Words: Individual word count",
        "Sentences: Count of sentences",
        "Paragraphs: Count of text blocks",
      ],
      tips: [
        "Essential for meeting word count requirements",
        "Use for social media posts with character limits",
        "Perfect for blog posts, essays, and content optimization",
        "Track reading time and content length",
      ],
    },
    {
      tool: "Hashtag Generator",
      title: "Generate Relevant Hashtags",
      steps: [
        "Enter your content topic or keywords",
        "Click 'Generate Hashtags' to create tags",
        "The tool extracts 5 key words and adds # symbol",
        "Copy all hashtags at once using the copy button",
        "Paste into your social media posts",
      ],
      tips: [
        "Use relevant keywords for your content niche",
        "Mix popular and niche hashtags for better reach",
        "Research trending hashtags in your industry",
        "Use 5-10 hashtags per post for optimal engagement",
      ],
    },
  ]

  const blogs: Blog[] = [
    {
      title: "Remote Work: Mastering Timezone Coordination",
      excerpt:
        "Working with a distributed team across multiple timezones? Learn how to schedule meetings, deadlines, and collaboration efficiently.",
      content: `When you're managing a remote team across continents, timezone coordination becomes crucial. Here's how to master it:

1. **Always Communicate in UTC**: When scheduling important meetings, always reference UTC time to avoid confusion. Use our Time Zone Converter to quickly show local times for all team members.

2. **Respect Work Hours**: Don't schedule critical meetings at 6 AM for some team members. Be mindful of timezone differences and aim for overlapping hours.

3. **Document Everything**: Write meeting times in multiple timezones. Example: "Meeting at 2 PM EST / 7 PM GMT / 11 PM IST"

4. **Use Timezone Tools Proactively**: Before scheduling, use the Time Zone Converter to check what time proposals mean for each team member.

5. **Create a Timezone Reference**: Post a chart showing your team's timezones prominently in your workspace.

Many successful remote companies use a simple rule: record all meetings so anyone can catch up regardless of their timezone. Pair this with our timezone tools for seamless coordination.`,
      date: "2025-01-15",
      readTime: "5 min read",
      tools: ["Time Zone Converter"],
    },
    {
      title: "Content Creation: Optimizing Your Posts for Every Platform",
      excerpt: "Learn how to format and optimize your content for different social media platforms using smart tools.",
      content: `Content creators know the struggle: each platform has different character limits, formatting requirements, and best practices. Here's how to optimize:

1. **Know Your Platform Limits**:
- Twitter/X: 280 characters
- Instagram: 2,200 characters per caption
- LinkedIn: 3,000 characters for optimal engagement
- TikTok: Unlimited for captions but less is more

2. **Use Word & Character Counter**: Before posting, verify your content fits within platform limits. Our Word Counter shows you exact character counts including spaces.

3. **Format for Readability**: Different platforms favor different formats. LinkedIn prefers longer-form content. Twitter thrives on concise posts.

4. **Generate Hashtags**: Use our Hashtag Generator to add 5-10 relevant hashtags for maximum discoverability.

5. **A/B Test**: Create multiple versions of your content and track which performs best using our tools to maintain consistent formatting.

Pro tip: The best content is platform-native. Don't just copy-paste; adapt your message for each platform's unique culture.`,
      date: "2025-01-12",
      readTime: "6 min read",
      tools: ["Word & Character Counter", "Hashtag Generator", "Text Case Converter"],
    },
    {
      title: "International E-commerce: Currency and Unit Conversion Essentials",
      excerpt: "Selling globally? Master currency conversions and unit measurements for international customers.",
      content: `E-commerce businesses operating internationally face constant conversion challenges. Here's your guide:

1. **Currency Conversion**: Always display prices in customer's local currency. Use our Unit Converter for real-time rates. Update rates daily for accuracy.

2. **Unit Standards**: Different countries use different measurements:
- US/UK: Pounds, Ounces, Feet, Inches
- Europe/Asia: Kilograms, Meters, Centimeters

3. **Weight in Shipping**: Ensure shipping costs are calculated correctly by converting weights. A 5 lb package is ~2.27 kg in European systems.

4. **Dimension Conversions**: When sourcing products, convert dimensions between measurement systems to ensure proper fit.

5. **Be Transparent**: Show both original and converted units. Example: "Weight: 500g (1.1 lbs)" helps customers understand.

6. **Legal Compliance**: Some regions require showing measurements in local units first. Check local regulations.

Use our Unit Converter to verify calculations before scaling your international operations. Accuracy builds trust with global customers.`,
      date: "2025-01-10",
      readTime: "7 min read",
      tools: ["Unit Converter"],
    },
    {
      title: "Email Marketing: Building Clean, Verified Contact Lists",
      excerpt: "Protect your sender reputation by maintaining a verified email list with best practices.",
      content: `Email marketing success depends on list quality. Here's how to maintain a clean, engaged list:

1. **Validate on Collection**: Use our Email Validator when users sign up. Catch typos immediately.

2. **Regular List Cleaning**: Check your existing list with our Email Validator tool to identify invalid addresses.

3. **Remove Bounces**: After each campaign, remove emails that bounced. Invalid addresses damage your sender reputation.

4. **Segment Your List**: Valid emails are useless without engagement. Segment by interest, behavior, and engagement level.

5. **Prevent Spam Complaints**: 
- Always use a verified "From" address
- Include clear unsubscribe options
- Respect spam regulations (CAN-SPAM, GDPR)

6. **Monitor Your List Health**:
- Track bounce rates (target: <2%)
- Monitor unsubscribe rates
- Watch for spam complaints

Pro tip: A smaller list of verified, engaged subscribers beats a large list of inactive addresses. Quality over quantity always wins in email marketing.`,
      date: "2025-01-08",
      readTime: "5 min read",
      tools: ["Email Validator"],
    },
    {
      title: "Social Media Strategy: Using Data to Drive Engagement",
      excerpt: "Leverage analytics and our tools to craft data-driven social media strategies that convert.",
      content: `Data-driven social media strategies outperform gut-feeling approaches. Here's how:

1. **Track What Works**:
- Use Word Counter to track your post length
- Monitor which character counts get most engagement
- Test different lengths for your audience

2. **Hashtag Strategy**:
- Generate hashtags using our tool
- Mix popular and niche tags
- Monitor hashtag performance
- Avoid using too many (5-10 is ideal)

3. **Best Times to Post**:
- Tools like Time Zone Converter help schedule for multiple regions
- Post when your audience is most active
- Schedule content across timezones using timezone tools

4. **Content Calendar**:
- Plan content with consistent formatting using our tools
- Pre-write posts with Character Counter
- Schedule for optimal times

5. **Engagement Metrics**:
- Track CTR (Click-Through Rate) on shortened URLs
- Monitor comments and shares
- Calculate engagement rate

6. **Analytics Tools**:
- Use platform-native analytics
- Combine with our URL Shortener for link tracking
- A/B test different formats

Remember: Social media success isn't luck—it's strategy backed by data.`,
      date: "2025-01-05",
      readTime: "6 min read",
      tools: ["Word & Character Counter", "Hashtag Generator", "URL Shortener", "Time Zone Converter"],
    },
  ]

  const copyToClipboard = (text: string) => {
    try {
      const sanitized = text.trim()
      if (typeof sanitized !== "string") {
        console.error("[Security] Invalid clipboard content type")
        return
      }
      navigator.clipboard.writeText(sanitized).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    } catch (err) {
      console.error("[Security] Clipboard error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
            Quick &{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Snappy</span> Web
            Tools
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to boost your productivity in one place. From currency conversions to content analysis,
            we've got you covered with lightning-fast, accurate tools designed for modern professionals.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-2xl">
            <AdBanner adClient="ca-pub-4388013707550348" adSlot="2304735028" />
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-balance">Choose Your Tool</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as Tool)}
                className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-accent hover:shadow-lg hover:shadow-accent/20 p-6 text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-300" />
                <div className="relative z-10 space-y-3">
                  <div className="text-4xl" role="img" aria-label={tool.name}>
                    {tool.icon}
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-balance">Insights & Tips</h3>
          <p className="text-lg text-muted-foreground mb-12">
            Learn how to use our tools effectively and discover best practices for productivity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, idx) => (
              <article
                key={idx}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:border-accent"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {blog.tools.map((tool) => (
                    <span key={tool} className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{blog.title}</h4>
                <p className="text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-2xl">
            <AdBanner adClient="ca-pub-4388013707550348" adSlot="5545427292" />
          </div>
        </div>
      </section>

      {/* Tutorials Quick Access */}
      <section id="tutorials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-balance">Tutorials</h3>
          <button
            onClick={() => setActiveSection(activeSection === "tutorials" ? null : "tutorials")}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
          >
            View All Tutorials
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-balance">Frequently Asked Questions</h3>
          <p className="text-lg text-muted-foreground mb-12">
            Have questions? We've got answers. Check out our FAQ below.
          </p>

          <button
            onClick={() => setActiveSection(activeSection === "faqs" ? null : "faqs")}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors mb-8"
          >
            {activeSection === "faqs" ? "Hide FAQs" : "View FAQs"}
          </button>

          {activeSection === "faqs" && (
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-foreground text-left">{faq.question}</h4>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${expandedFAQ === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-4 pb-4 border-t border-border">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-balance">About toolsnapomni</h3>

          <div className="space-y-8"></div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-balance">Get In Touch</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
        </div>
      </section>

      {/* Tool Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="tool-modal-enter bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-foreground">{tools.find((t) => t.id === activeTool)?.name}</h2>
              <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {activeTool === "timezone" && <TimeZoneConverter onCopy={() => setCopied(true)} />}
              {activeTool === "unit" && <UnitConverter />}
              {activeTool === "urlshortener" && <URLShortener />}
              {activeTool === "emailvalidator" && <EmailValidator />}
              {activeTool === "datecalculator" && <DateCalculator />}
              {activeTool === "textcase" && <TextCaseConverter />}
              {activeTool === "wordcounter" && <WordCounter />}
              {activeTool === "hashtag" && <HashtagGenerator />}
            </div>
          </div>
        </div>
      )}

      {/* Tutorials Modal */}
      {activeSection === "tutorials" && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="tool-modal-enter bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-foreground">Tool Tutorials</h2>
              <button
                onClick={() => setActiveSection(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {tutorials.map((tutorial, idx) => (
                <div key={idx} className="border-b border-border pb-8 last:border-0">
                  <h3 className="text-xl font-bold text-foreground mb-4">{tutorial.title}</h3>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Steps:</h4>
                    <ol className="space-y-2 text-foreground/80 list-decimal list-inside">
                      {tutorial.steps.map((step, stepIdx) => (
                        <li key={stepIdx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Pro Tips:</h4>
                    <ul className="space-y-2 text-foreground/80 list-disc list-inside">
                      {tutorial.tips.map((tip, tipIdx) => (
                        <li key={tipIdx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground">toolsnapomni</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                All your productivity tools in one place. Fast, accurate, and built with privacy as our foundation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#tools" className="hover:text-accent transition-colors">
                    Tools
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#tutorials" className="hover:text-accent transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-accent transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#about" className="hover:text-accent transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="mailto:help.linkrea@gmail.com" className="hover:text-accent transition-colors">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 toolsnapomni. Built with care by Ace Candar. All rights reserved.</p>
            <p className="mt-2">Your privacy is protected. No data collection. No tracking. Ever.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ... existing component functions ...

function TimeZoneConverter({ onCopy }: { onCopy: () => void }) {
  const [time, setTime] = useState(new Date().toISOString().split("T")[1].slice(0, 5))
  const [timezone1, setTimezone1] = useState("UTC")
  const [timezone2, setTimezone2] = useState("America/New_York")

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Dubai",
    "Asia/Tokyo",
    "Asia/Hong_Kong",
    "Asia/Singapore",
    "Asia/Bangkok",
    "Australia/Sydney",
    "Australia/Melbourne",
    "India/Kolkata",
    "Brazil/São Paulo",
  ]

  const convertTime = (tz1: string, tz2: string, t: string) => {
    try {
      const [hours, minutes] = t.split(":").map(Number)
      if (isNaN(hours) || isNaN(minutes)) return "Invalid"
      const baseDate = new Date()
      baseDate.setHours(hours, minutes, 0)

      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: tz2,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

      const parts = formatter.formatToParts(baseDate)
      const h = parts.find((p) => p.type === "hour")?.value
      const m = parts.find((p) => p.type === "minute")?.value
      return `${h}:${m}`
    } catch {
      return "Error"
    }
  }

  const result = convertTime(timezone1, timezone2, time)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">From Timezone</label>
          <select
            value={timezone1}
            onChange={(e) => setTimezone1(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">To Timezone</label>
          <select
            value={timezone2}
            onChange={(e) => setTimezone2(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Time (24-hour format)</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-muted-foreground mb-2">Converted Time</p>
        <p className="text-2xl font-bold text-foreground">{result}</p>
        <p className="text-xs text-muted-foreground mt-2">{timezone2}</p>
      </div>
    </div>
  )
}

function UnitConverter() {
  const [value, setValue] = useState("1")
  const [fromUnit, setFromUnit] = useState("kg")
  const [toUnit, setToUnit] = useState("lb")

  const conversions: Record<string, Record<string, number>> = {
    kg: { kg: 1, lb: 2.20462, oz: 35.274, g: 1000 },
    lb: { kg: 0.453592, lb: 1, oz: 16, g: 453.592 },
    oz: { kg: 0.0283495, lb: 0.0625, oz: 1, g: 28.3495 },
    g: { kg: 0.001, lb: 0.00220462, oz: 0.035274, g: 1 },
    m: { m: 1, ft: 3.28084, cm: 100, in: 39.3701, km: 0.001, mi: 0.000621371 },
    ft: { m: 0.3048, ft: 1, cm: 30.48, in: 12, km: 0.000304801, mi: 0.000189394 },
    cm: { m: 0.01, ft: 0.0328084, cm: 1, in: 0.393701, km: 0.00001, mi: 0.00000621371 },
    in: { m: 0.0254, ft: 0.0833333, cm: 2.54, in: 1, km: 0.0000254, mi: 0.0000157828 },
  }

  const numValue = Number.parseFloat(value)
  const result =
    !isNaN(numValue) && numValue >= 0 ? (numValue * (conversions[fromUnit]?.[toUnit] || 1)).toFixed(6) : "0"

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {Object.keys(conversions).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {Object.keys(conversions).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Value</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Enter value"
          min="0"
        />
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-sm text-muted-foreground mb-2">Result</p>
        <p className="text-3xl font-bold text-foreground">
          {result} {toUnit}
        </p>
      </div>
    </div>
  )
}

function URLShortener() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const generateShortUrl = () => {
    try {
      new URL(url)
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        alert("Please enter a valid URL starting with http:// or https://")
        return
      }
      const random = Math.random().toString(36).substring(2, 8)
      setShortUrl(`snapomni.co/${random}`)
    } catch {
      alert("Please enter a valid URL")
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Long URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/url"
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <button
        onClick={generateShortUrl}
        disabled={!url}
        className="w-full py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Generate Short URL
      </button>

      {shortUrl && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3">
          <p className="text-sm text-muted-foreground">Short URL</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function EmailValidator() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null)

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = regex.test(email) && email.length <= 254 && email.length >= 6
    setResult({
      valid: isValid,
      message: isValid
        ? "✓ Email is valid and properly formatted"
        : "✗ Please enter a valid email address (6-254 characters)",
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          maxLength={254}
        />
      </div>

      <button
        onClick={validateEmail}
        disabled={!email}
        className="w-full py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Validate
      </button>

      {result && (
        <div
          className={`p-4 rounded-lg border ${result.valid ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900" : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900"}`}
        >
          <p className={result.valid ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
            {result.message}
          </p>
        </div>
      )}
    </div>
  )
}

function DateCalculator() {
  const [date1, setDate1] = useState(new Date().toISOString().split("T")[0])
  const [date2, setDate2] = useState(new Date().toISOString().split("T")[0])

  const calculateDays = () => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diff = Math.abs(d2.getTime() - d1.getTime())
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const days = calculateDays()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
          <input
            type="date"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
          <input
            type="date"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-muted-foreground mb-2">Days Between</p>
        <p className="text-3xl font-bold text-foreground">{days} days</p>
        <p className="text-xs text-muted-foreground mt-2">
          From {new Date(date1).toLocaleDateString()} to {new Date(date2).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

function TextCaseConverter() {
  const [text, setText] = useState("")

  const conversions = {
    uppercase: text.toUpperCase(),
    lowercase: text.toLowerCase(),
    capitalize: text
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" "),
    titlecase: text
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Enter Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-24 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(conversions).map(([key, value]) => (
          <div key={key} className="p-3 rounded-lg bg-muted">
            <p className="text-xs font-medium text-muted-foreground mb-2 capitalize">{key}</p>
            <p className="text-sm text-foreground break-words">{value || "—"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WordCounter() {
  const [text, setText] = useState("")

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter((p) => p.trim()).length : 0,
    readingTime: Math.max(1, Math.ceil((text.trim().split(/\s+/).length || 0) / 200)),
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Enter Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs text-muted-foreground mb-1">Characters</p>
          <p className="text-2xl font-bold text-foreground">{stats.characters}</p>
        </div>
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs text-muted-foreground mb-1">Words</p>
          <p className="text-2xl font-bold text-foreground">{stats.words}</p>
        </div>
        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs text-muted-foreground mb-1">No Spaces</p>
          <p className="text-2xl font-bold text-foreground">{stats.charactersNoSpaces}</p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Sentences</p>
          <p className="text-2xl font-bold text-foreground">{stats.sentences}</p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Paragraphs</p>
          <p className="text-2xl font-bold text-foreground">{stats.paragraphs}</p>
        </div>
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Read Time</p>
          <p className="text-2xl font-bold text-foreground">{stats.readingTime}m</p>
        </div>
      </div>
    </div>
  )
}

function HashtagGenerator() {
  const [text, setText] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const generateHashtags = () => {
    const words = text
      .toLowerCase()
      .split(/[\s\-_]+/)
      .filter((w) => w.length > 2 && !/^\d+$/.test(w))
      .slice(0, 8)

    const generated = words.map((w) => `#${w.replace(/[^\w]/g, "")}`)
    setHashtags(generated)
  }

  const allHashtags = hashtags.join(" ")

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Enter Topic or Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your content idea here..."
          className="w-full px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-24 resize-none"
        />
      </div>

      <button
        onClick={generateHashtags}
        disabled={!text}
        className="w-full py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Generate Hashtags
      </button>

      {hashtags.length > 0 && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3">
          <p className="text-sm text-muted-foreground">Generated Hashtags</p>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-accent/20 text-accent font-medium text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={allHashtags}
              className="flex-1 px-3 py-2 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(allHashtags)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
