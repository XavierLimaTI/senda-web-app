/**
 * Test script for /api/auth/cleanup-verification
 * Usage:
 *   node scripts/test-cleanup-endpoint.js --url=https://your-deploy-url.com/api/auth/cleanup-verification --token=yourtoken
 * If --token is provided the script will test both unauthenticated and authenticated calls.
 */
// simple native arg parsing to avoid external deps
function parseArgs(argv) {
  const out = {}
  for (const raw of argv) {
    const s = raw.replace(/^--/, '')
    const [k, ...rest] = s.split('=')
    out[k] = rest.length ? rest.join('=') : true
  }
  return out
}

const args = parseArgs(process.argv.slice(2))
const url = args.url === true ? undefined : args.url
const token = args.token === true ? undefined : args.token
const baseUrl = url || process.env.CLEANUP_URL || 'http://localhost:3000/api/auth/cleanup-verification'
const bearer = token || process.env.CLEANUP_BEARER_TOKEN || ''

async function call(opts = {}) {
  const headers = opts.auth ? { Authorization: `Bearer ${opts.token}` } : {}
  try {
    const res = await fetch(baseUrl, { method: 'POST', headers })
    const text = await res.text()
    console.log(`-> ${opts.auth ? 'AUTH' : 'NO-AUTH'} status=${res.status}`)
    console.log(text)
  } catch (err) {
    console.error('request failed', err)
  }
}

(async function main(){
  console.log('Testing cleanup endpoint:', baseUrl)
  console.log('\n1) Call without Authorization header')
  await call({ auth: false })

  if (bearer) {
    console.log('\n2) Call with Authorization header')
    await call({ auth: true, token: bearer })
  } else {
    console.log('\nNo token provided — skipping authenticated call. Provide --token or set CLEANUP_BEARER_TOKEN env var to test.')
  }
})()
