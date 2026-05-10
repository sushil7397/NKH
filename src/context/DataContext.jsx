import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { seedCakes, seedReviews, seedEnquiries } from '../data/cakes.js'

const DataContext = createContext(null)
// Bump the version suffix whenever the seed catalog changes shape so that
// returning visitors with stale localStorage data automatically pick up the
// new menu instead of the old one.
const STORAGE_VERSION = 'v15'
const KEYS = {
  cakes: `nkh_cakes_${STORAGE_VERSION}`,
  reviews: `nkh_reviews_${STORAGE_VERSION}`,
  enquiries: `nkh_enquiries_${STORAGE_VERSION}`,
}

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* noop */
  }
}

const newId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

export function DataProvider({ children }) {
  const [cakes, setCakes] = useState(() => load(KEYS.cakes, seedCakes))
  const [reviews, setReviews] = useState(() => load(KEYS.reviews, seedReviews))
  const [enquiries, setEnquiries] = useState(() => load(KEYS.enquiries, seedEnquiries))

  useEffect(() => save(KEYS.cakes, cakes), [cakes])
  useEffect(() => save(KEYS.reviews, reviews), [reviews])
  useEffect(() => save(KEYS.enquiries, enquiries), [enquiries])

  const addCake = useCallback((cake) => {
    setCakes((prev) => [{ ...cake, id: cake.id || newId('cake') }, ...prev])
  }, [])

  const updateCake = useCallback((id, patch) => {
    setCakes((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }, [])

  const deleteCake = useCallback((id) => {
    setCakes((prev) => prev.filter((c) => c.id !== id))
    setReviews((prev) => prev.filter((r) => r.cakeId !== id))
  }, [])

  const addReview = useCallback((review) => {
    setReviews((prev) => [
      {
        ...review,
        id: newId('rev'),
        approved: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }, [])

  const toggleReview = useCallback((id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r)),
    )
  }, [])

  const deleteReview = useCallback((id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const addEnquiry = useCallback((enquiry) => {
    setEnquiries((prev) => [
      {
        ...enquiry,
        id: newId('enq'),
        createdAt: new Date().toISOString(),
        status: 'new',
      },
      ...prev,
    ])
  }, [])

  const updateEnquiryStatus = useCallback((id, status) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)))
  }, [])

  const resetDemoData = useCallback(() => {
    setCakes(seedCakes)
    setReviews(seedReviews)
    setEnquiries(seedEnquiries)
  }, [])

  const value = useMemo(
    () => ({
      cakes,
      reviews,
      enquiries,
      addCake,
      updateCake,
      deleteCake,
      addReview,
      toggleReview,
      deleteReview,
      addEnquiry,
      updateEnquiryStatus,
      resetDemoData,
    }),
    [
      cakes,
      reviews,
      enquiries,
      addCake,
      updateCake,
      deleteCake,
      addReview,
      toggleReview,
      deleteReview,
      addEnquiry,
      updateEnquiryStatus,
      resetDemoData,
    ],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
