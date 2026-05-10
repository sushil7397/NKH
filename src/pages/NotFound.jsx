import { Link } from 'react-router-dom'
import { Cake } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="section py-24 text-center">
      <Cake className="w-14 h-14 text-gold mx-auto mb-6" />
      <h1 className="font-display text-5xl mb-3">404</h1>
      <p className="text-chocolate-400 max-w-md mx-auto mb-6">
        The page you're looking for doesn't exist — but our cake menu does.
      </p>
      <Link to="/cakes" className="btn-primary">
        Browse cakes
      </Link>
    </div>
  )
}
