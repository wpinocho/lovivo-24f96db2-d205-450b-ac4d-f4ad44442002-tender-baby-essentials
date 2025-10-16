import { ProductCard } from '@/components/ProductCard'
import { FloatingCart } from '@/components/FloatingCart'
import { NewsletterSection } from '@/components/NewsletterSection'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { HeroSection } from '@/components/HeroSection'
import { NewbornChecklist } from '@/components/NewbornChecklist'
import { CategoryCards } from '@/components/CategoryCards'
import { HospitalPacks } from '@/components/HospitalPacks'
import { SpinWheel } from '@/components/SpinWheel'
import { useSpinWheelPopup } from '@/hooks/useSpinWheelPopup'
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex'

interface IndexUIProps {
  logic: UseIndexLogicReturn
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    loading,
    filteredProducts,
  } = logic

  const { showPopup, closePopup } = useSpinWheelPopup();

  return (
    <EcommerceTemplate showCart={true}>
      {/* Spin Wheel Popup */}
      <SpinWheel open={showPopup} onClose={closePopup} />

      {/* Hero Section with Hospital Basket */}
      <HeroSection />

      {/* Newborn Checklist */}
      <NewbornChecklist />

      {/* Category Cards - Nursing, Diapers, Mom Care */}
      <CategoryCards />

      {/* Hospital Packs Section */}
      <HospitalPacks />

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Essentials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully selected products for your baby and postpartum journey
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card-baby h-80 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  )
}