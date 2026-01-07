'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, Mail, Phone, Calendar, Shield, User, Briefcase, Building2, CheckCircle, Clock } from 'lucide-react'

interface AdminUser {
  id: number
  name: string
  email: string
  phone: string | null
  avatar: string | null
  role: string
  emailVerified: Date | null
  createdAt: Date
  hasClientProfile: boolean
  hasTherapistProfile: boolean
  hasSpaceProfile: boolean
  isVerified: boolean
}

export default function AdminUsersClient({ users }: { users: AdminUser[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = !filterRole || user.role === filterRole

      return matchesSearch && matchesRole
    })
  }, [searchTerm, filterRole, users])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Shield className="w-4 h-4" />
      case 'THERAPIST':
        return <Briefcase className="w-4 h-4" />
      case 'SPACE':
        return <Building2 className="w-4 h-4" />
      case 'CLIENT':
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador'
      case 'THERAPIST':
        return 'Terapeuta'
      case 'SPACE':
        return 'Espaço'
      case 'CLIENT':
        return 'Cliente'
      default:
        return role
    }
  }

  const getRoleBgColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700'
      case 'THERAPIST':
        return 'bg-[#B2B8A3]/20 text-[#B2B8A3]'
      case 'SPACE':
        return 'bg-[#D99A8B]/20 text-[#D99A8B]'
      case 'CLIENT':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const roleCounts = {
    ADMIN: users.filter((u) => u.role === 'ADMIN').length,
    THERAPIST: users.filter((u) => u.role === 'THERAPIST').length,
    SPACE: users.filter((u) => u.role === 'SPACE').length,
    CLIENT: users.filter((u) => u.role === 'CLIENT').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gerenciamento de Usuários
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {users.length} usuários no total
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Clientes', count: roleCounts.CLIENT, color: 'bg-blue-50 border-blue-200' },
            { label: 'Terapeutas', count: roleCounts.THERAPIST, color: 'bg-[#B2B8A3]/10 border-[#B2B8A3]/30' },
            { label: 'Espaços', count: roleCounts.SPACE, color: 'bg-[#D99A8B]/10 border-[#D99A8B]/30' },
            { label: 'Admins', count: roleCounts.ADMIN, color: 'bg-purple-50 border-purple-200' },
          ].map((stat) => (
            <div key={stat.label} className={`p-4 rounded-lg border ${stat.color}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
          </div>

          {/* Filtro por Role */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterRole(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !filterRole
                  ? 'bg-[#B2B8A3] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Todos
            </button>
            {['CLIENT', 'THERAPIST', 'SPACE', 'ADMIN'].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                  filterRole === role
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {getRoleIcon(role)}
                {getRoleLabel(role)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela de Usuários */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Usuário
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Data de Cadastro
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                            {user.avatar ? (
                              <Image
                                src={user.avatar}
                                alt={user.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBgColor(user.role)}`}>
                            {getRoleIcon(user.role)}
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.emailVerified ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600">Email confirmado</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm text-yellow-600">Pendente</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedUser(user)
                          }}
                          className="px-3 py-1 text-sm bg-[#B2B8A3]/20 text-[#B2B8A3] rounded hover:bg-[#B2B8A3]/30 transition-colors"
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal de Detalhes do Usuário */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Detalhes do Usuário</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {selectedUser.avatar ? (
                      <Image
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                        {selectedUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Informações */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nome</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedUser.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </p>
                  <p className="text-gray-900 dark:text-white">{selectedUser.email}</p>
                </div>

                {selectedUser.phone && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Telefone
                    </p>
                    <p className="text-gray-900 dark:text-white">{selectedUser.phone}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tipo</p>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBgColor(selectedUser.role)}`}>
                    {getRoleLabel(selectedUser.role)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Data de Cadastro
                  </p>
                  <p className="text-gray-900 dark:text-white">{formatDate(selectedUser.createdAt)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status de Email</p>
                  <div className="flex items-center gap-2">
                    {selectedUser.emailVerified ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Confirmado</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-yellow-600" />
                        <span className="text-yellow-600">Pendente</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="w-full mt-6 px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9d9f8f] transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
