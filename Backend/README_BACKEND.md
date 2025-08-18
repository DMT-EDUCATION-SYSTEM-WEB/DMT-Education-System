# DMT Backend (Fastify + Supabase)

## Prerequisites

- Node.js 18+
- A Supabase project with tables matching `Db_DMT.sql` (converted to PostgreSQL syntax if needed)

## Setup

1. Copy environment

   ```bash
   cd Backend
   cp env.example .env
   ```

   Fill `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, adjust `CORS_ORIGINS`.

2. Install dependencies

   ```bash
   npm install
   ```

3. Run in dev

   ```bash
   npm run dev
   ```

   API at http://localhost:4000

## Endpoints

- GET `/health` → `{ status: 'ok' }`
- GET `/subjects`
- GET `/courses`
- GET `/classes`
- GET `/users` / POST `/users`

## Notes

- Uses `@supabase/supabase-js` with `SERVICE_ROLE_KEY` for secure server-side access.
- Apply your schema to Supabase. If your SQL in `Db_DMT.sql` uses non-Postgres types, convert to Postgres equivalents.
- Consider adding RLS policies in Supabase for client access; backend with service role can bypass when necessary.

## Supabase API reference

- Project API dashboard: [Supabase API docs](https://supabase.com/dashboard/project/rwfndpvmefohepmvonhl/api)
