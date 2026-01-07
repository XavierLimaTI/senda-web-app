'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { useToast } from '@/context/ToastContext'

interface ProfileClientProps {
  user: any
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { t } = useLanguage()
  const { showToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.clientProfile?.phone || user.therapistProfile?.phone || user.spaceProfile?.phone || '',
    bio: user.therapistProfile?.bio || user.spaceProfile?.description || '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [docUploads, setDocUploads] = useState<{ name: string; url: string }[]>([])
  const [isDocUploading, setIsDocUploading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo e tamanho
    if (!file.type.startsWith('image/')) {
      showToast(t('profile.selectValidImage'), 'error')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast(t('profile.imageTooLarge'), 'error')
      return
    }

    // Preview local
    const reader = new FileReader()
    reader.onloadend = () => {
      setUploadPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload error')
      }

      const data = await response.json()
      
      // Atualizar sessão com novo avatar
      await update({ avatar: data.url })
      
      showToast(t('profile.photoUpdated'), 'success')
      router.refresh()
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      showToast(t('profile.photoError'), 'error')
      setUploadPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowed = ['application/pdf', 'image/png', 'image/jpeg']
    if (!allowed.includes(file.type)) {
      showToast(t('profile.uploadPdfPngJpg'), 'error')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast(t('profile.imageTooLarge'), 'error')
      return
    }

    setIsDocUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Document upload failed')

      const data = await response.json()
      setDocUploads((prev) => [{ name: file.name, url: data.url }, ...prev])
      showToast(t('profile.docSent'), 'success')
    } catch (error) {
      console.error('Document upload error', error)
      showToast(t('profile.docError'), 'error')
    } finally {
      setIsDocUploading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Profile save error')
      }

      await update({ name: formData.name })
      showToast(t('profile.saved'), 'success')
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error('Save error:', error)
      showToast(t('profile.saveError'), 'error')
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast(t('profile.passwordMismatch'), 'error')
      return
    }

    if (passwordData.newPassword.length < 8) {
      showToast(t('profile.minChars'), 'error')
      return
    }

    try {
      const response = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Password change error')
      }

      showToast(t('profile.passwordChanged'), 'success')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setShowPasswordForm(false)
    } catch (error: any) {
      console.error('Password change error:', error)
      showToast(t('profile.passwordError'), 'error')
    }
  }

  const avatarUrl = uploadPreview
  const initials = user.name?.[0]?.toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <div className="flex items-start gap-8">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-[#C8963E] to-[#B2B8A3] flex items-center justify-center text-white text-4xl font-semibold">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user.name || ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initials
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                  </div>
                )}
              </div>
              
              <label className="mt-4 block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                <span className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {avatarUrl ? t('profile.changePhoto') : t('profile.addPhoto')}
                </span>
              </label>
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-serif text-gray-900">{user.name}</h1>
                  <p className="text-gray-600 mt-1">
                    {user.role === 'CLIENT' && t('profile.roleClient')}
                    {user.role === 'THERAPIST' && t('profile.roleTherapist')}
                    {user.role === 'SPACE' && t('profile.roleSpace')}
                    {user.role === 'ADMIN' && t('profile.roleAdmin')}
                  </p>
                </div>
                
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
                  >
                    {t('profile.edit')}
                  </button>
                )}
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#B2B8A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {user.email}
                </p>
                {formData.phone && (
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#B2B8A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {formData.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">{t('profile.editInfo')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">{t('profile.emailCannotChange')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.phone')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent"
                />
              </div>

              {(user.role === 'THERAPIST' || user.role === 'SPACE') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {user.role === 'THERAPIST' ? t('profile.bioProfessional') : t('profile.description')}
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent"
                    placeholder={user.role === 'THERAPIST' ? t('profile.bioPlaceholder') : t('profile.spacePlaceholder')}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
              >
                {t('profile.saveChanges')}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.clientProfile?.phone || user.therapistProfile?.phone || user.spaceProfile?.phone || '',
                    bio: user.therapistProfile?.bio || user.spaceProfile?.description || '',
                  })
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('profile.cancel')}
              </button>
            </div>
          </div>
        )}

        {/* Documentos para verificação */}
        <div id="docs" className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-serif text-gray-900">{t('profile.docsTitle')}</h2>
              <p className="text-sm text-gray-600">{t('profile.docsSubtitle')}</p>
            </div>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors cursor-pointer text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {isDocUploading ? t('profile.uploading') : t('profile.uploadDoc')}
              <input
                type="file"
                accept=".pdf,image/png,image/jpeg"
                className="hidden"
                onChange={handleDocumentUpload}
                disabled={isDocUploading}
              />
            </label>
          </div>

          {docUploads.length === 0 ? (
            <p className="text-gray-600 text-sm">{t('profile.noDocuments')}</p>
          ) : (
            <div className="space-y-3">
              {docUploads.map((doc, idx) => (
                <div key={`${doc.url}-${idx}`} className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#B2B8A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a2 2 0 011.414.586l4.414 4.414A2 2 0 0119 9.414V18a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <a href={doc.url} target="_blank" className="text-xs text-[#B2B8A3] hover:underline">{t('profile.viewDoc')}</a>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200">{t('profile.docSent')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif text-gray-900">{t('profile.security')}</h2>
            {!showPasswordForm && (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                {t('profile.changePassword')}
              </button>
            )}
          </div>

          {showPasswordForm && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.currentPassword')}</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.newPassword')}</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">{t('profile.minChars')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.confirmNewPassword')}</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleChangePassword}
                  className="px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
                >
                  {t('profile.saveNewPassword')}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordForm(false)
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t('profile.cancel')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
