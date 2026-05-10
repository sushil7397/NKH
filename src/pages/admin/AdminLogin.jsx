import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Lock, AlertTriangle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { assetUrl } from '../../utils/assets.js'

export default function AdminLogin() {
  const { login, isAuthenticated, demoCredentials } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    navigate(from, { replace: true })
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(form)
    if (result.ok) navigate(from, { replace: true })
    else setError(result.message)
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-cream-50">
      <div className="hidden md:block relative bg-chocolate text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.4),transparent_60%)]" />
        <div className="relative h-full flex flex-col justify-between p-10">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={assetUrl('logo.png')}
              alt="Noida's Cake House"
              className="w-14 h-14 object-contain"
            />
            <p className="font-display text-xl">Noida's Cake House</p>
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-3">
              Admin Console
            </p>
            <h1 className="text-4xl font-display text-cream max-w-sm leading-tight">
              Manage your menu, reviews, and enquiries — all in one place.
            </h1>
            <p className="mt-4 text-cream-100/70 max-w-sm">
              Sign in to add new cakes, moderate user reviews, and follow up on the day's
              enquiries.
            </p>
          </div>
          <p className="text-xs text-cream-100/50">
            © {new Date().getFullYear()} Noida's Cake House — Sector 12, Noida.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-sm card p-8">
          <div className="flex flex-col items-center text-center mb-6 md:hidden">
            <img src={assetUrl('logo.png')} alt="Noida's Cake House" className="w-20 h-20 object-contain mb-2" />
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-chocolate text-gold flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl">Admin sign in</h2>
              <p className="text-xs text-chocolate-400">Restricted access</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-sm flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="label">Username</label>
              <input
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="input"
                placeholder="admin"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input"
                placeholder="••••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full mt-6">
            Sign in
          </button>

          <div className="mt-6 text-xs bg-cream-50 border border-chocolate-50 rounded-xl p-3 text-chocolate-500">
            <p className="font-semibold mb-1">Demo credentials</p>
            <p>username: <code>{demoCredentials.username}</code></p>
            <p>password: <code>{demoCredentials.password}</code></p>
          </div>

          <Link
            to="/"
            className="block mt-6 text-center text-xs text-chocolate-400 hover:text-chocolate"
          >
            ← Back to website
          </Link>
        </form>
      </div>
    </div>
  )
}
