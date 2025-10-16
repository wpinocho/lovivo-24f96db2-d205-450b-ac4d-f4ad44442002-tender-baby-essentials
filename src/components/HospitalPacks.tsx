import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Package, Star } from 'lucide-react'

interface HospitalPack {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  features: string[]
  popular?: boolean
}

const hospitalPacks: HospitalPack[] = [
  {
    id: '1',
    name: 'Essential Hospital Pack',
    price: 89.99,
    originalPrice: 120.00,
    description: 'Everything you need for a comfortable hospital stay',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop',
    features: [
      'Nursing essentials kit',
      'Newborn basics bundle',
      'Mom comfort items',
      'Hospital bag checklist'
    ],
    popular: true
  },
  {
    id: '2',
    name: 'Deluxe Hospital Pack',
    price: 149.99,
    originalPrice: 200.00,
    description: 'Premium essentials with extra comfort items',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop',
    features: [
      'Everything in Essential Pack',
      'Premium nursing pillow',
      'Postpartum recovery kit',
      'Luxury comfort items',
      'Gift-ready packaging'
    ]
  },
  {
    id: '3',
    name: 'Complete Care Pack',
    price: 199.99,
    originalPrice: 280.00,
    description: 'Ultimate bundle for complete peace of mind',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=600&fit=crop',
    features: [
      'Everything in Deluxe Pack',
      'Extended diaper supply',
      'Premium swaddle set',
      'Mom self-care package',
      'Priority shipping',
      'Personal consultation'
    ]
  }
]

export const HospitalPacks = () => {
  return (
    <section id="essentials-section" className="py-16 gradient-baby-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-baby-soft mb-4">
            <Package className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Pre-Packed & Ready to Go</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hospital Packs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stress-free hospital bag preparation. Everything you need, thoughtfully curated and ready to ship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitalPacks.map((pack) => (
            <Card 
              key={pack.id} 
              className={`card-baby overflow-hidden relative ${pack.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {pack.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="relative h-56 overflow-hidden">
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {pack.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-primary">
                    ${pack.price}
                  </span>
                  {pack.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${pack.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-4">
                  {pack.description}
                </p>

                <div className="space-y-2 mb-6">
                  {pack.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full rounded-full text-lg py-6"
                  variant={pack.popular ? 'default' : 'outline'}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-baby-soft">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Not sure which pack is right for you?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse our individual products and create your own custom hospital bag
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="rounded-full text-lg px-8 py-6 border-2"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            See All Essentials
          </Button>
        </div>
      </div>
    </section>
  )
}