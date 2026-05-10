import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

export default function TestimonialSlider({ items = [] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(id)
  }, [items.length])

  if (!items.length) return null

  const item = items[index]

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute -top-6 -left-2 text-gold/40">
        <Quote className="w-16 h-16" />
      </div>

      <AnimatePresence mode="wait">
        <motion.blockquote
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-cake p-8 md:p-10 text-center relative"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < item.rating ? 'fill-gold text-gold' : 'text-chocolate-100'
                }`}
              />
            ))}
          </div>
          <p className="text-lg md:text-xl text-chocolate-600 font-display italic leading-relaxed">
            “{item.comment}”
          </p>
          <footer className="mt-6 text-sm">
            <p className="font-semibold text-chocolate">— {item.name}</p>
            <p className="text-chocolate-400 text-xs uppercase tracking-widest mt-0.5">
              Verified Customer
            </p>
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="w-10 h-10 rounded-full bg-white shadow-cake hover:bg-gold transition flex items-center justify-center"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'bg-gold w-8' : 'bg-chocolate-100 w-2'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="w-10 h-10 rounded-full bg-white shadow-cake hover:bg-gold transition flex items-center justify-center"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
