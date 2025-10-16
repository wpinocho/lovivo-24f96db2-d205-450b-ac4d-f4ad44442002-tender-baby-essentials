import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Baby, Heart, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Category {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  image: string
  collectionId: string
  color: string
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Nursing Essentials',
    description: 'Comfort & support for your breastfeeding journey',
    icon: <Heart className="h-8 w-8" />,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=400&fit=crop',
    collectionId: 'nursing-essentials',
    color: 'from-baby-pink to-baby-peach'
  },
  {
    id: '2',
    name: 'Diaper & Changing',
    description: 'Everything for easy diaper changes',
    icon: <Baby className="h-8 w-8" />,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=400&fit=crop',
    collectionId: 'diaper-changing',
    color: 'from-baby-blue to-baby-mint'
  },
  {
    id: '3',
    name: 'Mom Care & Recovery',
    description: 'Postpartum essentials for your wellbeing',
    icon: <Package className="h-8 w-8" />,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
    collectionId: 'mom-care-recovery',
    color: 'from-baby-lavender to-baby-pink'
  }
]

export const CategoryCards = () => {
  const navigate = useNavigate()

  const handleCategoryClick = (collectionId: string) => {
    // In a real implementation, this would filter products by collection
    navigate('/')
    setTimeout(() => {
      const element = document.getElementById('essentials-section')
      element?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need for baby and mom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="card-baby overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => handleCategoryClick(category.collectionId)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-40`} />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 text-primary">
                  {category.icon}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full rounded-full border-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}