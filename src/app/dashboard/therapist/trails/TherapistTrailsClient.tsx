'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, BookOpen, Users, Clock } from 'lucide-react'

interface Trail {
  id: number
  title: string
  description: string
  category: string
  duration: number
  published: boolean
  createdAt: Date
  lessons: { id: number }[]
  _count: { progress: number }
}

interface TherapistTrailsClientProps {
  initialTrails: Trail[]
  therapistId: number
}

export function TherapistTrailsClient({
  initialTrails,
  therapistId,
}: TherapistTrailsClientProps) {
  const [trails, setTrails] = useState<Trail[]>(initialTrails)
  const [isCreating, setIsCreating] = useState(false)
  const [newTrail, setNewTrail] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
  })

  const handleCreateTrail = async () => {
    if (!newTrail.title || !newTrail.category || !newTrail.duration) {
      alert('Preencha os campos obrigatórios')
      return
    }

    try {
      const res = await fetch('/api/trails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrail),
      })

      if (!res.ok) throw new Error('Falha ao criar trilha')

      const trail = await res.json()
      setTrails([trail, ...trails])
      setNewTrail({ title: '', description: '', category: '', duration: '' })
      setIsCreating(false)
    } catch (error) {
      console.error('Error:', error)
      alert('Erro ao criar trilha')
    }
  }

  const handleDeleteTrail = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta trilha?')) return

    try {
      const res = await fetch(`/api/trails/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Falha ao deletar')
      setTrails(trails.filter((t) => t.id !== id))
    } catch (error) {
      console.error('Error:', error)
      alert('Erro ao deletar trilha')
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#2C3E2D]">
            Minhas Trilhas de Cuidado
          </h1>
          <p className="mt-2 text-[#666666]">
            Crie jornadas guiadas para seus clientes
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-2 rounded-lg bg-[#B2B8A3] px-4 py-2 text-white hover:bg-opacity-90"
        >
          <Plus size={20} />
          Nova Trilha
        </button>
      </div>

      {/* Create Trail Form */}
      {isCreating && (
        <div className="mb-8 rounded-lg border border-[#B2B8A3]/30 bg-[#F0EBE3] p-6">
          <h2 className="mb-4 text-xl font-semibold text-[#2C3E2D]">
            Criar Nova Trilha
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título da trilha"
              value={newTrail.title}
              onChange={(e) =>
                setNewTrail({ ...newTrail, title: e.target.value })
              }
              className="w-full rounded border border-[#B2B8A3] bg-white px-3 py-2 focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            />
            <textarea
              placeholder="Descrição"
              value={newTrail.description}
              onChange={(e) =>
                setNewTrail({ ...newTrail, description: e.target.value })
              }
              className="w-full rounded border border-[#B2B8A3] bg-white px-3 py-2 focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
              rows={3}
            />
            <input
              type="text"
              placeholder="Categoria (ex: Mindfulness, Yoga)"
              value={newTrail.category}
              onChange={(e) =>
                setNewTrail({ ...newTrail, category: e.target.value })
              }
              className="w-full rounded border border-[#B2B8A3] bg-white px-3 py-2 focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            />
            <input
              type="number"
              placeholder="Duração em dias"
              value={newTrail.duration}
              onChange={(e) =>
                setNewTrail({ ...newTrail, duration: e.target.value })
              }
              className="w-full rounded border border-[#B2B8A3] bg-white px-3 py-2 focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateTrail}
                className="rounded bg-[#B2B8A3] px-4 py-2 text-white hover:bg-opacity-90"
              >
                Criar
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="rounded border border-[#B2B8A3]/50 px-4 py-2 hover:bg-[#F0EBE3] text-[#2C3E2D]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trails List */}
      {trails.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#B2B8A3]/40 bg-[#F0EBE3] p-12 text-center">
          <p className="text-[#666666]">
            Você ainda não criou nenhuma trilha. Comece criando uma!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trails.map((trail) => (
            <div
              key={trail.id}
              className="rounded-lg border border-[#B2B8A3]/20 bg-[#FFFBF7] p-4 hover:border-[#B2B8A3]/50 transition"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#2C3E2D]">
                    {trail.title}
                  </h3>
                  <p className="text-sm text-[#8B8B8B]">{trail.category}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    trail.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {trail.published ? 'Publicada' : 'Rascunho'}
                </span>
              </div>

              <p className="mb-3 text-sm text-[#555555]">{trail.description}</p>

              <div className="mb-4 text-xs text-[#777777] space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-[#B2B8A3]" />
                  <span>{trail.lessons.length} lições</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#B2B8A3]" />
                  <span>{trail._count.progress} clientes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#B2B8A3]" />
                  <span>{trail.duration} dias</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/therapist/trails/${trail.id}/edit`}
                  className="flex items-center gap-1 rounded bg-[#F0EBE3] px-2 py-1 text-xs hover:bg-[#E8DFD3] text-[#2C3E2D]"
                >
                  <Edit2 size={14} />
                  Editar
                </Link>
                <button
                  onClick={() => handleDeleteTrail(trail.id)}
                  className="flex items-center gap-1 rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
                >
                  <Trash2 size={14} />
                  Deletar
                </button>
                <Link
                  href={`/trails/${trail.id}`}
                  className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200"
                >
                  <Eye size={14} />
                  Visualizar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
