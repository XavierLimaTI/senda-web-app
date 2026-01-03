'use client'

import { useState } from 'react'
import Image from 'next/image'
import { therapies, categories } from '@/data/therapies'
import { ChevronDown, Star } from 'lucide-react'

type Language = 'pt' | 'en' | 'es' | 'zh'

export default function TherapiesPage() {
  const [language, setLanguage] = useState<Language>('pt')
  const [selectedCategory, setSelectedCategory] = useState<string>('body')
  const [selectedIndicationTag, setSelectedIndicationTag] = useState<string | null>(null)
  const [expandedTherapy, setExpandedTherapy] = useState<string | null>(null)

  // Filtrar terapias por categoria e indicação
  const filteredTherapies = therapies.filter(therapy => {
    const matchesCategory = therapy.category === selectedCategory
    const matchesIndicationTag = !selectedIndicationTag || therapy.indicationTags.includes(selectedIndicationTag)
    return matchesCategory && matchesIndicationTag
  })

  // Obter tags únicas de indicação da categoria selecionada
  const availableTags = Array.from(
    new Set(
      therapies
        .filter(t => t.category === selectedCategory)
        .flatMap(t => t.indicationTags)
    )
  ).sort()

  const labels = {
    pt: {
      title: 'Explorar Terapias',
      subtitle: 'Descubra as melhores práticas terapêuticas para sua jornada de bem-estar',
      filterByCategory: 'Filtrar por Categoria',
      filterByIndication: 'Filtrar por Indicação Terapêutica',
      indications: 'Indicações',
      contraindications: 'Contra-indicações',
      modality: 'Modalidade',
      presencial: 'Presencial',
      online: 'Online',
      presencialOnline: 'Presencial/Online',
      findTherapist: 'Encontrar Terapeuta',
      clearFilters: 'Limpar Filtros',
      noResults: 'Nenhuma terapia encontrada com esses filtros.'
    },
    en: {
      title: 'Explore Therapies',
      subtitle: 'Discover the best therapeutic practices for your wellness journey',
      filterByCategory: 'Filter by Category',
      filterByIndication: 'Filter by Therapeutic Indication',
      indications: 'Indications',
      contraindications: 'Contraindications',
      modality: 'Modality',
      presencial: 'In-person',
      online: 'Online',
      presencialOnline: 'In-person/Online',
      findTherapist: 'Find Therapist',
      clearFilters: 'Clear Filters',
      noResults: 'No therapies found with these filters.'
    },
    es: {
      title: 'Explorar Terapias',
      subtitle: 'Descubra las mejores prácticas terapéuticas para su viaje de bienestar',
      filterByCategory: 'Filtrar por Categoría',
      filterByIndication: 'Filtrar por Indicación Terapéutica',
      indications: 'Indicaciones',
      contraindications: 'Contraindicaciones',
      modality: 'Modalidad',
      presencial: 'Presencial',
      online: 'En línea',
      presencialOnline: 'Presencial/En línea',
      findTherapist: 'Encontrar Terapeuta',
      clearFilters: 'Limpiar Filtros',
      noResults: 'No se encontraron terapias con estos filtros.'
    },
    zh: {
      title: '探索疗法',
      subtitle: '为您的健康之旅发现最佳治疗实践',
      filterByCategory: '按类别筛选',
      filterByIndication: '按治疗指示筛选',
      indications: '指示',
      contraindications: '禁忌',
      modality: '方式',
      presencial: '当面',
      online: '在线',
      presencialOnline: '当面/在线',
      findTherapist: '查找治疗师',
      clearFilters: '清除过滤器',
      noResults: '未找到符合这些过滤器的疗法。'
    }
  }

  const t = labels[language]

  const getModalityLabel = (modality: string) => {
    const map = {
      presencial: t.presencial,
      online: t.online,
      presencial_online: t.presencialOnline
    }
    return map[modality as keyof typeof map] || modality
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t.subtitle}
          </p>

          {/* Language Selector */}
          <div className="flex justify-center gap-2 mb-8">
            {(['pt', 'en', 'es', 'zh'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === lang
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {lang === 'pt' && '🇧🇷 PT'}
                {lang === 'en' && '🇺🇸 EN'}
                {lang === 'es' && '🇪🇸 ES'}
                {lang === 'zh' && '🇨🇳 ZH'}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {t.filterByCategory}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedIndicationTag(null)
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all text-center ${
                    selectedCategory === category.id
                      ? 'bg-[#B2B8A3] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Indication Tag Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {t.filterByIndication}
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedIndicationTag && (
                <button
                  onClick={() => setSelectedIndicationTag(null)}
                  className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  {selectedIndicationTag} ✕
                </button>
              )}
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedIndicationTag(selectedIndicationTag === tag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedIndicationTag === tag
                      ? 'bg-[#D99A8B] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Therapies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapies.map(therapy => (
            <div
              key={therapy.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={therapy.image}
                  alt={therapy.name[language]}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                  {therapy.name[language]}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {therapy.description[language]}
                </p>

                {/* Modality Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#C8963E] text-white">
                    {getModalityLabel(therapy.modality)}
                  </span>
                </div>

                {/* Expandable Details */}
                <button
                  onClick={() => setExpandedTherapy(expandedTherapy === therapy.id ? null : therapy.id)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#F0EBE3] dark:bg-gray-700 hover:bg-[#E5DED5] dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {expandedTherapy === therapy.id ? 'Menos info' : 'Mais info'}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform text-gray-900 dark:text-white ${
                      expandedTherapy === therapy.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedTherapy === therapy.id && (
                  <div className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Star size={16} className="text-[#D99A8B]" />
                        {t.indications}
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {therapy.indications[language].map((indication, idx) => (
                          <li key={idx}>{indication}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {t.contraindications}
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {therapy.contraindications[language].map((contra, idx) => (
                          <li key={idx}>{contra}</li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 rounded-lg bg-[#B2B8A3] text-white font-medium hover:bg-[#A0A78F] transition-colors">
                      {t.findTherapist}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTherapies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {t.noResults}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('body')
                setSelectedIndicationTag(null)
              }}
              className="px-6 py-2 rounded-lg bg-[#B2B8A3] text-white font-medium hover:bg-[#A0A78F] transition-colors"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
