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
