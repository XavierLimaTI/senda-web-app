'use client'

import { useState, useEffect } from 'react'
import { UploadCloud, CheckCircle, Clock, XCircle, Trash2 } from 'lucide-react'

const DOCUMENT_TYPES = [
  { value: 'CRP', label: 'CRP (Psicólogo)' },
  { value: 'CREFITO', label: 'CREFITO (Fisioterapeuta)' },
  { value: 'CERTIFICATE', label: 'Certificado de Especialização' },
  { value: 'DIPLOMA', label: 'Diploma de Formação' },
  { value: 'CPF_ID', label: 'CPF/ID' },
  { value: 'ADDRESS_PROOF', label: 'Comprovante de Endereço' },
]

type DocumentStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface Document {
  id: number
  type: string
  documentNumber?: string
  status: DocumentStatus
  rejectedReason?: string
  createdAt: string
  reviewedAt?: string
}

interface Stats {
  total: number
  pending: number
  approved: number
  rejected: number
}

export default function TherapistDocumentsClient() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [selectedType, setSelectedType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  // Carregar documentos
  useEffect(() => {
    fetchDocuments()
  }, [])

  async function fetchDocuments() {
    try {
      setLoading(true)
      const response = await fetch('/api/therapist/documents')
      const data = await response.json()

      if (data.success) {
        setDocuments(data.documents)
        setStats(data.stats)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Erro ao carregar documentos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tamanho
    if (file.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande (máximo 5MB)')
      return
    }

    // Validar tipo
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Formato de arquivo inválido. Use PDF, JPEG, PNG ou WebP')
      return
    }

    setSelectedFile(file)
    setError(null)

    // Preview para imagens
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!selectedType) {
      setError('Selecione um tipo de documento')
      return
    }

    if (!selectedFile) {
      setError('Selecione um arquivo')
      return
    }

    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', selectedType)
      if (documentNumber) formData.append('documentNumber', documentNumber)

      const response = await fetch('/api/therapist/documents', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Documento ${selectedType} enviado com sucesso!`)
        // Resetar form
        setSelectedType('')
        setDocumentNumber('')
        setSelectedFile(null)
        setFilePreview(null)
        // Recarregar documentos
        await fetchDocuments()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Erro ao enviar documento')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-50 border-green-200'
      case 'REJECTED':
        return 'bg-red-50 border-red-200'
      case 'PENDING':
        return 'bg-yellow-50 border-yellow-200'
    }
  }

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'PENDING':
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusLabel = (status: DocumentStatus) => {
    switch (status) {
      case 'APPROVED':
        return 'Aprovado'
      case 'REJECTED':
        return 'Rejeitado'
      case 'PENDING':
        return 'Pendente'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Documentos de Verificação</h1>
        <p className="text-gray-600">
          Envie documentos para se tornar um terapeuta verificado no Senda. Documentos aprovados
          aumentam sua credibilidade.
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

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Enviar Novo Documento</h2>

        <div className="space-y-4">
          {/* Tipo de Documento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Documento</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            >
              <option value="">Selecione um tipo...</option>
              {DOCUMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Número do Documento (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número do Documento (opcional)
            </label>
            <input
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="Ex: CRP 06/123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arquivo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#B2B8A3] transition">
              <input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf,image/jpeg,image/png,image/webp"
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer block">
                <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Clique para selecionar ou arraste um arquivo
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPEG, PNG ou WebP (máx. 5MB)</p>
              </label>
              {selectedFile && (
                <p className="text-sm text-green-600 mt-2 font-medium">{selectedFile.name}</p>
              )}
            </div>
          </div>

          {/* Preview da Imagem */}
          {filePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img src={filePreview} alt="Preview" className="max-w-xs rounded-md border border-gray-200" />
            </div>
          )}

          {/* Mensagens */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || !selectedType || !selectedFile}
            className="w-full bg-[#B2B8A3] text-white py-2 rounded-md font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Enviando...' : 'Enviar Documento'}
          </button>
        </div>
      </form>

      {/* Lista de Documentos */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Meus Documentos</h2>
        </div>

        {loading ? (
          <div className="p-6 text-center text-gray-500">Carregando...</div>
        ) : documents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Nenhum documento enviado ainda</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`p-4 border-l-4 ${getStatusColor(doc.status)} flex items-center justify-between`}
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium text-gray-900">{doc.type}</p>
                    {doc.documentNumber && (
                      <p className="text-sm text-gray-600">{doc.documentNumber}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Enviado em {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                    {doc.status === 'REJECTED' && doc.rejectedReason && (
                      <p className="text-sm text-red-700 mt-1">Motivo: {doc.rejectedReason}</p>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  doc.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                  doc.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {getStatusLabel(doc.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
