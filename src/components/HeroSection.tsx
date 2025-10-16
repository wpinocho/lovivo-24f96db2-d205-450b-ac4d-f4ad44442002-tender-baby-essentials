import { Button } from '@/components/ui/button'
import { Heart, ShoppingBasket, CheckCircle2 } from 'lucide-react'

export const HeroSection = () => {
  const scrollToEssentials = () => {
    const element = document.getElementById('essentials-section')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden gradient-baby-soft py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-baby-soft">
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-foreground">Trusted by 10,000+ New Parents</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Everything You Need for{' '}
              <span className="text-gradient-baby">Baby's Arrival</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Thoughtfully curated hospital baskets and newborn essentials. 
              Stress-free preparation for your special day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToEssentials}
              >
                <ShoppingBasket className="mr-2 h-5 w-5" />
                See Essentials
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 rounded-full border-2"
                onClick={() => {
                  const element = document.getElementById('checklist-section')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                View Checklist
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Hospital Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Organic Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Fast Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-gentle-float">
              <img
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=800&fit=crop"
                alt="Hospital Essentials Basket"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 rounded-full p-3">
                  <ShoppingBasket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Complete Hospital Basket</p>
                  <p className="text-sm text-muted-foreground">Everything packed & ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}