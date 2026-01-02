GitHub Actions Secrets for Senda

This repository uses GitHub Actions to run maintenance tasks (e.g. cleanup expired email verification tokens).

Required secret(s)
- CLEANUP_URL: Full URL to the deployed cleanup endpoint, for example:
  https://senda.example.com/api/auth/cleanup-verification

Optional secret(s)
- CLEANUP_BEARER_TOKEN: If you protect the cleanup endpoint, set this token and the workflow will call the endpoint with an `Authorization: Bearer <token>` header.

How to add secrets
1. Go to your GitHub repository page.
2. Click Settings -> Secrets and variables -> Actions.
3. Click "New repository secret" and add the key/value pairs above.

Recommendation for endpoint protection
- Do not expose the cleanup endpoint publicly without any protection.
- The simplest option: require a bearer token and store it in `CLEANUP_BEARER_TOKEN` on GitHub.
- Alternatively, restrict the endpoint to only accept requests from your hosting provider IPs or require a shared HMAC signature.

Once secrets are configured the workflow `Cleanup expired email verification tokens` will run automatically once per day (02:00 UTC) and is also triggerable manually from the Actions tab.
Below are examples to help you protect and invoke the endpoint from CI or a terminal.

Server-side protection example (Next.js App Router `route.ts`):

```ts
// src/app/api/auth/cleanup-verification/route.ts
export async function POST(req: Request) {
  const required = process.env.CLEANUP_BEARER_TOKEN
  if (required) {
    const auth = req.headers.get('authorization') || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
    if (!token || token !== required) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
  }

  // perform cleanup...
}
```

Calling the endpoint from a Unix/Linux/macOS shell (curl):

```bash
curl -H "Authorization: Bearer $CLEANUP_BEARER_TOKEN" -X POST https://your-deploy-url.com/api/auth/cleanup-verification
```

PowerShell note: on Windows PowerShell the `curl` alias maps to `Invoke-WebRequest` which treats `-H` differently. Use one of these alternatives:

Invoke-RestMethod (PowerShell):

```powershell
$headers = @{ Authorization = "Bearer $env:CLEANUP_BEARER_TOKEN" }
Invoke-RestMethod -Uri "https://your-deploy-url.com/api/auth/cleanup-verification" -Method Post -Headers $headers
```

Or call the real `curl` binary explicitly (if installed) using `curl.exe`:

```powershell
curl.exe -H "Authorization: Bearer $env:CLEANUP_BEARER_TOKEN" -X POST https://your-deploy-url.com/api/auth/cleanup-verification
```
