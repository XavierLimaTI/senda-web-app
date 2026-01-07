import Link from 'next/link'
import Image from 'next/image'

export default function SpaceHome() {
  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white shadow">
            <Image src="/images/senda/logo.png" alt="Senda" fill sizes="56px" className="object-cover" />
          </div>
          <h1 className="text-2xl font-serif text-gray-900">Bem-vindo, Espaço</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/profile" className="bg-white rounded-xl p-6 shadow border border-[#B2B8A3]/20 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-900">Perfil do Espaço</h2>
            <p className="text-sm text-gray-600 mt-2">Atualize informações, endereço e disponibilidade</p>
          </Link>

          <Link href="/explore/therapists" className="bg-white rounded-xl p-6 shadow border border-[#B2B8A3]/20 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-900">Terapeutas</h2>
            <p className="text-sm text-gray-600 mt-2">Descubra terapeutas para integrar ao seu espaço</p>
          </Link>

          <Link href="/explore/therapies" className="bg-white rounded-xl p-6 shadow border border-[#B2B8A3]/20 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-900">Terapias</h2>
            <p className="text-sm text-gray-600 mt-2">Conheça as terapias disponíveis na plataforma</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
