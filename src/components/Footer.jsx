import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-chocolate text-cream-100 mt-16">
      <div className="section py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Noida's Cake House"
              className="w-14 h-14 object-contain shrink-0"
            />
            <div>
              <p className="font-display text-xl">Noida's Cake House</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold/80 mt-0.5">
                Made With Love
              </p>
            </div>
          </div>
          <p className="text-cream-100/80 max-w-md leading-relaxed">
            From classic truffles to designer fusion cakes — every order is baked fresh in
            small batches and delivered with care across Noida and Greater Noida.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-cream/10 hover:bg-gold hover:text-chocolate flex items-center justify-center transition"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-cream/10 hover:bg-gold hover:text-chocolate flex items-center justify-center transition"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-cream/10 bg-cream/5 p-4">
            <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-cream px-3 py-2">
              <img src="/fssai.png" alt="FSSAI" className="max-h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gold">FSSAI</p>
              <p className="text-sm text-cream-100/80">Lic. No. 22723922001350</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Visit Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span>K-63, Ground Floor, Sector 12, Noida, Uttar Pradesh 201301</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold" />
              <a href="tel:+919999999999" className="hover:text-gold">
                +91 88501 98961
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold" />
              <a href="mailto:hello@noidascakehouse.in" className="hover:text-gold">
                hello@noidascakehouse.in
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span>Mon – Sun · 10:00 AM – 10:30 PM</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cakes" className="hover:text-gold">Cake Menu</Link></li>
            <li><Link to="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Bulk Enquiry</Link></li>
            <li><Link to="/admin/login" className="hover:text-gold">Admin Login</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="section py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-cream-100/70">
          <p>© {new Date().getFullYear()} Noida's Cake House. All rights reserved.</p>
          <p>Crafted with cocoa & code in Sector 12, Noida.</p>
        </div>
      </div>
    </footer>
  )
}
