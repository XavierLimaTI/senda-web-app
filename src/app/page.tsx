import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-salvia">
          Bem-vindo ao Senda
        </h1>
        <p className="text-xl text-gray-600">
          Sua jornada de bem-estar começa aqui
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signin" className="bg-salvia text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-center">
            Entrar
          </Link>
          <Link href="/auth/signup" className="border-2 border-salvia text-salvia px-8 py-3 rounded-lg font-semibold hover:bg-salvia hover:text-white transition-all text-center">
            Criar Conta
          </Link>
        </div>
      </div>
    </main>
  )
}