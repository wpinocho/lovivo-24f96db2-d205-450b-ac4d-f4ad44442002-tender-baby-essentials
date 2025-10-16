import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Review {
  id: string
  author: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
}

interface ProductReviewsProps {
  reviews: Review[]
}

export const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gradient-to-br from-baby-pink to-baby-lavender/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 mt-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {totalReviews} reviews
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
            <p className="text-sm text-muted-foreground">
              Real experiences from verified buyers
            </p>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-baby-pink/20 shadow-baby-soft">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 bg-gradient-to-br from-baby-pink to-baby-blue">
                  <AvatarFallback className="bg-transparent text-white font-semibold">
                    {review.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs bg-baby-mint/50">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-0.5">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}