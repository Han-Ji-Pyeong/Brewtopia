import { MenuCategories } from "@/components/menu-categories"
import { PageHeader } from "@/components/page-header"
import { CartButton } from "@/components/cart-button"

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-amber-50 pb-8">
      <PageHeader />
      <div className="container px-4 py-6">
        <MenuCategories />
      </div>
      <CartButton />
    </main>
  )
}
