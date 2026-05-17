import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import CakePlaceholder from './CakePlaceholder.jsx'
import VegMark from './VegMark.jsx'

export default function CakeCard({ cake, rating, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="card group flex flex-col"
    >
      <div className="aspect-[4/3] relative">
        <CakePlaceholder
          image={cake.image}
          tint={cake.tint}
          accent={cake.accent}
          label={cake.title}
          className="h-full"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {cake.bestseller && (
            <span className="chip bg-gold text-chocolate font-semibold">★ Bestseller</span>
          )}
        </div>
        {cake.eggless && <VegMark className="absolute top-3 right-3" />}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-chocolate-400 mb-1">
              {cake.category}
            </p>
            <h3 className="font-lexend font-semibold text-lg leading-tight tracking-tight">{cake.title}</h3>
          </div>
          {typeof rating === 'number' && rating > 0 && (
            <div className="shrink-0 flex items-center gap-1 text-xs text-chocolate-500">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>

        <p className="text-sm text-chocolate-400 line-clamp-2">{cake.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2 border-t border-chocolate-50">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-chocolate-400">Starts at</p>
            <p className="font-lexend font-bold text-xl text-chocolate tracking-tight">₹{cake.price}</p>
          </div>
          <Link
            to={`/cake/${cake.id}`}
            className="btn-primary !py-2 !px-4 text-sm"
          >
            Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
