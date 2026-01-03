// Executa expiração de bookings PENDING com mais de 10 minutos
// Uso: node scripts/expire-pending-bookings.js --url=http://localhost:3000/api/bookings/expire --token=SEU_TOKEN

const fetch = require('node-fetch')

async function main() {
  const urlArg = process.argv.find((arg) => arg.startsWith('--url='))
  const tokenArg = process.argv.find((arg) => arg.startsWith('--token='))

  const url = urlArg ? urlArg.replace('--url=', '') : 'http://localhost:3000/api/bookings/expire'
  const token = tokenArg ? tokenArg.replace('--token=', '') : process.env.CLEANUP_BEARER_TOKEN

  if (!token) {
    console.error('❌ Token não informado. Passe --token= ou defina CLEANUP_BEARER_TOKEN')
    process.exit(1)
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    if (!res.ok) {
      console.error('❌ Erro na requisição:', data)
      process.exit(1)
    }

    console.log('✅ Execução concluída:', data)
  } catch (err) {
    console.error('❌ Falha ao chamar endpoint:', err)
    process.exit(1)
  }
}

main()
