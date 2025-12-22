# Senda Web App

Welcome to the Senda Web App! This application is designed to connect clients with therapists and therapeutic spaces, providing a seamless experience for booking and managing wellness journeys.

## Project Structure

The project is organized into the following directories:

- **src/**: Contains the main application code.
  - **app/**: The front-end application code.
    - **components/**: Reusable UI components (buttons, forms, modals).
    - **hooks/**: Custom React hooks for state management and side effects.
    - **layouts/**: Layout components for different pages.
    - **pages/**: Main application pages.
      - **auth/**: Authentication-related pages (login, signup).
      - **client/**: Pages specific to client users.
      - **therapist/**: Pages specific to therapists.
      - **space/**: Pages related to therapeutic spaces.
      - **admin/**: Admin-related pages.
      - **index.tsx**: Main entry point for the application.
    - **styles/**: Global styles and CSS modules.
    - **utils/**: Utility functions for the application.
    - **types/**: TypeScript type definitions and interfaces.
  - **server/**: The back-end application code.
    - **api/**: API route handlers.
      - **auth/**: Authentication-related API requests.
      - **bookings/**: Booking-related API requests.
      - **trails/**: Care trails management.
      - **therapists/**: Therapist management.
      - **spaces/**: Therapeutic spaces management.
      - **payments/**: Payment processing.
      - **admin/**: Admin-related API requests.
    - **db/**: Database-related files.
      - **prisma/**: Prisma schema file for database schema definition.
      - **migrations/**: Migration files for schema changes.
    - **services/**: Business logic and database interaction.
    - **middlewares/**: Middleware functions for request handling.
    - **types/**: Type definitions for the server.
  - **shared/**: Shared resources across the application.
    - **config/**: Configuration files.
    - **constants/**: Constant values used throughout the application.
    - **lib/**: Shared libraries or helper functions.
    - **validation/**: User input validation logic.
- **public/**: Public assets.
  - **favicon.svg**: Favicon for the application.
- **prisma/**: Database schema definition using Prisma.
  - **schema.prisma**: Defines the database schema.
- **package.json**: npm configuration file listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.
- **next.config.js**: Next.js configuration settings.
- **README.md**: Documentation for the project.

## Getting Started

To get started with the Senda Web App, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd senda-web-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Environment variables

The app requires some environment variables for authentication and email sending. Create a `.env` file in the project root with at least:

```
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# SMTP (for email verification)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
FROM_EMAIL="Senda <no-reply@yourdomain.com>"
# Optional: SendGrid (preferred if you have an API key)
SENDGRID_API_KEY=your_sendgrid_api_key
```

After changing the Prisma schema, run:

```
npx prisma migrate dev --name add_email_verification
npx prisma generate

## Cleanup expired verification tokens

You can periodically remove expired email verification tokens by calling the endpoint:

```
POST /api/auth/cleanup-verification
```

Schedule this request with your hosting provider (Vercel Cron, GitHub Actions, cron job) to run e.g. once per day.

Example using `curl` in a cron job:

```bash
curl -X POST https://your-deployment-url.com/api/auth/cleanup-verification
```

## GitHub Actions secrets (example)

Create the following secrets in your repository (Settings → Secrets and variables → Actions):

- `CLEANUP_URL` — e.g. `https://your-deployment-url.com/api/auth/cleanup-verification`
- `CLEANUP_BEARER_TOKEN` (optional) — a bearer token to protect the endpoint; if set the workflow will send an `Authorization: Bearer <token>` header.

See `.github/SECRETS.md` for full instructions.

## Local e2e helper

There's a small local e2e helper that signs up a test user, reads the verification token from the local DB and calls the verify endpoint.

Run the dev server locally, then:

```bash
npm run e2e:local
```

This requires `DATABASE_URL` to point to the same dev DB the app uses.
```

## Contributing

We welcome contributions to the Senda Web App! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.