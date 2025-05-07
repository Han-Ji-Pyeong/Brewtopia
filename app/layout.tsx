import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Brewtopia Cafe",
  description: "A cozy cafe with delicious food and drinks",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
