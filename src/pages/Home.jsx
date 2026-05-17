import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Cake, Truck, Heart, ShieldCheck } from 'lucide-react'
import { useData } from '../context/DataContext.jsx'
import CakeCard from '../components/CakeCard.jsx'
import CakePlaceholder from '../components/CakePlaceholder.jsx'
import TestimonialSlider from '../components/TestimonialSlider.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { assetUrl } from '../utils/assets.js'

export default function Home() {
  const { cakes, reviews } = useData()
  const featured = cakes.filter((c) => c.bestseller).slice(0, 4)
  const approvedReviews = reviews.filter((r) => r.approved)

  // Average rating per cake
  const ratings = cakes.reduce((acc, c) => {
    const cakeReviews = approvedReviews.filter((r) => r.cakeId === c.id)
    if (cakeReviews.length) {
      acc[c.id] =
        cakeReviews.reduce((s, r) => s + r.rating, 0) / cakeReviews.length
    }
    return acc
  }, {})

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-chocolate via-chocolate-600 to-chocolate-800" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.6)_0%,_transparent_50%)]" />
        </div>

        <div className="section pt-8 pb-20 md:pt-8 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="chip bg-gold/20 text-gold mb-5">
              <Heart className="w-3 h-3" /> Sector 12, Noida · Since 2021
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-cream leading-[1.05] mb-5">
              Baking Memories <br />
              <span className="text-gold">in Noida since 2021</span>
            </h1>
            <p className="text-cream-100/80 text-lg max-w-lg leading-relaxed mb-8">
              Hand-crafted cakes, designer pastries, and customised celebration desserts —
              freshly baked every morning in our Sector 12 kitchen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/cakes" className="btn-gold text-base">
                View Menu <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn border-2 border-cream/30 text-cream hover:bg-cream hover:text-chocolate">
                Custom Order
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
              {[
                { v: '5+', l: 'Years' },
                { v: '700+', l: 'Cakes Baked' },
                { v: '4.5★', l: 'Avg. Rating' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl text-gold">{s.v}</p>
                  <p className="text-xs uppercase tracking-widest text-cream/60">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
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
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-cream rounded-2xl p-4 shadow-cake max-w-[180px]"
            >
              <div className="flex items-center gap-2 text-gold">
                <Heart className="w-5 h-5" />
                <p className="text-xs font-semibold uppercase tracking-wider">Sweetening Your Day</p>
              </div>
              <p className="text-sm text-chocolate mt-1">Freshly baked cakes for every celebration.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE STRIP */}
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

      {/* TOP SELLERS */}
      <section className="py-16 md:py-24">
        <div className="section">
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
                Most Loved
              </p>
              <h2 className="text-3xl md:text-4xl font-display">Our Top Sellers</h2>
              <p className="text-chocolate-400 mt-2 max-w-xl">
                Tried, tested, and reordered by hundreds of Noida families. Pick a favourite
                or commission your own design.
              </p>
            </div>
            <Link to="/cakes" className="btn-outline">
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((cake, i) => (
              <CakeCard key={cake.id} cake={cake} rating={ratings[cake.id]} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-chocolate-50/40">
        <div className="section">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
              Sweet Words
            </p>
            <h2 className="text-3xl md:text-4xl font-display">What Our Customers Say</h2>
          </div>
          <TestimonialSlider items={approvedReviews.slice(0, 6)} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="section">
          <div className="rounded-3xl bg-chocolate text-cream p-10 md:p-14 grid md:grid-cols-3 gap-8 items-center shadow-cake">
            <div className="md:col-span-2">
              <h2 className="text-3xl md:text-4xl font-display text-cream mb-3">
                Got a celebration coming up?
              </h2>
              <p className="text-cream-100/80 max-w-xl">
                Tell us your idea — birthdays, anniversaries, weddings, corporate gifting. We
                bake to order, big or small.
              </p>
            </div>
            <div className="flex md:justify-end">
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
