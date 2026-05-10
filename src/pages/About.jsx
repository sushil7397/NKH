import { motion } from 'framer-motion'
import { Heart, Award, Cake, Users } from 'lucide-react'
import CakePlaceholder from '../components/CakePlaceholder.jsx'
import PageTransition from '../components/PageTransition.jsx'

const milestones = [
  { year: '2017', title: 'A small dream begins', text: 'Founded as a 2-table boutique bakery in Sector 12, Noida.' },
  { year: '2019', title: 'First 1000 cakes', text: 'Crossed our first thousand celebration cakes; introduced eggless menu.' },
  { year: '2021', title: 'Designer & fusion', text: 'Launched our designer line — rasmalai cakes, photo prints, custom themes.' },
  { year: '2023', title: 'FSSAI gold standard', text: 'Awarded FSSAI compliance and Best Bakery (Noida) by local press.' },
  { year: '2026', title: '12,000+ memories', text: 'Today, we bake fresh every morning for families across NCR.' },
]

const values = [
  { Icon: Heart, t: 'Made with love', s: 'Every cake hand-finished by our pastry team — no shortcuts, ever.' },
  { Icon: Award, t: 'Quality first', s: 'Premium Belgian chocolate, fresh dairy, and FSSAI-grade hygiene.' },
  { Icon: Cake, t: 'Custom & creative', s: 'From photo cakes to fondant sculptures — we bring your idea to life.' },
  { Icon: Users, t: 'Family-owned', s: 'Independent and local. Every order matters as much as the first one.' },
]

export default function About() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-chocolate text-cream py-20">
        <div className="section grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl font-display text-cream mb-5">
              Built on butter, sugar, and love.
            </h1>
            <p className="text-cream-100/80 text-lg leading-relaxed">
              Noida's Cake House started in 2017 with a single oven, three trusted recipes,
              and one idea — that every birthday, anniversary, and quiet Tuesday deserves a
              great slice. Eight years on, we're still small enough to know your name, and big
              enough to never miss a delivery.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <CakePlaceholder tint="#7E1416" accent="#FFFDD0" label="Our Story" className="aspect-[4/3]" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="section">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
              What we stand for
            </p>
            <h2 className="text-3xl md:text-4xl font-display">Our values, baked in</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, t, s }) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/20 text-gold flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg mb-2">{t}</h3>
                <p className="text-sm text-chocolate-400 leading-relaxed">{s}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-chocolate-50/40">
        <div className="section">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2">
              The Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-display">Eight sweet years</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-chocolate-100" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative pl-12 md:pl-0 mb-10 md:grid md:grid-cols-2 md:gap-12 ${
                  i % 2 ? 'md:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className={i % 2 ? 'md:text-left' : 'md:text-right'}>
                  <p className="font-display text-3xl text-gold">{m.year}</p>
                  <h3 className="font-display text-xl">{m.title}</h3>
                </div>
                <div>
                  <p className="text-chocolate-500 leading-relaxed">{m.text}</p>
                </div>
                <span className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-gold ring-4 ring-cream-50" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
