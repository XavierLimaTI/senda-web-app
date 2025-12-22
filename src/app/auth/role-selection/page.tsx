export default function RoleSelection() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow text-center">
        <h1 className="text-2xl font-semibold mb-6">Escolha seu perfil</h1>
        <div className="grid gap-4">
          <a href="/auth/signup?role=CLIENT" className="block border p-4 rounded hover:bg-areia">Cliente</a>
          <a href="/auth/signup?role=THERAPIST" className="block border p-4 rounded hover:bg-areia">Terapeuta</a>
          <a href="/auth/signup?role=SPACE" className="block border p-4 rounded hover:bg-areia">Espaço</a>
        </div>
      </div>
    </div>
  )
}
