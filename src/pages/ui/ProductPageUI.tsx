import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import { Link } from "react-router-dom"
import { ProductReviews } from "@/components/ProductReviews"
import { useState, useEffect } from "react"

import type { Product, ProductVariant } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductPageUI
 * 
 * Este componente solo maneja la presentación de la página de producto.
 * Recibe toda la lógica como props del HeadlessProduct.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Header y navegación
 * - Animaciones y efectos
 * - Agregar features visuales (zoom de imagen, etc.)
 */

interface ProductPageUIProps {
  logic: {
    // Product data
    product: any
    loading: boolean
    notFound: boolean
    
    // Selection state
    selected: Record<string, string>
    quantity: number
    
    // Calculated values
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    
    // Handlers
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleNavigateBack: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    
    // Any other properties that might come from HeadlessProduct
    [key: string]: any
  }
}

// Mock reviews data for Nursing Bra Set
const mockReviews = [
  {
    id: "1",
    author: "Sarah Martinez",
    rating: 5,
    date: "2 weeks ago",
    title: "Best nursing bras I've ever owned!",
    comment: "These are incredibly comfortable and supportive. The easy-clip access makes nursing so much easier, especially during those late-night feedings. The seamless design means no irritation. Worth every penny!",
    verified: true
  },
  {
    id: "2",
    author: "Emily Chen",
    rating: 5,
    date: "1 month ago",
    title: "Perfect for postpartum recovery",
    comment: "I bought these before my baby arrived and I'm so glad I did. They're soft, stretchy, and provide great support without being too tight. The 3-pack is perfect so I always have a clean one ready.",
    verified: true
  },
  {
    id: "3",
    author: "Jessica Thompson",
    rating: 4,
    date: "3 weeks ago",
    title: "Comfortable and practical",
    comment: "Really love these bras! They're comfortable to wear all day and night. The only reason I'm giving 4 stars instead of 5 is I wish they came in more color options. But the quality is excellent!",
    verified: true
  },
  {
    id: "4",
    author: "Maria Rodriguez",
    rating: 5,
    date: "1 week ago",
    title: "Lifesaver for new moms",
    comment: "As a first-time mom, these bras have been a lifesaver. Easy to use, comfortable, and they wash well. I've already recommended them to all my pregnant friends. The support is amazing!",
    verified: true
  }
]

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  const [showStickyButton, setShowStickyButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button when scrolled down 300px
      setShowStickyButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (logic.notFound) {
    return (
      <EcommerceTemplate>
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Product not found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been deleted.</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!logic.product) return null

  // Check if this is the Nursing Bra Set product to show reviews
  const showReviews = logic.product.slug === "nursing-bra-set-3-pack"

  return (
    <EcommerceTemplate>
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={logic.currentImage || "/placeholder.svg"}
              alt={logic.product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{logic.product.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
            </div>

            {logic.product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <div 
                  className="text-muted-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: logic.product.description }}
                />
              </div>
            )}

            {/* Product Options */}
            {logic.product.options && logic.product.options.length > 0 && (
              <div className="space-y-4">
                {logic.product.options.map((option) => (
                  <div key={option.name}>
                    <Label className="text-base font-medium">{option.name}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {option.values.map((value) => {
                        const isSelected = logic.selected[option.name] === value
                        const isAvailable = logic.isOptionValueAvailable(option.name, value)
                        
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => logic.handleOptionSelect(option.name, value)}
                            className={!isAvailable ? "opacity-50 cursor-not-allowed" : ""}
                          >
                            {value}
                            {!isAvailable && (
                              <span className="ml-1 text-xs">(Out of stock)</span>
                            )}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="quantity" className="text-base font-medium">
                  Quantity
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => logic.handleQuantityChange(Math.max(1, logic.quantity - 1))}
                    disabled={logic.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={logic.quantity}
                    onChange={(e) => logic.handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={logic.handleAddToCart}
                  disabled={!logic.inStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {logic.inStock ? 'Add to cart' : 'Out of stock'}
                </Button>
                
                {!logic.inStock && (
                  <Badge variant="secondary">Out of stock</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            {logic.matchingVariant && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Product information</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>SKU:</span>
                      <span>{logic.matchingVariant.sku || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available stock:</span>
                      <span>{logic.matchingVariant.inventory_quantity || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            <Button
              variant="outline"
              onClick={logic.handleNavigateBack}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue shopping
            </Button>
          </div>
        </div>

        {/* Customer Reviews Section */}
        {showReviews && (
          <div className="max-w-4xl mx-auto">
            <ProductReviews reviews={mockReviews} />
          </div>
        )}
      </div>

      {/* Sticky Add to Cart Button */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-white via-baby-pink to-white border-t border-baby-pink/20 shadow-lg transition-transform duration-300 z-50 ${
          showStickyButton ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <img
                src={logic.currentImage || "/placeholder.svg"}
                alt={logic.product.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-sm">{logic.product.title}</h3>
                <p className="text-lg font-bold text-primary">
                  {logic.formatMoney(logic.currentPrice)}
                </p>
              </div>
            </div>
            
            <Button
              onClick={logic.handleAddToCart}
              disabled={!logic.inStock}
              size="lg"
              className="bg-primary hover:bg-primary/90 min-w-[200px]"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {logic.inStock ? 'Add to cart' : 'Out of stock'}
            </Button>
          </div>
        </div>
      </div>
    </EcommerceTemplate>
  )
}