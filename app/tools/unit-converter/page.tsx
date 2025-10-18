'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnitConverterPage() {
  const [conversionType, setConversionType] = useState("Length")
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("Meter")
  const [toUnit, setToUnit] = useState("Foot")

  const conversionCategories: Record<string, { units: string[]; factors: Record<string, number> }> = {
    Length: {
      units: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Yard", "Foot", "Inch"],
      factors: {
        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Millimeter: 0.001,
        Mile: 1609.34,
        Yard: 0.9144,
        Foot: 0.3048,
        Inch: 0.0254,
      },
    },
    Weight: {
      units: ["Kilogram", "Gram", "Milligram", "Pound", "Ounce", "Ton", "Stone"],
      factors: {
        Kilogram: 1,
        Gram: 0.001,
        Milligram: 0.000001,
        Pound: 0.453592,
        Ounce: 0.0283495,
        Ton: 1000,
        Stone: 6.35029,
      },
    },
    Temperature: {
      units: ["Celsius", "Fahrenheit", "Kelvin"],
      factors: {},
    },
    Volume: {
      units: ["Liter", "Milliliter", "Gallon", "Quart", "Pint", "Cup", "Fluid Ounce"],
      factors: {
        Liter: 1,
        Milliliter: 0.001,
        Gallon: 3.78541,
        Quart: 0.946353,
        Pint: 0.473176,
        Cup: 0.236588,
        "Fluid Ounce": 0.0295735,
      },
    },
  }

  const handleConvert = () => {
    if (!fromValue || fromValue === "0") {
      setToValue("")
      return
    }

    const num = parseFloat(fromValue)

    if (conversionType === "Temperature") {
      let celsius = 0

      if (fromUnit === "Celsius") celsius = num
      else if (fromUnit === "Fahrenheit") celsius = (num - 32) * (5 / 9)
      else if (fromUnit === "Kelvin") celsius = num - 273.15

      let result = 0
      if (toUnit === "Celsius") result = celsius
      else if (toUnit === "Fahrenheit") result = celsius * (9 / 5) + 32
      else if (toUnit === "Kelvin") result = celsius + 273.15

      setToValue(result.toFixed(4))
    } else {
      const factors = conversionCategories[conversionType].factors
      const fromFactor = factors[fromUnit as keyof typeof factors]
      const toFactor = factors[toUnit as keyof typeof factors]

      const result = (num * fromFactor) / toFactor
      setToValue(result.toFixed(6))
    }
  }

  const handleConversionTypeChange = (type: string) => {
    setConversionType(type)
    const units = conversionCategories[type].units
    setFromUnit(units[0])
    setToUnit(units[1] || units[0])
    setFromValue("")
    setToValue("")
  }

  const currentUnits = conversionCategories[conversionType].units

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
              <select 
                value={conversionType}
                onChange={(e) => handleConversionTypeChange(e.target.value)}
                className="w-full border border-border rounded-lg p-2 bg-background text-foreground"
              >
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
                    value={fromValue}
                    onChange={(e) => {
                      setFromValue(e.target.value)
                      if (e.target.value) {
                        handleConvert()
                      } else {
                        setToValue("")
                      }
                    }}
                    className="flex-1 border border-border rounded-lg p-2 bg-background text-foreground"
                    placeholder="Enter value"
                  />
                  <select 
                    value={fromUnit}
                    onChange={(e) => {
                      setFromUnit(e.target.value)
                      if (fromValue) handleConvert()
                    }}
                    className="border border-border rounded-lg p-2 bg-background text-foreground"
                  >
                    {currentUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={toValue}
                    className="flex-1 border border-border rounded-lg p-2 bg-background text-foreground"
                    placeholder="Result"
                    disabled
                  />
                  <select 
                    value={toUnit}
                    onChange={(e) => {
                      setToUnit(e.target.value)
                      if (fromValue) handleConvert()
                    }}
                    className="border border-border rounded-lg p-2 bg-background text-foreground"
                  >
                    {currentUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleConvert}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Convert
            </Button>
          </div>

          {/* Supported Units */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Supported Conversion Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(conversionCategories).map(([category, data]) => (
                <div key={category} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.units.map((unit) => (
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