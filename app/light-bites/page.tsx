"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { CartButton } from "@/components/cart-button"
import { useToast } from "@/hooks/use-toast"

const lightBitesItems = [
  {
    id: "light-1",
    name: "French Fries",
    description: "Crispy golden fries with dipping sauce",
    price: "$4.95",
    category: "light-bites",
    image: "/images/frenchfries.jpg",
  },
  {
    id: "light-2",
    name: "Avocado Toast",
    description: "Sourdough with avocado, salt, and pepper",
    price: "$8.95",
    category: "light-bites",
    image: "/images/avocadotoast.jpg",
  },
  {
    id: "light-3",
    name: "Hummus & Pita",
    description: "Creamy hummus with warm pita bread",
    price: "$6.95",
    category: "light-bites",
    image: "/images/hummuspita.jpg",
  },
  {
    id: "light-4",
    name: "Cheese Plate",
    description: "Selection of artisanal cheeses with crackers",
    price: "$12.95",
    category: "light-bites",
    image: "/images/cheeseplate.jpg",
  },
  {
    id: "light-5",
    name: "Bruschetta",
    description: "Toasted bread topped with tomatoes and basil",
    price: "$7.50",
    category: "light-bites",
    image: "/images/bruschetta.jpg",
  },
  {
    id: "light-6",
    name: "Soup of the Day",
    description: "Fresh homemade soup with bread",
    price: "$5.95",
    category: "light-bites",
    image: "/images/breadsoup.jpg",
  },
]

export default function LightBitesPage() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleAddToCart = (item: (typeof lightBitesItems)[0]) => {
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
            <Utensils className="h-6 w-6" />
            <h1 className="text-xl font-bold">Brewtopia</h1>
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 h-40 w-40 overflow-hidden rounded-full border-4 border-amber-200 bg-white p-2">
            <img
              src="/images/light-bites-category.jpg"
              alt="Light Bites"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=200&width=200"
              }}
            />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-stone-800">Light Bites</h1>
          <p className="text-center text-stone-600">Enjoy delicious snacks and light meals.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lightBitesItems.map((item) => (
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
