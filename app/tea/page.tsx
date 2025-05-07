"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { CartButton } from "@/components/cart-button"
import { useToast } from "@/hooks/use-toast"

const teaItems = [
  {
    id: "tea-1",
    name: "Earl Grey",
    description: "Black tea with bergamot oil",
    price: "$3.25",
    category: "tea",
    image: "/images/earlgrey.jpg",
  },
  {
    id: "tea-2",
    name: "Green Tea",
    description: "Delicate tea with antioxidants",
    price: "$3.25",
    category: "tea",
    image: "/images/greentea.jpg",
  },
  {
    id: "tea-3",
    name: "Chai Latte",
    description: "Spiced tea with steamed milk",
    price: "$4.50",
    category: "tea",
    image: "/images/chailatte.jpg",
  },
  {
    id: "tea-4",
    name: "Butterfly Pea Flower Tea",
    description: " caffeine-free herbal tea, or tisane, beverage made from a infusion of the flower petals or whole flower of the Clitoria ternatea plant",
    price: "$3.50",
    category: "tea",
    image: "/images/butterflypeaflower.jpg",
  },
  {
    id: "tea-5",
    name: "Matcha Latte",
    description: "Stone-ground green tea with steamed milk",
    price: "$4.95",
    category: "tea",
    image: "/images/matcha-latte.jpg",
  },
  {
    id: "tea-6",
    name: "Iced Tea",
    description: "Refreshing cold tea with optional lemon",
    price: "$3.50",
    category: "tea",
    image: "/images/icedtea.jpg",
  },
]

export default function TeaPage() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleAddToCart = (item: (typeof teaItems)[0]) => {
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
            <Leaf className="h-6 w-6" />
            <h1 className="text-xl font-bold">Brewtopia</h1>
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-amber-200 bg-white p-2">
            <img
              src="/images/tea-category.jpg"
              alt="Tea"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=200&width=200"
              }}
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-stone-800">Tea</h1>
          <p className="text-center text-stone-600">Relax with a variety of flavored teas.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teaItems.map((item) => (
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
