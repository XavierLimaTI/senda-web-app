import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  // Se logado, redireciona para home personalizada por role
  const session = await getServerSession(authOptions)
  
  if (session?.user) {
    const role = session.user.role
    if (role === 'CLIENT') redirect('/home/client')
    if (role === 'THERAPIST') redirect('/home/therapist')
    if (role === 'SPACE') redirect('/home/space')
    if (role === 'ADMIN') redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0EBE3] via-[#B2B8A3]/10 to-[#F0EBE3]">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute top-20 left-10 w-32 h-32 text-[#B2B8A3]" fill="currentColor" viewBox="0 0 100 100">
            <path d="M50 10 C30 30, 30 70, 50 90 C70 70, 70 30, 50 10" />
          </svg>
          <svg className="absolute bottom-20 right-10 w-40 h-40 text-[#D99A8B]" fill="currentColor" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <svg className="w-10 h-10 text-[#B2B8A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h1 className="text-5xl md:text-6xl font-serif text-gray-900">Senda</h1>
            </div>

            {/* Tagline */}
            <h2 className="text-2xl md:text-4xl font-serif text-gray-800 mb-6 leading-relaxed">
              Seu caminho de <span className="text-[#B2B8A3]">autocuidado</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Bem-estar não é um destino, é uma jornada. Conectamos você a profissionais verificados 
              e espaços acolhedores para trilhar seu caminho de cuidado pessoal.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/explore/therapists"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#B2B8A3] to-[#9da390] 
                           hover:from-[#9da390] hover:to-[#8a9280] text-white font-serif text-lg font-semibold
                           rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                           transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explorar Terapeutas
              </Link>

              <Link
                href="/auth/signup"
                className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#B2B8A3] text-[#B2B8A3] 
                           font-medium rounded-full hover:bg-[#B2B8A3] hover:text-white
                           transition-all duration-200 flex items-center justify-center gap-2"
              >
                Criar Conta
              </Link>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Já tem uma conta?{' '}
              <Link href="/auth/signin" className="text-[#B2B8A3] hover:underline font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-serif text-center text-gray-900 mb-4">
            Como funciona?
          </h3>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Três passos simples para iniciar sua jornada de bem-estar
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#B2B8A3] to-[#9da390] 
                              flex items-center justify-center shadow-lg">
                <span className="text-2xl font-serif text-white">1</span>
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-3">Descubra</h4>
              <p className="text-gray-600 leading-relaxed">
                Explore nosso catálogo de profissionais verificados. Filtre por especialidade, 
                avaliações e localização para encontrar quem ressoa com você.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D99A8B] to-[#c88a7b] 
                              flex items-center justify-center shadow-lg">
                <span className="text-2xl font-serif text-white">2</span>
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-3">Agende</h4>
              <p className="text-gray-600 leading-relaxed">
                Reserve sessões com facilidade. Escolha data e horário que se encaixam 
                na sua rotina. Pagamento seguro e confirmação instantânea.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C8963E] to-[#b8862e] 
                              flex items-center justify-center shadow-lg">
                <span className="text-2xl font-serif text-white">3</span>
              </div>
              <h4 className="text-xl font-serif text-gray-900 mb-3">Evolua</h4>
              <p className="text-gray-600 leading-relaxed">
                Viva sua sessão e acompanhe seu progresso. Avalie sua experiência 
                e continue trilhando seu caminho de autocuidado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
                Profissionais <span className="text-[#C8963E]">verificados</span>
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Todos os terapeutas passam por um rigoroso processo de verificação. 
                Checamos credenciais, formação acadêmica e experiência profissional.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B2B8A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Registro profissional validado (CRP, certificações)</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B2B8A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Avaliações reais de clientes verificados</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#B2B8A3] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Política de cancelamento humanizada</p>
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#B2B8A3] to-[#9da390] 
                              shadow-2xl flex items-center justify-center">
                <svg className="w-32 h-32 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#B2B8A3] to-[#9da390]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">
            Pronto para começar sua jornada?
          </h3>
          <p className="text-lg text-white/90 mb-8">
            Junte-se a centenas de pessoas que escolheram o autocuidado como prioridade.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-10 py-4 bg-white text-[#B2B8A3] font-semibold text-lg
                       rounded-full hover:bg-[#F0EBE3] transition-all duration-200 
                       transform hover:scale-105 shadow-lg"
          >
            Criar Conta Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-white font-serif text-xl mb-4">Senda</h5>
              <p className="text-sm text-gray-400">
                Seu caminho de autocuidado começa aqui.
              </p>
            </div>
            <div>
              <h6 className="text-white font-medium mb-4">Para Clientes</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="/explore/therapists" className="hover:text-white transition-colors">Explorar Terapeutas</Link></li>
                <li><Link href="/auth/signup" className="hover:text-white transition-colors">Criar Conta</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white transition-colors">Entrar</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-medium mb-4">Para Profissionais</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/signup?role=THERAPIST" className="hover:text-white transition-colors">Cadastre-se</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Como funciona</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-medium mb-4">Suporte</h6>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
                <li><Link href="mailto:suporte@senda.app" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            © 2026 Senda. Seu caminho de autocuidado.
          </div>
        </div>
      </footer>
    </div>
  )
}