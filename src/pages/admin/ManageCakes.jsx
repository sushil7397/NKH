import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Star } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useData } from '../../context/DataContext.jsx'
import { CATEGORIES } from '../../data/cakes.js'
import Modal from '../../components/Modal.jsx'
import CakePlaceholder from '../../components/CakePlaceholder.jsx'

const empty = {
  title: '',
  category: 'Cakes',
  price: 0,
  description: '',
  eggless: false,
  bestseller: false,
  tint: '#3E2723',
  accent: '#D4AF37',
  image: '',
  weights: [{ size: '0.5 kg', price: 0 }],
}

export default function ManageCakes() {
  const { cakes, addCake, updateCake, deleteCake } = useData()
  const [editing, setEditing] = useState(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = cakes.filter((c) => {
    if (filter !== 'All' && c.category !== filter) return false
    if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const startAdd = () => {
    setEditing(null)
    setOpen(true)
  }

  const startEdit = (cake) => {
    setEditing(cake)
    setOpen(true)
  }

  const handleDelete = (cake) => {
    if (confirm(`Delete "${cake.title}"? This will also remove its reviews.`)) {
      deleteCake(cake.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl mb-1">Cake Manager</h1>
          <p className="text-chocolate-400">Add, edit, and remove cakes from the menu.</p>
        </div>
        <button onClick={startAdd} className="btn-primary">
          <Plus className="w-4 h-4" /> Add new cake
        </button>
      </div>

      <div className="card p-4 flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-chocolate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cakes..."
            className="input pl-9"
          />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input md:w-56">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 text-chocolate-400 uppercase text-xs tracking-widest">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Cake</th>
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-5 py-3 font-medium">Starting price</th>
                <th className="text-left px-5 py-3 font-medium">Weights</th>
                <th className="text-left px-5 py-3 font-medium">Tags</th>
                <th className="text-right px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-chocolate-400">
                    No cakes match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((cake) => (
                  <tr key={cake.id} className="hover:bg-cream-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <CakePlaceholder
                            tint={cake.tint}
                            accent={cake.accent}
                            label={cake.title}
                            className="h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{cake.title}</p>
                          <p className="text-xs text-chocolate-400 truncate max-w-xs">
                            {cake.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="chip bg-chocolate-50 text-chocolate-500">
                        {cake.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-lexend font-semibold text-base tracking-tight">₹{cake.price}</td>
                    <td className="px-5 py-3 text-xs text-chocolate-400">
                      {cake.weights.map((w) => w.size).join(', ')}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {cake.bestseller && (
                          <span className="chip bg-gold text-chocolate text-[10px]">
                            <Star className="w-3 h-3" /> Best
                          </span>
                        )}
                        {cake.eggless && (
                          <span className="chip bg-emerald-100 text-emerald-700 text-[10px]">
                            Eggless
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => startEdit(cake)}
                        className="p-2 rounded-lg hover:bg-chocolate-50 text-chocolate-500"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cake)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CakeFormModal
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
        onSave={(data) => {
          if (editing) updateCake(editing.id, data)
          else addCake(data)
          setOpen(false)
        }}
      />
    </div>
  )
}

function CakeFormModal({ open, onClose, editing, onSave }) {
  const defaultValues = editing || empty
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, values: defaultValues })

  const { fields, append, remove } = useFieldArray({ control, name: 'weights' })

  const watched = watch()

  const submit = (data) => {
    const cleaned = {
      ...data,
      price: Number(data.price),
      weights: data.weights.map((w) => ({ ...w, price: Number(w.price) })),
    }
    onSave(cleaned)
    reset(empty)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? `Edit — ${editing.title}` : 'Add new cake'}
      size="lg"
    >
      <form onSubmit={handleSubmit(submit)} className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="label">Title *</label>
          <input
            {...register('title', { required: 'Required' })}
            className="input"
            placeholder="Classic Chocolate Truffle"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="label">Category *</label>
          <select {...register('category')} className="input">
            {CATEGORIES.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Starting price (₹) *</label>
          <input
            type="number"
            step="1"
            {...register('price', { required: true, valueAsNumber: true, min: 1 })}
            className="input"
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Description *</label>
          <textarea
            rows={3}
            {...register('description', { required: 'Required' })}
            className="input"
            placeholder="Layers of soft sponge, ganache..."
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Weights */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <span className="label !mb-0">Weight options</span>
            <button
              type="button"
              onClick={() => append({ size: '', price: 0 })}
              className="text-xs text-gold hover:underline"
            >
              + Add option
            </button>
          </div>
          <div className="space-y-2">
            {fields.map((f, i) => (
              <div key={f.id} className="flex gap-2 items-start">
                <input
                  {...register(`weights.${i}.size`, { required: true })}
                  placeholder="0.5 kg"
                  className="input flex-1"
                />
                <input
                  type="number"
                  step="1"
                  {...register(`weights.${i}.price`, { required: true, valueAsNumber: true })}
                  placeholder="Price"
                  className="input w-32"
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={fields.length === 1}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Image preview / colors */}
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4 items-start">
          <div className="rounded-xl overflow-hidden aspect-[4/3] border border-chocolate-50">
            <CakePlaceholder
              image={watched.image}
              tint={watched.tint || '#3E2723'}
              accent={watched.accent || '#D4AF37'}
              label={watched.title || 'Preview'}
              className="h-full"
            />
          </div>
          <div className="space-y-3">
            <div>
              <label className="label">Image URL or path</label>
              <input
                {...register('image')}
                className="input"
                placeholder="/images/cakes/truffle-classic.jpg"
              />
              <p className="text-[11px] text-chocolate-400 mt-1">
                Drop photos in <code>public/images/cakes/</code> and reference them here.
                Leave blank to use the styled SVG placeholder.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs">Base</label>
              <input type="color" {...register('tint')} className="h-9 w-14 rounded" />
              <label className="text-xs ml-2">Accent</label>
              <input type="color" {...register('accent')} className="h-9 w-14 rounded" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register('eggless')} className="accent-gold" />
              Eggless
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register('bestseller')} className="accent-gold" />
              Mark as bestseller
            </label>
          </div>
        </div>

        <div className="md:col-span-2 flex gap-3 justify-end pt-2 border-t border-chocolate-50">
          <button type="button" onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {editing ? 'Save changes' : 'Add cake'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
