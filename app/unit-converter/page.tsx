"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, ArrowUpDown } from "lucide-react"

interface ConversionUnit {
  name: string
  symbol: string
  factor: number // Factor to convert to base unit
}

interface ConversionCategory {
  name: string
  baseUnit: string
  units: ConversionUnit[]
}

const conversionCategories: ConversionCategory[] = [
  {
    name: "Length",
    baseUnit: "meter",
    units: [
      { name: "Millimeter", symbol: "mm", factor: 0.001 },
      { name: "Centimeter", symbol: "cm", factor: 0.01 },
      { name: "Meter", symbol: "m", factor: 1 },
      { name: "Kilometer", symbol: "km", factor: 1000 },
      { name: "Inch", symbol: "in", factor: 0.0254 },
      { name: "Foot", symbol: "ft", factor: 0.3048 },
      { name: "Yard", symbol: "yd", factor: 0.9144 },
      { name: "Mile", symbol: "mi", factor: 1609.344 },
    ],
  },
  {
    name: "Weight",
    baseUnit: "kilogram",
    units: [
      { name: "Milligram", symbol: "mg", factor: 0.000001 },
      { name: "Gram", symbol: "g", factor: 0.001 },
      { name: "Kilogram", symbol: "kg", factor: 1 },
      { name: "Pound", symbol: "lb", factor: 0.453592 },
      { name: "Ounce", symbol: "oz", factor: 0.0283495 },
      { name: "Stone", symbol: "st", factor: 6.35029 },
      { name: "Ton", symbol: "t", factor: 1000 },
    ],
  },
  {
    name: "Temperature",
    baseUnit: "celsius",
    units: [
      { name: "Celsius", symbol: "°C", factor: 1 },
      { name: "Fahrenheit", symbol: "°F", factor: 1 },
      { name: "Kelvin", symbol: "K", factor: 1 },
    ],
  },
  {
    name: "Volume",
    baseUnit: "liter",
    units: [
      { name: "Milliliter", symbol: "ml", factor: 0.001 },
      { name: "Liter", symbol: "l", factor: 1 },
      { name: "Gallon (US)", symbol: "gal", factor: 3.78541 },
      { name: "Gallon (UK)", symbol: "gal (UK)", factor: 4.54609 },
      { name: "Quart", symbol: "qt", factor: 0.946353 },
      { name: "Pint", symbol: "pt", factor: 0.473176 },
      { name: "Cup", symbol: "cup", factor: 0.236588 },
      { name: "Fluid Ounce", symbol: "fl oz", factor: 0.0295735 },
    ],
  },
  {
    name: "Area",
    baseUnit: "square meter",
    units: [
      { name: "Square Millimeter", symbol: "mm²", factor: 0.000001 },
      { name: "Square Centimeter", symbol: "cm²", factor: 0.0001 },
      { name: "Square Meter", symbol: "m²", factor: 1 },
      { name: "Square Kilometer", symbol: "km²", factor: 1000000 },
      { name: "Square Inch", symbol: "in²", factor: 0.00064516 },
      { name: "Square Foot", symbol: "ft²", factor: 0.092903 },
      { name: "Square Yard", symbol: "yd²", factor: 0.836127 },
      { name: "Acre", symbol: "ac", factor: 4046.86 },
      { name: "Hectare", symbol: "ha", factor: 10000 },
    ],
  },
]

export default function UnitConverterPage() {
  const [activeCategory, setActiveCategory] = useState("Length")
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")

  const currentCategory = conversionCategories.find((cat) => cat.name === activeCategory)

  // Initialize default units when category changes
  useEffect(() => {
    if (currentCategory && currentCategory.units.length >= 2) {
      setFromUnit(currentCategory.units[0].symbol)
      setToUnit(currentCategory.units[1].symbol)
    }
  }, [activeCategory, currentCategory])

  const convertTemperature = (value: number, from: string, to: string): number => {
    // Convert to Celsius first
    let celsius = value
    if (from === "°F") {
      celsius = ((value - 32) * 5) / 9
    } else if (from === "K") {
      celsius = value - 273.15
    }

    // Convert from Celsius to target
    if (to === "°F") {
      return (celsius * 9) / 5 + 32
    } else if (to === "K") {
      return celsius + 273.15
    }
    return celsius
  }

  const performConversion = (value: string, from: string, to: string): string => {
    if (!value || !from || !to || !currentCategory) return ""

    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return ""

    if (activeCategory === "Temperature") {
      const result = convertTemperature(numValue, from, to)
      return result.toFixed(6).replace(/\.?0+$/, "")
    }

    const fromUnitData = currentCategory.units.find((unit) => unit.symbol === from)
    const toUnitData = currentCategory.units.find((unit) => unit.symbol === to)

    if (!fromUnitData || !toUnitData) return ""

    // Convert to base unit, then to target unit
    const baseValue = numValue * fromUnitData.factor
    const result = baseValue / toUnitData.factor

    return result.toFixed(6).replace(/\.?0+$/, "")
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    const converted = performConversion(value, fromUnit, toUnit)
    setToValue(converted)
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    const converted = performConversion(value, toUnit, fromUnit)
    setFromValue(converted)
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    const tempValue = fromValue

    setFromUnit(toUnit)
    setToUnit(tempUnit)
    setFromValue(toValue)
    setToValue(tempValue)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance mb-2">Unit Converter</h1>
            <p className="text-muted-foreground text-pretty">
              Convert between different units of measurement with precision
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Unit Conversion</span>
              </CardTitle>
              <CardDescription>Select a category and convert between different units</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  {conversionCategories.map((category) => (
                    <TabsTrigger key={category.name} value={category.name}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {conversionCategories.map((category) => (
                  <TabsContent key={category.name} value={category.name} className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* From Unit */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>From</Label>
                          <Select value={fromUnit} onValueChange={setFromUnit}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {category.units.map((unit) => (
                                <SelectItem key={unit.symbol} value={unit.symbol}>
                                  {unit.name} ({unit.symbol})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Value</Label>
                          <Input
                            type="number"
                            placeholder="Enter value"
                            value={fromValue}
                            onChange={(e) => handleFromValueChange(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Swap Button */}
                      <div className="flex items-center justify-center lg:flex-col">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={swapUnits}
                          className="flex items-center space-x-2 bg-transparent"
                        >
                          <ArrowUpDown className="w-4 h-4" />
                          <span className="hidden lg:inline">Swap</span>
                        </Button>
                      </div>

                      {/* To Unit */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>To</Label>
                          <Select value={toUnit} onValueChange={setToUnit}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {category.units.map((unit) => (
                                <SelectItem key={unit.symbol} value={unit.symbol}>
                                  {unit.name} ({unit.symbol})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Result</Label>
                          <Input
                            type="number"
                            placeholder="Result"
                            value={toValue}
                            onChange={(e) => handleToValueChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Conversion Formula */}
                    {fromValue && toValue && (
                      <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">Conversion</h4>
                        <p className="text-sm text-muted-foreground">
                          {fromValue} {fromUnit} = {toValue} {toUnit}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Supported Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Precise Calculations</h4>
                  <p className="text-muted-foreground">
                    All conversions use precise mathematical formulas for accurate results
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Multiple Categories</h4>
                  <p className="text-muted-foreground">
                    Convert length, weight, temperature, volume, and area measurements
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Real-time Conversion</h4>
                  <p className="text-muted-foreground">
                    See results instantly as you type, with bidirectional conversion
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
