import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Coffee, Menu, ShoppingBag, Utensils, UtensilsCrossed, Cake } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-amber-50 dark:bg-gray-900">
      <header className="bg-amber-900 p-4 text-white dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6" />
            <h1 className="text-xl font-bold">Brewtopia</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:bg-amber-800 dark:hover:bg-gray-700">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex-grow px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-amber-900 dark:text-amber-400">Welcome to Brewtopia</h1>
          <p className="mx-auto max-w-2xl text-lg text-stone-700 dark:text-gray-300">
            Experience the perfect blend of comfort and flavor in our cozy café. From handcrafted coffees to delicious
            meals, we have something for everyone.
          </p>
        </div>

        <div className="relative mb-12 h-48 w-full overflow-hidden rounded-lg md:h-64 lg:h-96">
          <Image
            src="/images/homepage.jpg?height=400&width=800"
            alt="Cafe atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4 text-center text-white">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">Crafted with Passion</h2>
            <p className="mb-4 max-w-md text-lg">Discover our handcrafted menu of drinks and delicious food</p>
            <Link href="/menu">
              <Button className="bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700">
                <Menu className="mr-2 h-4 w-4" />
                View Our Menu
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <div className="mb-3 flex justify-center">
              <Coffee className="h-8 w-8 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-amber-900 dark:text-amber-400">Specialty Coffee</h3>
            <p className="mb-4 text-center text-stone-700 dark:text-gray-300">
              Our baristas craft the perfect cup using ethically sourced beans from around the world.
            </p>
            <Link href="/coffee">
              <Button
                variant="outline"
                className="w-full border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700"
              >
                Explore Coffee Menu
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <div className="mb-3 flex justify-center">
              <Utensils className="h-8 w-8 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-amber-900 dark:text-amber-400">Light Bites</h3>
            <p className="mb-4 text-center text-stone-700 dark:text-gray-300">
              Enjoy delicious snacks and light meals, perfect for a quick bite or sharing with friends.
            </p>
            <Link href="/light-bites">
              <Button
                variant="outline"
                className="w-full border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700"
              >
                See Light Bites
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <div className="mb-3 flex justify-center">
              <UtensilsCrossed className="h-8 w-8 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-amber-900 dark:text-amber-400">Main Course</h3>
            <p className="mb-4 text-center text-stone-700 dark:text-gray-300">
              Hearty meals to satisfy your appetite, from pasta dishes to fresh salads and more.
            </p>
            <Link href="/main-course">
              <Button
                variant="outline"
                className="w-full border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700"
              >
                View Main Courses
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-gray-100">
            <div className="mb-3 flex justify-center">
              <Cake className="h-8 w-8 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-amber-900 dark:text-amber-400">Desserts</h3>
            <p className="mb-4 text-center text-stone-700 dark:text-gray-300">
              Indulge in our selection of pastries and desserts, baked fresh daily to satisfy your sweet tooth.
            </p>
            <Link href="/desserts">
              <Button
                variant="outline"
                className="w-full border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700"
              >
                View Desserts
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-amber-100 p-6 text-center dark:bg-amber-900/20">
          <h3 className="mb-2 text-xl font-bold text-amber-900 dark:text-amber-400">Hours & Location</h3>
          <p className="mb-1 text-stone-700 dark:text-gray-300">Open Daily: 7AM - 8PM</p>
          <p className="text-stone-700 dark:text-gray-300">123 Coffee Street, Brewville</p>
        </div>
      </div>

      <footer className="mt-auto bg-amber-900 p-4 text-center text-white dark:bg-gray-800">
        <p>© 2024 Brewtopia Cafe. All rights reserved.</p>
      </footer>
    </main>
  )
}
