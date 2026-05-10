import { useMemo, useState } from 'react'
import { Eye, EyeOff, Star, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
]

export default function ManageReviews() {
  const { reviews, cakes, toggleReview, deleteReview } = useData()
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'pending') return reviews.filter((r) => !r.approved)
    if (filter === 'approved') return reviews.filter((r) => r.approved)
    return reviews
  }, [reviews, filter])

  const cakeName = (id) => cakes.find((c) => c.id === id)?.title || 'Unknown cake'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl mb-1">Review Moderation</h1>
        <p className="text-chocolate-400">
          Approve or hide customer reviews from the public site.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f.key === 'all'
              ? reviews.length
              : f.key === 'pending'
              ? reviews.filter((r) => !r.approved).length
              : reviews.filter((r) => r.approved).length
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === f.key
                  ? 'bg-chocolate text-cream'
                  : 'bg-white text-chocolate-500 hover:bg-chocolate-50'
              }`}
            >
              {f.label} <span className="ml-1 text-xs opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-chocolate-400">
          No reviews in this view.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <article key={r.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-chocolate-400">
                    on{' '}
                    <span className="text-chocolate-500 font-medium">{cakeName(r.cakeId)}</span>{' '}
                    · {new Date(r.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <span
                  className={`chip ${
                    r.approved
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {r.approved ? 'Public' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center gap-1 my-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < r.rating ? 'fill-gold text-gold' : 'text-chocolate-100'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-chocolate-500 leading-relaxed">{r.comment}</p>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-chocolate-50">
                <button
                  onClick={() => toggleReview(r.id)}
                  className={`btn !py-1.5 !px-3 text-xs ${
                    r.approved
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  }`}
                >
                  {r.approved ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Approve
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this review?')) deleteReview(r.id)
                  }}
                  className="btn !py-1.5 !px-3 text-xs bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
