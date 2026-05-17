import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Cake,
  Truck,
  Heart,
  ShieldCheck,
  Star,
  Sparkles,
  Clock,
} from 'lucide-react'
import { useData } from '../context/DataContext.jsx'
import CakeCard from '../components/CakeCard.jsx'
import TestimonialSlider from '../components/TestimonialSlider.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { assetUrl } from '../utils/assets.js'

export default function Home() {
  const { cakes, reviews } = useData()
  const approvedReviews = reviews.filter((r) => r.approved)
  const featured = cakes.filter((c) => c.bestseller).slice(0, 4)

  // Average rating per cake
  const ratings = cakes.reduce((acc, c) => {
    const cakeReviews = approvedReviews.filter((r) => r.cakeId === c.id)
    if (cakeReviews.length) {
      acc[c.id] =
        cakeReviews.reduce((s, r) => s + r.rating, 0) / cakeReviews.length
    }
    return acc
  }, {})

  // Category tiles — pick one nice image per category to act as the cover.
  const categoryTiles = [
    {
      label: 'Cakes',
      tagline: 'Birthdays, anniversaries, designer',
      count: cakes.filter((c) => c.category === 'Cakes').length,
      to: '/cakes?cat=Cakes',
      cover:
        cakes.find((c) => c.category === 'Cakes' && c.bestseller)?.image ||
        cakes.find((c) => c.category === 'Cakes')?.image,
    },
    {
      label: 'Jar Cakes',
      tagline: 'Grab-and-go single-serve treats',
      count: cakes.filter((c) => c.category === 'Jar Cakes').length,
      to: '/cakes?cat=Jar+Cakes',
      cover:
        cakes.find((c) => c.category === 'Jar Cakes' && c.bestseller)?.image ||
        cakes.find((c) => c.category === 'Jar Cakes')?.image,
    },
    {
      label: 'Bento Cakes',
      tagline: 'Pull-me-up surprises for two',
      count: cakes.filter((c) => c.category === 'Bento Cakes').length,
      to: '/cakes?cat=Bento+Cakes',
      cover:
        cakes.find((c) => c.category === 'Bento Cakes' && c.bestseller)?.image ||
        cakes.find((c) => c.category === 'Bento Cakes')?.image,
    },
  ]

  return (
    <PageTransition>
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background gradient + decorative glows */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-chocolate via-chocolate-600 to-chocolate-800" />
          <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-wine/30 blur-3xl" />
        </div>

        <div className="section pt-8 pb-16 md:pt-10 md:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          {/* ─── Left: copy ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <span className="chip bg-gold/15 text-gold mb-5 border border-gold/30">
              <Sparkles className="w-3 h-3" /> Freshly baked in Sector 12 · Since 2021
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-cream leading-[1.05] mb-5">
              Cakes that turn{' '}
              <span className="text-gold">ordinary days</span>{' '}
              into memories.
            </h1>
            <p className="text-cream-100/80 text-lg max-w-xl leading-relaxed mb-8">
              From classic black forest to designer fondant — eggless, customised,
              and delivered the same day across Noida and Greater Noida.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/cakes" className="btn-gold text-base">
                Order a Cake <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="btn border-2 border-cream/30 text-cream hover:bg-cream hover:text-chocolate"
              >
                Custom Order
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10 max-w-md">
              {[
                { v: '5+', l: 'Years' },
                { v: '700+', l: 'Cakes Baked' },
                { v: '4.5★', l: 'Avg. Rating' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl text-gold">{s.v}</p>
                  <p className="text-xs uppercase tracking-widest text-cream/60">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Right: logo badge ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative aspect-square max-w-xl lg:max-w-2xl mx-auto w-full"
          >
            <div className="absolute -inset-10 rounded-full bg-gold/25 blur-3xl" />
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src={assetUrl('new logo.png')}
                alt="Noida's Cake House logo"
                className="w-[80%] md:w-[75%] lg:w-[70%] -translate-y-4 sm:-translate-y-6 lg:-translate-y-8 h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Same-day delivery pill — floats at bottom-left of the badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-6 -left-20 sm:bottom-14 sm:left-0 bg-cream rounded-2xl p-4 shadow-cake max-w-[210px]"
            >
              <div className="flex items-center gap-2 text-wine">
                <Clock className="w-5 h-5" />
                <p className="text-xs font-semibold uppercase tracking-wider">
                  Same-Day Delivery
                </p>
              </div>
              <p className="text-sm text-chocolate mt-1 leading-tight">
                Order by 4 PM — delivered today across Noida.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ FEATURE STRIP ══════════════════════════════ */}
      <section className="bg-cream py-10 border-y border-chocolate-50">
        <div className="section grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { Icon: Cake, t: 'Freshly Baked', s: 'In small batches daily' },
            { Icon: Truck, t: 'Same-Day Delivery', s: 'Across Noida & Gr. Noida' },
            { Icon: Heart, t: 'Customised Designs', s: 'Photo & theme cakes' },
            { Icon: ShieldCheck, t: 'FSSAI Certified', s: 'Hygiene first promise' },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-chocolate text-gold flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-chocolate">{t}</p>
                <p className="text-xs text-chocolate-400">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════ SHOP BY CATEGORY ═══════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="section">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
              Shop the Menu
            </p>
            <h2 className="text-3xl md:text-4xl font-display">Pick your category</h2>
            <p className="text-chocolate-400 mt-2 max-w-xl mx-auto">
              Whether it's a 2 kg centrepiece or a single-serve jar, every category
              is baked the same morning you order.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categoryTiles.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  to={tile.to}
                  className="group block rounded-3xl overflow-hidden shadow-cake ring-1 ring-chocolate-50 hover:ring-gold/60 hover:-translate-y-1 transition bg-white"
                >
                  {/* Image — top portion only, fixed aspect so all 3 tiles
                      line up regardless of how the cover photo is framed. */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-chocolate-50">
                    {tile.cover && (
                      <img
                        src={tile.cover}
                        alt={tile.label}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {/* Small gold pill in the top-right of the image */}
                    <div className="absolute top-3 right-3 chip bg-cream/95 text-chocolate font-semibold text-[10px] backdrop-blur shadow">
                      {tile.count} on the menu
                    </div>
                  </div>

                  {/* Info panel — solid background, fully readable text */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-chocolate mb-1">
                      {tile.label}
                    </h3>
                    <p className="text-sm text-chocolate-400 mb-4 leading-relaxed">
                      {tile.tagline}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-wine group-hover:text-gold transition">
                      Explore {tile.label}{' '}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════ TOP SELLERS ═════════════════════════════ */}
      <section className="pb-16 md:pb-24">
        <div className="section">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
                Most Loved
              </p>
              <h2 className="text-3xl md:text-4xl font-display">Our Top Sellers</h2>
              <p className="text-chocolate-400 mt-2 max-w-xl">
                Tried, tested, and reordered by hundreds of Noida families. Pick a
                favourite or commission your own design.
              </p>
            </div>
            <Link to="/cakes" className="btn-outline">
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((cake, i) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                rating={ratings[cake.id]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════ OCCASION BANNER ═════════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-wine via-chocolate to-chocolate-700" />
        <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.5),_transparent_50%)]" />

        <div className="section grid md:grid-cols-3 gap-8 items-center text-cream">
          {[
            {
              Icon: Heart,
              t: 'Anniversaries',
              s: 'Romantic red velvets, photo cakes and personalised toppers.',
            },
            {
              Icon: Cake,
              t: 'Birthdays',
              s: 'Theme cakes, KitKat gems, edible photo prints — for every age.',
            },
            {
              Icon: Sparkles,
              t: 'Corporate gifting',
              s: 'Branded bento boxes and jar cakes for teams and clients.',
            },
          ].map(({ Icon, t, s }) => (
            <div
              key={t}
              className="bg-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-cream/10 hover:border-gold/40 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-gold/20 text-gold flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl mb-2 text-cream">{t}</h3>
              <p className="text-sm text-cream-100/75 leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════ TESTIMONIALS ════════════════════════════ */}
      <section className="py-16 md:py-24 bg-chocolate-50/40">
        <div className="section">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
              Sweet Words
            </p>
            <h2 className="text-3xl md:text-4xl font-display">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
              <span className="ml-2 text-sm text-chocolate-500 font-semibold">
                4.5 / 5 across {approvedReviews.length || 'all'} reviews
              </span>
            </div>
          </div>
          <TestimonialSlider items={approvedReviews.slice(0, 6)} />
        </div>
      </section>

      {/* ══════════════════════════════ FINAL CTA ══════════════════════════════ */}
      <section className="py-16">
        <div className="section">
          <div className="rounded-3xl bg-chocolate text-cream p-10 md:p-14 grid md:grid-cols-3 gap-8 items-center shadow-cake relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
            <div className="md:col-span-2 relative">
              <h2 className="text-3xl md:text-4xl font-display text-cream mb-3">
                Got a celebration coming up?
              </h2>
              <p className="text-cream-100/80 max-w-xl">
                Tell us your idea — birthdays, anniversaries, weddings, corporate
                gifting. We bake to order, big or small.
              </p>
            </div>
            <div className="flex md:justify-end relative">
              <Link to="/contact" className="btn-gold text-base">
                Send an Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
