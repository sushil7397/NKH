import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  ArrowLeft,
  Star,
  MessageSquare,
  Phone,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from 'lucide-react'
import { useData } from '../context/DataContext.jsx'
import CakePlaceholder from '../components/CakePlaceholder.jsx'
import Modal from '../components/Modal.jsx'
import PageTransition from '../components/PageTransition.jsx'
import VegMark from '../components/VegMark.jsx'

// WhatsApp wa.me URLs require a digit-only number (no +, no spaces, no dashes).
const WHATSAPP_NUMBER = '918850198961'

export default function CakeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cakes, reviews, addReview, addEnquiry } = useData()
  const cake = cakes.find((c) => c.id === id)

  const [activeWeight, setActiveWeight] = useState(0)
  const [enquireOpen, setEnquireOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const cakeReviews = useMemo(
    () => reviews.filter((r) => r.cakeId === id && r.approved),
    [reviews, id],
  )
  const avgRating = cakeReviews.length
    ? cakeReviews.reduce((s, r) => s + r.rating, 0) / cakeReviews.length
    : 0

  if (!cake) {
    return (
      <div className="section py-24 text-center">
        <h1 className="text-3xl font-display mb-4">Cake not found</h1>
        <p className="text-chocolate-400 mb-6">
          The cake you're looking for may have been removed from our menu.
        </p>
        <Link to="/cakes" className="btn-primary">
          Back to menu
        </Link>
      </div>
    )
  }

  const selected = cake.weights[activeWeight]
  const whatsappMsg = encodeURIComponent(
    `Hi Noida's Cake House! I'd like to enquire about "${cake.title}" — ${selected.size} (₹${selected.price}). Please share availability.`,
  )

  return (
    <PageTransition>
      <div className="section py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-chocolate-400 hover:text-chocolate flex items-center gap-1 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to menu
        </button>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-cake aspect-square">
            <CakePlaceholder
              image={cake.image}
              tint={cake.tint}
              accent={cake.accent}
              label={cake.title}
              className="h-full"
            />
            {cake.eggless && <VegMark className="absolute top-4 right-4" />}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="chip bg-chocolate-50 text-chocolate-500">{cake.category}</span>
              {cake.bestseller && (
                <span className="chip bg-gold text-chocolate font-semibold">★ Bestseller</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-lexend font-semibold tracking-tight mb-3">{cake.title}</h1>

            {avgRating > 0 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(avgRating)
                          ? 'fill-gold text-gold'
                          : 'text-chocolate-100'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{avgRating.toFixed(1)}</span>
                <span className="text-chocolate-400">({cakeReviews.length} reviews)</span>
              </div>
            )}

            <p className="text-chocolate-500 leading-relaxed mb-6">{cake.description}</p>

            <div className="mb-6">
              <p className="label">Choose weight</p>
              <div className="flex flex-wrap gap-2">
                {cake.weights.map((w, i) => (
                  <button
                    key={w.size}
                    onClick={() => setActiveWeight(i)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition ${
                      activeWeight === i
                        ? 'border-chocolate bg-chocolate text-cream'
                        : 'border-chocolate-100 hover:border-chocolate-300'
                    }`}
                  >
                    <span className="block font-lexend tracking-tight">{w.size}</span>
                    <span
                      className={`block text-xs font-lexend font-semibold ${
                        activeWeight === i ? 'text-gold' : 'text-chocolate-400'
                      }`}
                    >
                      ₹{w.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between bg-cream-50 rounded-2xl p-5 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-chocolate-400">Total</p>
                <p className="font-lexend font-bold text-4xl text-chocolate tracking-tight">₹{selected.price}</p>
                <p className="text-xs text-chocolate-400 mt-1">incl. taxes · {selected.size}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => setEnquireOpen(true)} className="btn-primary">
                  <MessageSquare className="w-4 h-4" /> Inquire Now
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <li className="flex items-center gap-2 bg-white rounded-xl p-3 border border-chocolate-50">
                <Truck className="w-4 h-4 text-gold" /> Same-day delivery
              </li>
              <li className="flex items-center gap-2 bg-white rounded-xl p-3 border border-chocolate-50">
                <ShieldCheck className="w-4 h-4 text-gold" /> FSSAI certified
              </li>
              <li className="flex items-center gap-2 bg-white rounded-xl p-3 border border-chocolate-50">
                <Phone className="w-4 h-4 text-gold" /> Custom designs
              </li>
            </ul>
          </div>
        </div>

        {/* Reviews section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-1">
                Customer Reviews
              </p>
              <h2 className="text-2xl md:text-3xl font-display">
                {cakeReviews.length} {cakeReviews.length === 1 ? 'review' : 'reviews'}
              </h2>
            </div>
            <button onClick={() => setReviewOpen(true)} className="btn-outline">
              Write a review
            </button>
          </div>

          {cakeReviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-chocolate-50">
              <p className="text-chocolate-400">
                No reviews yet — be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {cakeReviews.map((r) => (
                <article key={r.id} className="bg-white rounded-2xl p-6 border border-chocolate-50">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < r.rating ? 'fill-gold text-gold' : 'text-chocolate-100'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-chocolate-600 leading-relaxed mb-3">“{r.comment}”</p>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-chocolate-400">
                    {new Date(r.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Enquire modal */}
      <EnquireModal
        open={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        cake={cake}
        weight={selected}
        onSubmit={(data) => {
          addEnquiry({
            ...data,
            cakeTitle: cake.title,
            cakeId: cake.id,
            weight: selected.size,
            price: selected.price,
            source: 'Cake Detail',
          })
          setSubmitted(true)
          setTimeout(() => {
            setEnquireOpen(false)
            setSubmitted(false)
          }, 1800)
        }}
        submitted={submitted}
      />

      {/* Review modal */}
      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={(data) => {
          addReview({ ...data, cakeId: cake.id })
          setReviewOpen(false)
        }}
      />
    </PageTransition>
  )
}

function EnquireModal({ open, onClose, cake, weight, onSubmit, submitted }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const submit = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <Modal open={open} onClose={onClose} title={`Inquire — ${cake.title}`}>
      {submitted ? (
        <div className="text-center py-6">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
          <h4 className="font-display text-xl mb-1">Thank you!</h4>
          <p className="text-chocolate-400 text-sm">
            Our team will get in touch within 30 minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="bg-cream-50 rounded-xl p-3 text-sm">
            <strong>{cake.title}</strong> · {weight.size} · ₹{weight.price}
          </div>
          <div>
            <label className="label">Your Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input"
              placeholder="Full name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Phone</label>
              <input
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: { value: /^[0-9+\-\s]{10,15}$/, message: 'Enter a valid phone' },
                })}
                className="input"
                placeholder="+91 ..."
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="label">Date of event</label>
              <input type="date" {...register('eventDate')} className="input" />
            </div>
          </div>
          <div>
            <label className="label">Message</label>
            <textarea
              rows={3}
              {...register('message')}
              className="input"
              placeholder="Special instructions, design references, etc."
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Enquiry
          </button>
        </form>
      )}
    </Modal>
  )
}

function ReviewModal({ open, onClose, onSubmit }) {
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
    defaultValues: { rating: 5 },
  })
  const rating = watch('rating')

  const submit = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <Modal open={open} onClose={onClose} title="Write a review">
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="label">Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setValue('rating', n)}
                aria-label={`${n} stars`}
              >
                <Star
                  className={`w-7 h-7 ${
                    n <= rating ? 'fill-gold text-gold' : 'text-chocolate-100'
                  }`}
                />
              </button>
            ))}
          </div>
          <input type="hidden" {...register('rating', { valueAsNumber: true })} />
        </div>
        <div>
          <label className="label">Your name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="input"
            placeholder="How should we display you?"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Comment</label>
          <textarea
            rows={4}
            {...register('comment', { required: 'Please share a few words' })}
            className="input"
            placeholder="Tell others about your experience..."
          />
          {errors.comment && (
            <p className="text-xs text-red-500 mt-1">{errors.comment.message}</p>
          )}
        </div>
        <p className="text-xs text-chocolate-400">
          Reviews are moderated before they appear publicly.
        </p>
        <button type="submit" className="btn-primary w-full">
          Submit review
        </button>
      </form>
    </Modal>
  )
}
