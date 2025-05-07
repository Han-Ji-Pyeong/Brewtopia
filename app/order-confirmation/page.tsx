"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"

export default function OrderConfirmationPage() {
  const { clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Clear the cart when the confirmation page loads
    clearCart()

    // Get the payment method from session storage
    const storedPaymentMethod = sessionStorage.getItem("paymentMethod") || "qris"
    setPaymentMethod(storedPaymentMethod)

    // Generate a random order number
    setOrderNumber(`BT-${Math.floor(10000 + Math.random() * 90000)}`)
  }, [clearCart])

  const getPaymentInstructions = () => {
    switch (paymentMethod) {
      case "qris":
        return "Your payment via QRIS has been confirmed."
      case "cash":
        return "Please proceed to the cashier counter to complete your payment."
      case "card":
        return "Please proceed to the cashier counter to pay with your debit/credit card."
      case "table":
        return "A waitress will come to your table shortly to process your payment."
      default:
        return "Your order has been confirmed."
    }
  }

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
      <header className="bg-amber-900 p-4 text-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6" />
            <h1 className="text-xl font-bold">Brewtopia</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-col items-center px-4 py-12 text-center">
        <CheckCircle className="mb-6 h-24 w-24 text-green-500" />
        <h1 className="mb-4 text-3xl font-bold text-stone-800 dark:text-white">Order Confirmed!</h1>
        <p className="mb-8 max-w-md text-lg text-stone-600 dark:text-gray-300">
          Thank you for your order. We're preparing your items and they'll be ready soon.
        </p>
        <div className="mb-8 w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-100">
          <h2 className="mb-4 text-xl font-bold text-stone-800 dark:text-white">Order Details</h2>
          <div className="mb-4 flex justify-between border-b pb-2 dark:border-gray-700">
            <span className="font-medium">Order Number:</span>
            <span>{orderNumber}</span>
          </div>
          <div className="mb-4 flex justify-between border-b pb-2 dark:border-gray-700">
            <span className="font-medium">Payment Method:</span>
            <span>
              {paymentMethod === "qris" && "QRIS by BCA"}
              {paymentMethod === "cash" && "Cash at Cashier"}
              {paymentMethod === "card" && "Debit/Credit Card"}
              {paymentMethod === "table" && "Pay at Table"}
            </span>
          </div>
          <div className="mb-4 flex justify-between border-b pb-2 dark:border-gray-700">
            <span className="font-medium">Estimated Ready Time:</span>
            <span>15-20 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Location:</span>
            <span>Counter #2</span>
          </div>
        </div>

        <div className="mb-8 w-full max-w-md rounded-lg bg-amber-100 p-4 text-center dark:bg-amber-900/20 dark:text-amber-100">
          <p>{getPaymentInstructions()}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/">
            <Button className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700">
              Return to Home
            </Button>
          </Link>
          <Link href="/menu">
            <Button
              variant="outline"
              className="border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700"
            >
              Order More
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
