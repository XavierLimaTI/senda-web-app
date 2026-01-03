'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function NewsListClient({ articleId, articleTitle }: { articleId: number; articleTitle: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Tem certeza que deseja deletar "${articleTitle}"?`)) {
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/news/${articleId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Erro ao deletar')
      }

      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Erro ao deletar artigo')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-600 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
      title="Deletar"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  )
}
