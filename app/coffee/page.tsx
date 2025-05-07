"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { CartButton } from "@/components/cart-button"
import { useToast } from "@/hooks/use-toast"

const coffeeItems = [
  {
    id: "coffee-1",
    name: "Espresso",
    description: "Rich and intense shot of coffee",
    price: "$3.50",
    category: "coffee",
    image: "/images/espresso.jpg",
  },
  {
    id: "coffee-2",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: "$4.50",
    category: "coffee",
    image: "/images/cappuccino.jpg",
  },
  {
    id: "coffee-3",
    name: "Latte",
    description: "Espresso with lots of steamed milk and light foam",
    price: "$4.75",
    category: "coffee",
    image: "/images/latte.jpg",
  },
  {
    id: "coffee-4",
    name: "Americano",
    description: "Espresso diluted with hot water",
    price: "$3.75",
    category: "coffee",
    image: "/images/americano.jpg",
  },
  {
    id: "coffee-5",
    name: "Mocha",
    description: "Espresso with chocolate and steamed milk",
    price: "$5.25",
    category: "coffee",
    image: "/images/coffee1.jpg",
  },
  {
    id: "coffee-6",
    name: "Cold Brew",
    description: "Slow-steeped coffee served over ice",
    price: "$4.95",
    category: "coffee",
    image: "/images/coldbrew.jpg", 
  },
]

export default function CoffeePage() {
  // Component state and handlers remain the same
  const { addItem } = useCart()
  const { toast } = useToast()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleAddToCart = (item: any) => {
    addItem(item)
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <main className="min-h-screen bg-amber-50 pb-8">
      <header className="bg-amber-900 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-amber-800">
              <Link href="/menu" className="flex items-center gap-1">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Menu
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6" />
            <h1 className="text-xl font-bold">Brewtopia</h1>
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex flex-col items-center">
          {/* Fixed category image container */}
          <div className="relative mb-4 flex h-40 w-40 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-200"></div>
            <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white">
              <img
                src="/images/coffee-category.jpg"
                alt="Coffee"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                }}
              />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-stone-800">Coffee</h1>
          <p className="text-center text-stone-600">Freshly brewed coffee and espresso-based drinks.</p>
        </div>

        {/* Rest of the component remains the same */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coffeeItems.map((item) => (
            <Card key={item.id} className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={imageErrors[item.id] ? "/placeholder.svg?height=300&width=300" : item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                  onError={() => handleImageError(item.id)}
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-sm font-medium text-amber-800">
                    {item.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pb-2">
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-amber-700 hover:bg-amber-800" onClick={() => handleAddToCart(item)}>
                  Add to Order
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <CartButton />
    </main>
  )
}
