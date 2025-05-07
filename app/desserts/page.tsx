"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Cake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { CartButton } from "@/components/cart-button"
import { useToast } from "@/hooks/use-toast"
import { CategoryHeader } from "@/components/category-header"

const dessertItems = [
  {
    id: "dessert-1",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: "$7.95",
    category: "desserts",
    image: "/images/tiramisucake.jpg",
  },
  {
    id: "dessert-2",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache frosting",
    price: "$6.95",
    category: "desserts",
    image: "/images/chocolatecake.jpg",
  },
  {
    id: "dessert-3",
    name: "Cheesecake",
    description: "Creamy New York style cheesecake with berry compote",
    price: "$7.50",
    category: "desserts",
    image: "/images/cheesecake.jpg",
  },
  {
    id: "dessert-4",
    name: "Apple Pie",
    description: "Warm apple pie with vanilla ice cream",
    price: "$6.95",
    category: "desserts",
    image: "/images/applepie.jpg",
  },
  {
    id: "dessert-5",
    name: "Crème Brûlée",
    description: "Vanilla custard with caramelized sugar top",
    price: "$8.50",
    category: "desserts",
    image: "/images/cremebrulee.jpg",
  },
  {
    id: "dessert-6",
    name: "Ice Cream Selection",
    description: "Choice of three scoops with toppings",
    price: "$5.95",
    category: "desserts",
    image: "/images/icecream.jpg",
  },
]

export default function DessertsPage() {
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
            <Cake className="h-6 w-6" />
            <h1 className="text-xl font-bold">Brewtopia</h1>
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <CategoryHeader
          title="Desserts"
          description="Sweet treats to finish off your meal."
          imageSrc="/images/dessert-category.jpg"
          icon={<Cake className="h-6 w-6" />}
        />

        {/* Rest of the component remains the same */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dessertItems.map((item) => (
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
