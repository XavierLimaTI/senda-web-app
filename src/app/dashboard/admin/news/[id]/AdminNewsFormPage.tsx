'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, X, Eye, EyeOff } from 'lucide-react'

interface Article {
  id: number
  title: string
  slug: string
  description: string
  content: string
  thumbnail: string | null
  published: boolean
  featured: boolean
  publishedAt: Date | null
}

export default function AdminNewsFormPage({ article }: { article?: Article }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    description: article?.description || '',
    content: article?.content || '',
    thumbnail: article?.thumbnail || '',
    published: article?.published || false,
    featured: article?.featured || false,
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
  }

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: generateSlug(value),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = article ? `/api/admin/news/${article.id}` : '/api/admin/news'
      const method = article ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Erro ao salvar artigo')
      }

      router.push('/dashboard/admin/news')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Erro ao salvar artigo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {article ? 'Editar Artigo' : 'Novo Artigo'}
          </h1>
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Título */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título do artigo"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
          </div>

          {/* Slug */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              URL Amigável (Slug) *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">/noticia/</span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })
                }
                placeholder="novo-artigo"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Descrição (Resumo) *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Resumo breve do artigo (aparece na listagem)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
          </div>

          {/* Conteúdo */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Conteúdo *
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Conteúdo completo do artigo (aceita HTML)"
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3] font-mono text-sm"
            />
          </div>

          {/* Thumbnail URL */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              URL da Imagem de Capa
            </label>
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
            {formData.thumbnail && (
              <div className="mt-4 rounded-lg overflow-hidden max-w-xs">
                <img
                  src={formData.thumbnail}
                  alt="Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>

          {/* Opções */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Publicado */}
            <div className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="published" className="flex items-center gap-2 cursor-pointer">
                {formData.published ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  {formData.published ? 'Publicado' : 'Rascunho'}
                </span>
              </label>
            </div>

            {/* Destaque */}
            <div className="flex items-center gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="featured" className="cursor-pointer">
                <span className="font-medium text-gray-900 dark:text-white">
                  {formData.featured ? '⭐ Destacado' : 'Marcar como destaque'}
                </span>
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9d9f8f] disabled:opacity-50 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Salvando...' : 'Salvar Artigo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
