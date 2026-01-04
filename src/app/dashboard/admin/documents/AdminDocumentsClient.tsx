'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Eye, ChevronDown, Filter } from 'lucide-react'

interface Document {
  id: number
  type: string
  documentNumber?: string
  status: string
  createdAt: string
  therapist: {
    id: number
    user: {
      name: string
      email: string
      avatar?: string
    }
    specialty: string
    city?: string
  }
}

interface Stats {
  total: number
  pending: number
  approved: number
  rejected: number
}

export default function AdminDocumentsClient() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [processing, setProcessing] = useState<number | null>(null)
  const [rejectReason, setRejectReason] = useState<{ [key: number]: string }>({})

  const documentTypes = ['CRP', 'CREFITO', 'CERTIFICATE', 'DIPLOMA', 'CPF_ID', 'ADDRESS_PROOF']

  useEffect(() => {
    fetchDocuments()
  }, [selectedStatus, selectedType, page])

  async function fetchDocuments() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedStatus) params.append('status', selectedStatus)
      if (selectedType) params.append('type', selectedType)
      params.append('page', page.toString())
      params.append('limit', '20')

      const response = await fetch(`/api/admin/documents?${params}`)
      const data = await response.json()

      if (data.success) {
        setDocuments(data.documents)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Erro ao carregar documentos:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(docId: number) {
    try {
      setProcessing(docId)
      const response = await fetch(`/api/admin/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      })

      const data = await response.json()
      if (data.success) {
        fetchDocuments()
        setExpandedId(null)
      }
    } catch (error) {
      console.error('Erro ao aprovar:', error)
    } finally {
      setProcessing(null)
    }
  }

  async function handleReject(docId: number) {
    const reason = rejectReason[docId]?.trim()
    if (!reason) {
      alert('Forneça um motivo para rejeição')
      return
    }

    try {
      setProcessing(docId)
      const response = await fetch(`/api/admin/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason }),
      })

      const data = await response.json()
      if (data.success) {
        fetchDocuments()
        setExpandedId(null)
        setRejectReason({ ...rejectReason, [docId]: '' })
      }
    } catch (error) {
      console.error('Erro ao rejeitar:', error)
    } finally {
      setProcessing(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Verificação de Documentos</h1>
        <p className="text-gray-600">
          Revise e aprove documentos enviados pelos terapeutas
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg border border-yellow-200 p-4">
            <div className="text-sm text-yellow-700">Pendentes</div>
            <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg border border-green-200 p-4">
            <div className="text-sm text-green-700">Aprovados</div>
            <div className="text-2xl font-bold text-green-700">{stats.approved}</div>
          </div>
          <div className="bg-white rounded-lg border border-red-200 p-4">
            <div className="text-sm text-red-700">Rejeitados</div>
            <div className="text-2xl font-bold text-red-700">{stats.rejected}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value)
              setPage(1)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Todos</option>
            <option value="PENDING">Pendentes</option>
            <option value="APPROVED">Aprovados</option>
            <option value="REJECTED">Rejeitados</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value)
              setPage(1)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Todos</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documentos */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Carregando...</div>
        ) : documents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Nenhum documento encontrado</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div key={doc.id} className="hover:bg-gray-50">
                <button
                  onClick={() => setExpandedId(expandedId === doc.id ? null : doc.id)}
                  className="w-full text-left p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <img
                        src={doc.therapist.user.avatar || '/default-avatar.png'}
                        alt={doc.therapist.user.name}
                        className="w-10 h-10 rounded-full bg-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{doc.therapist.user.name}</p>
                        <p className="text-sm text-gray-600">{doc.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(doc.status)}`}>
                      {doc.status === 'PENDING' ? 'Pendente' :
                       doc.status === 'APPROVED' ? 'Aprovado' :
                       'Rejeitado'}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition ${
                        expandedId === doc.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {expandedId === doc.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                    {/* Infos */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Terapeuta</p>
                        <p className="font-medium text-gray-900">{doc.therapist.user.name}</p>
                        <p className="text-sm text-gray-600">{doc.therapist.user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Especialidade</p>
                        <p className="font-medium text-gray-900">{doc.therapist.specialty || '-'}</p>
                        {doc.therapist.city && (
                          <p className="text-sm text-gray-600">{doc.therapist.city}</p>
                        )}
                      </div>
                      {doc.documentNumber && (
                        <div>
                          <p className="text-xs text-gray-600 uppercase tracking-wide">Número</p>
                          <p className="font-medium text-gray-900">{doc.documentNumber}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">Enviado em</p>
                        <p className="font-medium text-gray-900">
                          {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {/* Document Preview */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Documento</p>
                      <a
                        href={`/documents/${doc.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-md text-blue-700 hover:bg-blue-100 transition"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Visualizar</span>
                      </a>
                    </div>

                    {/* Actions */}
                    {doc.status === 'PENDING' && (
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleApprove(doc.id)}
                          disabled={processing === doc.id}
                          className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>{processing === doc.id ? 'Aprovando...' : 'Aprovar'}</span>
                        </button>

                        <div>
                          <textarea
                            value={rejectReason[doc.id] || ''}
                            onChange={(e) => setRejectReason({ ...rejectReason, [doc.id]: e.target.value })}
                            placeholder="Motivo da rejeição (obrigatório)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-20 resize-none"
                          />
                          <button
                            onClick={() => handleReject(doc.id)}
                            disabled={processing === doc.id || !rejectReason[doc.id]?.trim()}
                            className="w-full mt-2 flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>{processing === doc.id ? 'Rejeitando...' : 'Rejeitar'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
