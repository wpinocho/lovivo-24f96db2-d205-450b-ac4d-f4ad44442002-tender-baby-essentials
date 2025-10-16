import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Circle } from 'lucide-react'
import { useState } from 'react'

interface ChecklistItem {
  id: string
  category: string
  item: string
  essential: boolean
}

const checklistItems: ChecklistItem[] = [
  { id: '1', category: 'For Baby', item: 'Onesies (5-7)', essential: true },
  { id: '2', category: 'For Baby', item: 'Swaddle blankets (3-4)', essential: true },
  { id: '3', category: 'For Baby', item: 'Newborn diapers', essential: true },
  { id: '4', category: 'For Baby', item: 'Baby wipes', essential: true },
  { id: '5', category: 'For Baby', item: 'Going-home outfit', essential: true },
  { id: '6', category: 'For Baby', item: 'Mittens & booties', essential: false },
  { id: '7', category: 'For Mom', item: 'Nursing bras (2-3)', essential: true },
  { id: '8', category: 'For Mom', item: 'Nursing pads', essential: true },
  { id: '9', category: 'For Mom', item: 'Comfortable pajamas', essential: true },
  { id: '10', category: 'For Mom', item: 'Postpartum recovery kit', essential: true },
  { id: '11', category: 'For Mom', item: 'Toiletries & comfort items', essential: false },
  { id: '12', category: 'Hospital Bag', item: 'Insurance & ID cards', essential: true },
  { id: '13', category: 'Hospital Bag', item: 'Birth plan copies', essential: false },
  { id: '14', category: 'Hospital Bag', item: 'Phone charger', essential: true },
  { id: '15', category: 'Hospital Bag', item: 'Snacks & drinks', essential: false },
]

export const NewbornChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const categories = ['For Baby', 'For Mom', 'Hospital Bag']
  const progress = (checkedItems.size / checklistItems.length) * 100

  return (
    <section id="checklist-section" className="py-16 bg-gradient-baby-cool">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hospital Bag Checklist
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't forget anything! Check off items as you pack for your hospital stay.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span className="font-semibold">{checkedItems.size} / {checklistItems.length}</span>
            </div>
            <div className="h-3 bg-white/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category} className="card-baby">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  {category}
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {checklistItems.filter(item => item.category === category && checkedItems.has(item.id)).length}/
                    {checklistItems.filter(item => item.category === category).length}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {checklistItems
                    .filter(item => item.category === category)
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-start gap-3 text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        {checkedItems.has(item.id) ? (
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                        )}
                        <div className="flex-1">
                          <span className={`text-sm ${checkedItems.has(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {item.item}
                          </span>
                          {item.essential && (
                            <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">
                              Essential
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}