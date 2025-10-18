import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Free Unit Converter - Convert Length, Weight, Temperature | ToolSnap Omni",
  description:
    "Convert between various units of measurement including length, weight, temperature, volume, and more. Instant and accurate conversions.",
  keywords: "unit converter, length converter, weight converter, temperature converter, measurement converter",
}

export default function UnitConverterPage() {
  const conversionCategories = [
    { name: "Length", units: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Yard", "Foot", "Inch"] },
    { name: "Weight", units: ["Kilogram", "Gram", "Milligram", "Pound", "Ounce", "Ton", "Stone"] },
    { name: "Temperature", units: ["Celsius", "Fahrenheit", "Kelvin"] },
    { name: "Volume", units: ["Liter", "Milliliter", "Gallon", "Quart", "Pint", "Cup", "Fluid Ounce"] },
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Unit Converter</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Convert between different units of measurement instantly. Support for length, weight, temperature, volume,
            and more.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#converter">Start Converting</a>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Converter Tool */}
          <div id="converter" className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Convert Units</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Conversion Type</label>
              <select className="w-full border border-border rounded-lg p-2 bg-background text-foreground">
                <option>Length</option>
                <option>Weight</option>
                <option>Temperature</option>
                <option>Volume</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="flex-1 border border-border rounded-lg p-2 bg-background text-foreground"
                    placeholder="Enter value"
                  />
                  <select className="border border-border rounded-lg p-2 bg-background text-foreground">
                    <option>Meter</option>
                    <option>Kilometer</option>
                    <option>Mile</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="flex-1 border border-border rounded-lg p-2 bg-background text-foreground"
                    placeholder="Result"
                    disabled
                  />
                  <select className="border border-border rounded-lg p-2 bg-background text-foreground">
                    <option>Foot</option>
                    <option>Inch</option>
                    <option>Yard</option>
                  </select>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Convert</Button>
          </div>

          {/* Supported Units */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Supported Conversion Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conversionCategories.map((category) => (
                <div key={category.name} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.units.map((unit) => (
                      <span key={unit} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {unit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Conversions */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Common Conversion Mistakes to Avoid</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Confusing Metric and Imperial Systems</h3>
                <p className="text-muted-foreground">
                  The metric system (meters, kilograms) and imperial system (feet, pounds) use different scales. Always
                  verify which system you're converting to.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Temperature Conversion Complexity</h3>
                <p className="text-muted-foreground">
                  Temperature conversions aren't simple multiplication. Celsius to Fahrenheit requires adding 32 after
                  multiplying by 9/5.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Rounding Errors in Calculations</h3>
                <p className="text-muted-foreground">
                  Small rounding errors can accumulate in complex conversions. Use precise conversion factors for
                  accuracy.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Forgetting Context in Real-World Applications</h3>
                <p className="text-muted-foreground">
                  In cooking, construction, or science, precision matters. Always double-check conversions for critical
                  applications.
                </p>
              </div>
            </div>
          </div>
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
