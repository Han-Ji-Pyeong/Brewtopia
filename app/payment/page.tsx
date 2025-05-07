"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Banknote, QrCode, Bell, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

const paymentMethods = [
  {
    id: "qris",
    name: "QRIS by BCA",
    description: "Scan QR code to pay with your mobile banking app",
    icon: <QrCode className="h-5 w-5" />,
  },
  {
    id: "cash",
    name: "Cash at Cashier",
    description: "Pay with cash at the cashier counter",
    icon: <Banknote className="h-5 w-5" />,
  },
  {
    id: "card",
    name: "Debit/Credit Card",
    description: "Pay with card at the cashier counter",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "table",
    name: "Pay at Table",
    description: "Call waitress to process payment at your table",
    icon: <Bell className="h-5 w-5" />,
  },
]

export default function PaymentPage() {
  const { totalPrice, items } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPayment, setSelectedPayment] = useState("qris")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePaymentSubmit = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to payment.",
        variant: "destructive",
      })
      router.push("/menu")
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      
      // Store payment method in session storage for order confirmation page
      sessionStorage.setItem("paymentMethod", selectedPayment)
      
      // Redirect to order confirmation
      router.push("/order-confirmation")
    }, 1500)
  }

  const subtotal = totalPrice
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
      <header className="bg-amber-900 p-4 text-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-amber-800 dark:hover:bg-gray-700">
              <Link href="/cart" className="flex items-center gap-1">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Cart
              </Link>
            </Button>
          </div>
          <h1 className="text-xl font-bold">Payment Method</h1>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <h2 className="mb-4 text-xl font-bold text-stone-800 dark:text-white">Order Summary</h2>
            <div className="mb-4 space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span>${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <h2 className="mb-4 text-xl font-bold text-stone-800 dark:text-white">Select Payment Method</h2>
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label
                      htmlFor={method.id}
                      className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          {selectedPayment === "qris" && (
            <div className="mb-8 rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800 dark:text-gray-100">
              <h3 className="mb-3 text-lg font-bold">Scan QR Code to Pay</h3>
              <div className="mx-auto mb-4 h-48 w-48 bg-white p-2 dark:bg-gray-200">
                <div className="flex h-full w-full items-center justify-center border border-gray-300">
                  <QrCode className="h-32 w-32 text-gray-800" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Open your BCA mobile banking app and scan this QR code
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Button
              onClick={handlePaymentSubmit}
              disabled={isProcessing}
              className="bg-amber-700 py-6 text-lg hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span> Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" /> Confirm Payment
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-amber-700 py-6 text-lg text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700"
            >
              <Link href="/cart">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
