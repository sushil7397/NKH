import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '../data/cakes.js'
import { useData } from '../context/DataContext.jsx'
import CakeCard from '../components/CakeCard.jsx'
import PageTransition from '../components/PageTransition.jsx'

export default function Cakes() {
  const { cakes, reviews } = useData()
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [eggless, setEggless] = useState(false)
  const [sortBy, setSortBy] = useState('popular') // popular | price-asc | price-desc

  const ratings = useMemo(() => {
    const approved = reviews.filter((r) => r.approved)
    return cakes.reduce((acc, c) => {
      const cr = approved.filter((r) => r.cakeId === c.id)
      acc[c.id] = cr.length ? cr.reduce((s, r) => s + r.rating, 0) / cr.length : 0
      return acc
    }, {})
  }, [cakes, reviews])

  const filtered = useMemo(() => {
    let out = [...cakes]
    if (category !== 'All') out = out.filter((c) => c.category === category)
    if (eggless) out = out.filter((c) => c.eggless)
    if (query.trim()) {
      const q = query.toLowerCase()
      out = out.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q),
      )
    }
    if (sortBy === 'price-asc') out.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') out.sort((a, b) => b.price - a.price)
    else out.sort((a, b) => Number(b.bestseller) - Number(a.bestseller))
    return out
  }, [cakes, category, query, eggless, sortBy])

  return (
    <PageTransition>
      {/* Header band */}
      <section className="bg-chocolate text-cream py-14">
        <div className="section">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3">
            Our Cake Menu
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-cream mb-3">
            Pick. Personalise. Celebrate.
          </h1>
          <p className="text-cream-100/80 max-w-2xl">
            Browse {cakes.length}+ handcrafted cakes & pastries. Filter by occasion, dietary
            preference, or simply search for your favourite flavour.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-cream-50/95 backdrop-blur border-b border-chocolate-50">
        <div className="section py-4 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-chocolate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cakes, flavours, occasions..."
              className="input pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={eggless}
                onChange={(e) => setEggless(e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              Eggless only
            </label>
            <div className="flex items-center gap-2 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-chocolate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-chocolate-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold/40"
              >
                <option value="popular">Most popular</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="section pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                category === cat
                  ? 'bg-chocolate text-cream'
                  : 'bg-white text-chocolate-500 hover:bg-chocolate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="section">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-chocolate-400 mb-4">
                No cakes match your filters yet — try a different category or clear search.
              </p>
              <button
                className="btn-outline"
                onClick={() => {
                  setCategory('All')
                  setQuery('')
                  setEggless(false)
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-chocolate-400 mb-6">
                Showing <span className="font-semibold text-chocolate">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'cake' : 'cakes'}
                {category !== 'All' ? ` in ${category}` : ''}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((cake, i) => (
                  <CakeCard key={cake.id} cake={cake} rating={ratings[cake.id]} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
