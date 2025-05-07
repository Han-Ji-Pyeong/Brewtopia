"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleProceedToPayment = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to payment.",
        variant: "destructive",
      })
      return
    }

    router.push("/payment")
  }

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
      <header className="bg-amber-900 p-4 text-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-amber-800 dark:hover:bg-gray-700">
              <Link href="/menu" className="flex items-center gap-1">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Menu
              </Link>
            </Button>
          </div>
          <h1 className="text-xl font-bold">Your Cart</h1>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-amber-300" />
            <h2 className="mb-2 text-2xl font-bold text-stone-800 dark:text-white">Your cart is empty</h2>
            <p className="mb-6 text-stone-600 dark:text-gray-300">Add some delicious items from our menu!</p>
            <Link href="/menu">
              <Button className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h2 className="mb-4 text-xl font-bold text-stone-800 dark:text-white">Order Summary</h2>
              <div className="divide-y dark:divide-gray-700">
                {items.map((item) => (
                  <div key={item.id} className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        {item.image && !imageErrors[item.id] && (
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              onError={() => handleImageError(item.id)}
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-stone-800 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-stone-600 dark:text-gray-300">{item.description}</p>
                          <p className="mt-1 text-amber-700 dark:text-amber-400">{item.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 dark:border-gray-600 dark:text-gray-300"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 dark:border-gray-600 dark:text-gray-300"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-100">
              <div className="flex justify-between border-b pb-4 dark:border-gray-700">
                <span className="font-medium">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b py-4 dark:border-gray-700">
                <span className="font-medium">Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="bg-amber-700 py-6 text-lg hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
              <Button
                variant="outline"
                className="border-amber-700 py-6 text-lg text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
