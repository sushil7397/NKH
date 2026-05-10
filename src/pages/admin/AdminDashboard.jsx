import { Link } from 'react-router-dom'
import {
  Cookie,
  MessageSquare,
  MailOpen,
  Star,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

export default function AdminDashboard() {
  const { cakes, reviews, enquiries } = useData()

  const pendingReviews = reviews.filter((r) => !r.approved).length
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : '—'

  const stats = [
    {
      label: 'Total Cakes',
      value: cakes.length,
      Icon: Cookie,
      color: 'bg-chocolate text-gold',
      to: '/admin/cakes',
    },
    {
      label: 'Pending Reviews',
      value: pendingReviews,
      Icon: MessageSquare,
      color: 'bg-amber-100 text-amber-700',
      to: '/admin/reviews',
    },
    {
      label: 'New Enquiries',
      value: newEnquiries,
      Icon: MailOpen,
      color: 'bg-emerald-100 text-emerald-700',
      to: '/admin/enquiries',
    },
    {
      label: 'Average Rating',
      value: avgRating,
      Icon: Star,
      color: 'bg-gold/20 text-gold-500',
    },
  ]

  const recentEnquiries = enquiries.slice(0, 5)
  const recentReviews = reviews.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl mb-1">Dashboard</h1>
        <p className="text-chocolate-400">
          Overview of orders, reviews, and enquiries.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Card = s.to ? Link : 'div'
          return (
            <Card
              key={s.label}
              to={s.to}
              className="card p-5 flex items-center gap-4 hover:shadow-lg transition"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.color}`}>
                <s.Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-chocolate-400">
                  {s.label}
                </p>
                <p className="font-display text-2xl text-chocolate">{s.value}</p>
              </div>
              {s.to && <ArrowRight className="w-4 h-4 text-chocolate-400" />}
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent enquiries */}
        <section className="card">
          <header className="flex items-center justify-between p-5 border-b border-chocolate-50">
            <div>
              <h2 className="font-display text-lg">Recent enquiries</h2>
              <p className="text-xs text-chocolate-400">Last 5 customer messages</p>
            </div>
            <Link to="/admin/enquiries" className="text-xs text-gold hover:underline">
              View all
            </Link>
          </header>
          {recentEnquiries.length === 0 ? (
            <div className="p-10 text-center text-chocolate-400 text-sm">
              No enquiries yet.
            </div>
          ) : (
            <ul className="divide-y divide-chocolate-50">
              {recentEnquiries.map((e) => (
                <li key={e.id} className="p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                    <MailOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold truncate">{e.name}</p>
                      <span
                        className={`chip ${
                          e.status === 'new'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-chocolate-50 text-chocolate-400'
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>
                    <p className="text-xs text-chocolate-400">
                      {e.cakeType || e.cakeTitle || 'General'} · {e.phone}
                    </p>
                    <p className="text-sm text-chocolate-500 mt-1 line-clamp-2">
                      {e.message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent reviews */}
        <section className="card">
          <header className="flex items-center justify-between p-5 border-b border-chocolate-50">
            <div>
              <h2 className="font-display text-lg">Recent reviews</h2>
              <p className="text-xs text-chocolate-400">Approve or hide from public site</p>
            </div>
            <Link to="/admin/reviews" className="text-xs text-gold hover:underline">
              Moderate
            </Link>
          </header>
          {recentReviews.length === 0 ? (
            <div className="p-10 text-center text-chocolate-400 text-sm">
              No reviews yet.
            </div>
          ) : (
            <ul className="divide-y divide-chocolate-50">
              {recentReviews.map((r) => (
                <li key={r.id} className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-semibold">{r.name}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      {r.rating}
                    </div>
                  </div>
                  <p className="text-sm text-chocolate-500 line-clamp-2">{r.comment}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-chocolate-400">
                    <span>{new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
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
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="card p-6 bg-chocolate text-cream-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gold/20 text-gold flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="font-display text-lg">Want to add a new cake?</p>
            <p className="text-sm text-cream-100/70">
              Manage the entire catalog from the Cakes section.
            </p>
          </div>
        </div>
        <Link to="/admin/cakes" className="btn-gold">
          Go to Cake Manager <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
