import { Button } from '@/components/ui/button';
import { Gift, Sparkles, Trophy } from 'lucide-react';

interface WinPrizesSectionProps {
  onOpenWheel: () => void;
  hasSpun: boolean;
}

export const WinPrizesSection = ({ onOpenWheel, hasSpun }: WinPrizesSectionProps) => {
  return (
    <section className="py-16 gradient-baby-soft relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="h-16 w-16 text-primary animate-gentle-float" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Trophy className="h-20 w-20 text-secondary animate-gentle-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-baby-soft mb-6">
          <Gift className="h-5 w-5 text-primary fill-primary animate-gentle-float" />
          <span className="text-sm font-medium text-foreground">Limited Time Offer</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Spin & Win Amazing{' '}
          <span className="text-gradient-baby">Prizes!</span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Try your luck and win exclusive discounts, free shipping, gift cards and more! 
          Every spin is a winner! 🎉
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium">Up to 20% OFF</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span className="text-sm font-medium">Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-sm font-medium">Gift Cards</span>
          </div>
        </div>

        <Button
          onClick={onOpenWheel}
          disabled={hasSpun}
          size="lg"
          className="text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
        >
          <Gift className="mr-3 h-6 w-6" />
          {hasSpun ? 'Prize Already Claimed!' : 'Spin the Wheel Now!'}
        </Button>

        {hasSpun && (
          <p className="mt-4 text-sm text-muted-foreground">
            You've already claimed your prize! Check your cart for the discount.
          </p>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-baby-soft">
            <div className="text-3xl mb-2">🎁</div>
            <p className="text-sm font-semibold text-foreground">Instant Prizes</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-baby-soft">
            <div className="text-3xl mb-2">✨</div>
            <p className="text-sm font-semibold text-foreground">Everyone Wins</p>
          </div>
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-baby-soft">
            <div className="text-3xl mb-2">🎉</div>
            <p className="text-sm font-semibold text-foreground">One Time Only</p>
          </div>
        </div>
      </div>
    </section>
  );
};