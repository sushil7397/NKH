import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { useData } from '../context/DataContext.jsx'
import PageTransition from '../components/PageTransition.jsx'

// WhatsApp wa.me URLs require a digit-only number (no +, no spaces, no dashes).
// Country code (91) + 10-digit mobile, concatenated.
const WHATSAPP_NUMBER = '918850198961'
const PHONE_NUMBER = '+91 88501 98961'

const CAKE_TYPES = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Eggless / Vegan',
  'Designer / Photo',
  'Pastries / Bulk',
  'Corporate Gifting',
  'Other',
]

export default function Contact() {
  const { addEnquiry } = useData()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    addEnquiry({ ...data, source: 'Contact Page' })
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 6000)
  }

  return (
    <PageTransition>
      <section className="bg-chocolate text-cream py-16">
        <div className="section">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3">
            Let's Talk Cake
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-cream mb-3">Contact us</h1>
          <p className="text-cream-100/80 max-w-2xl">
            Have a celebration coming up? Drop us a line — we usually respond within 30
            minutes during business hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="section grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-6 md:p-8">
              <h2 className="font-display text-2xl mb-1">Enquiry form</h2>
              <p className="text-sm text-chocolate-400 mb-6">
                Tell us a bit about your event and we'll send a quote.
              </p>

              {submitted && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-4 mb-5 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm">
                    Thank you! Your enquiry has been recorded. Our team will be in touch
                    shortly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="label">Full name *</label>
                  <input
                    {...register('name', { required: 'Please enter your name' })}
                    className="input"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Phone *</label>
                  <input
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: {
                        value: /^[0-9+\-\s]{10,15}$/,
                        message: 'Enter a valid phone number',
                      },
                    })}
                    className="input"
                    placeholder="+91 88501 98961"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register('email', {
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                    className="input"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Date of event *</label>
                  <input
                    type="date"
                    {...register('eventDate', { required: 'Pick a date' })}
                    className="input"
                  />
                  {errors.eventDate && (
                    <p className="text-xs text-red-500 mt-1">{errors.eventDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Cake type *</label>
                  <select
                    {...register('cakeType', { required: 'Please select a type' })}
                    className="input"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {CAKE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.cakeType && (
                    <p className="text-xs text-red-500 mt-1">{errors.cakeType.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="label">Tell us more *</label>
                  <textarea
                    rows={4}
                    {...register('message', {
                      required: 'A few details help us quote accurately',
                      minLength: { value: 10, message: 'Please share a bit more (10+ chars)' },
                    })}
                    className="input"
                    placeholder="Theme, weight, flavour, dietary preferences, delivery location..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold flex-1"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp Instead
                  </a>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="card overflow-hidden mt-8">
              <iframe
                title="Noida's Cake House location"
                src="https://www.google.com/maps?q=Sector+12,+Noida,+Uttar+Pradesh&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Quick contact sidebar */}
          <aside className="space-y-4">
            <div className="card p-6">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                Quick Contact
              </p>
              <h3 className="font-display text-xl mb-4">We're a tap away</h3>
              <div className="space-y-3">
                <a href={`tel:${PHONE_NUMBER}`} className="btn-primary w-full justify-start">
                  <Phone className="w-4 h-4" /> Call {PHONE_NUMBER}
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold w-full justify-start"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Chat
                </a>
                <a
                  href="mailto:hello@noidascakehouse.in"
                  className="btn-outline w-full justify-start"
                >
                  <Mail className="w-4 h-4" /> hello@noidascakehouse.in
                </a>
              </div>
            </div>

            <div className="card p-6">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">
                Visit our store
              </p>
              <h3 className="font-display text-xl mb-4">Sector 12, Noida</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-chocolate-500">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                  K-63, Ground Floor, Sector 12, Noida, Uttar Pradesh 201301
                </li>
                <li className="flex items-start gap-2 text-chocolate-500">
                  <Clock className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                  Monday – Sunday · 10:00 AM – 10:30 PM
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageTransition>
  )
}
