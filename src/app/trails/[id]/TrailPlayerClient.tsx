'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, Play } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Lesson {
  id: number
  title: string
  content: string
  contentType: string
  mediaUrl: string | null
  order: number
}

interface Trail {
  id: number
  title: string
  description: string
  coverImage: string | null
  category: string
  duration: number
  author: {
    user: { name: string; avatar: string | null }
    specialty: string | null
  } | null
  lessons: Lesson[]
}

interface ClientProgress {
  id: number
  completedLessons: number
  status: string
  startedAt: Date
  completedAt: Date | null
}

interface TrailPlayerClientProps {
  trail: Trail
  clientProgress: ClientProgress | null
  isLoggedIn: boolean
}

export function TrailPlayerClient({
  trail,
  clientProgress,
  isLoggedIn,
}: TrailPlayerClientProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [progress, setProgress] = useState(clientProgress)

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      router.push('/auth/signin')
      return
    }

    setIsEnrolling(true)
    try {
      const res = await fetch('/api/trails/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trailId: trail.id }),
      })

      if (!res.ok) throw new Error('Falha ao enrollar')

      const newProgress = await res.json()
      setProgress(newProgress)
    } catch (error) {
      console.error('Error:', error)
      alert(t('trails.error_general'))
    } finally {
      setIsEnrolling(false)
    }
  }

  const completionPercentage = progress
    ? Math.round((progress.completedLessons / trail.lessons.length) * 100)
    : 0

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 rounded-lg bg-white p-6">
        {trail.coverImage && (
          <img
            src={trail.coverImage}
            alt={trail.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-serif font-bold text-gray-900">
          {trail.title}
        </h1>
        <p className="mt-2 text-gray-600">{trail.description}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>📁 {trail.category}</span>
          <span>⏱️ {trail.duration} {t('trails.days')}</span>
          <span>📚 {trail.lessons.length} {t('trails.lessons')}</span>
        </div>

        {trail.author && (
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-gray-500 mb-2">{t('therapist.created_by')}</p>
            <div className="flex items-center gap-3">
              {trail.author.user.avatar && (
                <img
                  src={trail.author.user.avatar}
                  alt={trail.author.user.name}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {trail.author.user.name}
                </p>
                {trail.author.specialty && (
                  <p className="text-xs text-gray-500">{trail.author.specialty}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex gap-2">
          {!progress ? (
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="flex items-center gap-2 rounded-lg bg-[#B2B8A3] px-6 py-3 text-white hover:bg-opacity-90 disabled:opacity-50"
            >
              <Play size={18} />
              {isEnrolling ? t('trails.starting') : t('trails.start_trail')}
            </button>
          ) : (
            <>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{t('trails.progress')}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#B2B8A3] h-2 rounded-full transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {progress.completedLessons} {t('trails.of')} {trail.lessons.length} {t('trails.lessons')}
                </p>
              </div>
              {progress.status === 'COMPLETED' && (
                <span className="bg-green-100 text-green-800 text-xs px-3 py-2 rounded">
                  {t('trails.completed')}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('trails.lessons_title')}</h2>
        {trail.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-lg border border-gray-200 bg-white"
          >
            <button
              onClick={() =>
                setExpandedLesson(
                  expandedLesson === lesson.id ? null : lesson.id
                )
              }
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {t('trails.lesson_number')} {lesson.order}: {lesson.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {t('trails.content_type')}: {lesson.contentType === 'text' && t('trails.text')}
                  {lesson.contentType === 'audio' && t('trails.audio')}
                  {lesson.contentType === 'video' && t('trails.video')}
                </p>
              </div>
              {expandedLesson === lesson.id ? (
                <ChevronUp className="text-gray-400" />
              ) : (
                <ChevronDown className="text-gray-400" />
              )}
            </button>

            {expandedLesson === lesson.id && (
              <div className="border-t px-6 py-4 bg-gray-50">
                {lesson.contentType === 'text' && (
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {lesson.content}
                  </div>
                )}

                {lesson.contentType === 'audio' && lesson.mediaUrl && (
                  <audio controls className="w-full">
                    <source src={lesson.mediaUrl} type="audio/mpeg" />
                    {t('trails.browser_no_audio')}
                  </audio>
                )}

                {lesson.contentType === 'video' && lesson.mediaUrl && (
                  <div className="aspect-video">
                    <iframe
                      src={lesson.mediaUrl}
                      width="100%"
                      height="100%"
                      allowFullScreen
                      className="rounded"
                    />
                  </div>
                )}

                {progress && (
                  <button
                    onClick={() => {
                      // Update progress
                      const newCompleted = Math.min(
                        progress.completedLessons + 1,
                        trail.lessons.length
                      )
                      fetch(`/api/trails/progress/${progress.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          completedLessons: newCompleted,
                          status:
                            newCompleted === trail.lessons.length
                              ? 'COMPLETED'
                              : 'IN_PROGRESS',
                        }),
                      })
                        .then(() =>
                          setProgress({
                            ...progress,
                            completedLessons: newCompleted,
                          })
                        )
                        .catch(console.error)
                    }}
                    className="mt-4 rounded bg-[#B2B8A3] px-4 py-2 text-white hover:bg-opacity-90"
                  >
                    {t('trails.mark_complete')}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
