import { useMemo, useState } from 'react'
import { Phone, Mail, MessageCircle, Calendar, CheckCircle2, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

const STATUSES = ['new', 'contacted', 'closed']

export default function ManageEnquiries() {
  const { enquiries, updateEnquiryStatus } = useData()
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return enquiries
    return enquiries.filter((e) => e.status === filter)
  }, [enquiries, filter])

  const counts = useMemo(
    () => ({
      all: enquiries.length,
      new: enquiries.filter((e) => e.status === 'new').length,
      contacted: enquiries.filter((e) => e.status === 'contacted').length,
      closed: enquiries.filter((e) => e.status === 'closed').length,
    }),
    [enquiries],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl mb-1">Enquiries</h1>
        <p className="text-chocolate-400">
          Customer messages from the website. Click to mark as contacted/closed.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', ...STATUSES].map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition capitalize ${
              filter === k
                ? 'bg-chocolate text-cream'
                : 'bg-white text-chocolate-500 hover:bg-chocolate-50'
            }`}
          >
            {k} <span className="ml-1 text-xs opacity-70">({counts[k] ?? 0})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-chocolate-400">
          No enquiries here yet — submit a test enquiry from the public Contact page.
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {filtered.map((e) => (
            <article key={e.id} className="card p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold">{e.name}</p>
                  <p className="text-xs text-chocolate-400">
                    {new Date(e.createdAt).toLocaleString('en-IN')} · {e.source || 'Web'}
                  </p>
                </div>
                <select
                  value={e.status}
                  onChange={(ev) => updateEnquiryStatus(e.id, ev.target.value)}
                  className={`chip border-0 cursor-pointer ${
                    e.status === 'new'
                      ? 'bg-emerald-100 text-emerald-700'
                      : e.status === 'contacted'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-chocolate-50 text-chocolate-500'
                  }`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {e.cakeTitle && (
                <p className="text-sm bg-cream-50 rounded-lg px-3 py-2 mb-3">
                  Cake: <strong>{e.cakeTitle}</strong>
                  {e.weight && ` · ${e.weight}`}
                  {e.price && ` · ₹${e.price}`}
                </p>
              )}

              {e.cakeType && (
                <p className="text-xs text-chocolate-400 mb-2">
                  Type: <span className="font-medium text-chocolate-500">{e.cakeType}</span>
                </p>
              )}

              <p className="text-sm text-chocolate-500 mb-3">{e.message || '—'}</p>

              <div className="grid grid-cols-2 gap-2 text-xs text-chocolate-500">
                <a
                  href={`tel:${e.phone}`}
                  className="flex items-center gap-1 hover:text-chocolate"
                >
                  <Phone className="w-3.5 h-3.5" /> {e.phone}
                </a>
                {e.email && (
                  <a
                    href={`mailto:${e.email}`}
                    className="flex items-center gap-1 hover:text-chocolate"
                  >
                    <Mail className="w-3.5 h-3.5" /> {e.email}
                  </a>
                )}
                {e.eventDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {e.eventDate}
                  </span>
                )}
                <a
                  href={`https://wa.me/${e.phone?.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-chocolate"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
