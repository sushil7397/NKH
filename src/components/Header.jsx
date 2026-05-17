import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { assetUrl } from '../utils/assets.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/cakes', label: 'Cakes' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream-50/85 border-b border-chocolate-50">
      <div className="section flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={assetUrl('new logo.png')}
            alt="Noida's Cake House"
            className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:rotate-6 transition-transform"
          />
          <div className="leading-tight hidden sm:block">
            <p className="font-display text-lg md:text-xl text-chocolate">Noida's Cake House</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-chocolate-400">
              Sweetening Your Day · Since 2021
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? 'bg-chocolate text-cream'
                    : 'text-chocolate hover:bg-chocolate-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+91 88501 98961"
            className="btn-ghost"
            aria-label="Call us"
          >
            <Phone className="w-4 h-4" /> +91 88501 98961
          </a>
          <Link to="/cakes" className="btn-gold">
            Order Now
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-chocolate-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-chocolate-50 bg-cream-50">
          <nav className="section py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg ${
                    isActive ? 'bg-chocolate text-cream' : 'text-chocolate'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/cakes" onClick={() => setOpen(false)} className="btn-gold mt-2">
              Order Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
