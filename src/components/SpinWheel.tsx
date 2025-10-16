import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, X } from 'lucide-react';

interface SpinWheelProps {
  open: boolean;
  onClose: () => void;
}

const prizes = [
  { id: 1, text: '10% OFF', color: 'hsl(340, 82%, 92%)', textColor: 'hsl(340, 70%, 50%)' },
  { id: 2, text: 'Free Shipping', color: 'hsl(200, 82%, 92%)', textColor: 'hsl(200, 70%, 50%)' },
  { id: 3, text: '15% OFF', color: 'hsl(270, 60%, 92%)', textColor: 'hsl(270, 60%, 50%)' },
  { id: 4, text: 'Gift Card $5', color: 'hsl(25, 95%, 90%)', textColor: 'hsl(25, 90%, 50%)' },
  { id: 5, text: '20% OFF', color: 'hsl(150, 60%, 92%)', textColor: 'hsl(150, 60%, 50%)' },
  { id: 6, text: 'Try Again', color: 'hsl(40, 60%, 95%)', textColor: 'hsl(40, 60%, 50%)' },
  { id: 7, text: '5% OFF', color: 'hsl(340, 82%, 92%)', textColor: 'hsl(340, 70%, 50%)' },
  { id: 8, text: 'Free Gift', color: 'hsl(200, 82%, 92%)', textColor: 'hsl(200, 70%, 50%)' },
];

export const SpinWheel = ({ open, onClose }: SpinWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;

    console.log('SpinWheel: Starting spin');
    setSpinning(true);
    setPrize(null);

    // Random prize selection
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const targetRotation = 360 * 5 + (prizeIndex * segmentAngle) + (segmentAngle / 2);

    setRotation(targetRotation);

    setTimeout(() => {
      console.log('SpinWheel: Spin complete, prize:', prizes[prizeIndex].text);
      setSpinning(false);
      setPrize(prizes[prizeIndex].text);
    }, 4000);
  };

  const handleClose = () => {
    if (!spinning) {
      console.log('SpinWheel: Closing dialog');
      // Reset state when closing
      setPrize(null);
      setRotation(0);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-gradient-to-br from-baby-pink via-baby-blue to-baby-lavender">
        <button
          onClick={handleClose}
          disabled={spinning}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 hover:bg-white transition-colors disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-8 text-center">
          <div className="mb-4">
            <Gift className="h-12 w-12 mx-auto text-primary animate-gentle-float" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Spin to Win! 🎉
          </h2>
          <p className="text-muted-foreground mb-6">
            Try your luck and win amazing discounts!
          </p>

          {/* Wheel Container */}
          <div className="relative w-72 h-72 mx-auto mb-6">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-primary drop-shadow-lg" />
            </div>

            {/* Wheel */}
            <div
              className="relative w-full h-full rounded-full shadow-2xl overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              }}
            >
              {prizes.map((prize, index) => {
                const segmentAngle = 360 / prizes.length;
                const startAngle = index * segmentAngle;

                return (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${startAngle}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
                      backgroundColor: prize.color,
                    }}
                  >
                    <div
                      className="absolute top-8 left-1/2 -translate-x-1/2 font-bold text-sm whitespace-nowrap"
                      style={{
                        color: prize.textColor,
                        transform: `translateX(-50%) rotate(${segmentAngle / 2}deg)`,
                      }}
                    >
                      {prize.text}
                    </div>
                  </div>
                );
              })}

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Gift className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Prize Display */}
          {prize && (
            <div className="mb-6 p-4 bg-white rounded-2xl shadow-baby-soft animate-in fade-in slide-in-from-bottom-4">
              <p className="text-lg font-semibold text-muted-foreground mb-1">
                Congratulations! 🎊
              </p>
              <p className="text-2xl font-bold text-primary">
                You won: {prize}
              </p>
            </div>
          )}

          {/* Spin Button */}
          <Button
            onClick={spinWheel}
            disabled={spinning}
            size="lg"
            className="w-full text-lg font-semibold"
          >
            {spinning ? 'Spinning...' : prize ? 'SPIN AGAIN!' : 'SPIN THE WHEEL'}
          </Button>

          {prize && (
            <p className="mt-4 text-sm text-muted-foreground">
              Your discount will be applied at checkout
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};