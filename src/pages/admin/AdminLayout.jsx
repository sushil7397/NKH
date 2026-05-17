import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Cookie,
  MessageSquare,
  MailOpen,
  LogOut,
  Menu,
  X,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useData } from '../../context/DataContext.jsx'
import { assetUrl } from '../../utils/assets.js'

const links = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/admin/cakes', label: 'Cakes', Icon: Cookie },
  { to: '/admin/reviews', label: 'Reviews', Icon: MessageSquare },
  { to: '/admin/enquiries', label: 'Enquiries', Icon: MailOpen },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const { resetDemoData } = useData()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleReset = () => {
    if (confirm('Reset all demo data (cakes, reviews, enquiries)? This cannot be undone.')) {
      resetDemoData()
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky inset-y-0 left-0 w-64 bg-chocolate text-cream-100 z-40 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-cream/10">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={assetUrl('new logo.png')} alt="" className="w-9 h-9 object-contain" />
            <span className="font-display">Cake House</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 hover:bg-cream/10 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {links.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-gold text-chocolate font-semibold'
                    : 'text-cream-100/80 hover:bg-cream/10'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-cream/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-cream-100/70 hover:text-gold"
          >
            <ExternalLink className="w-3 h-3" /> View public site
          </Link>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-xs text-cream-100/70 hover:text-gold"
          >
            <RotateCcw className="w-3 h-3" /> Reset demo data
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 mt-2 px-3 py-2 rounded-lg bg-cream/10 hover:bg-cream/20 text-sm"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-chocolate/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-chocolate-50 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-chocolate-50"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-auto text-right">
            <p className="text-sm font-semibold">{user?.username || 'Admin'}</p>
            <p className="text-xs text-chocolate-400">Signed in as administrator</p>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
