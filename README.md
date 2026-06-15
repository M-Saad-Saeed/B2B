# Custom Logo Sign Landing Page

A production-oriented B2B landing page for `customlogosigns.com`, built with TanStack Start, React 19, Tailwind CSS v4, and Supabase.

The app serves two main purposes:

- Present the Custom Logo Sign product catalog and value proposition.
- Capture quote inquiries, including optional multi-file uploads, and let admins review them in a protected dashboard.

## What This Project Includes

- Public marketing landing page at `/`
- Quote request form with file uploads
- Supabase-backed quote inquiry storage
- Admin sign-in page at `/auth`
- Protected admin dashboard at `/admin`
- Supabase RLS policies for public submissions and admin-only review

## Tech Stack

- `TanStack Start` for routing and app structure
- `React 19` + `TypeScript`
- `Vite` + `Nitro`
- `Tailwind CSS v4`
- `Supabase`
  - Auth
  - Postgres
  - Storage
  - RLS policies
- `Zod` for form validation
- `Lucide React` for icons

## Key Routes

- `/` - public landing page
- `/auth` - admin sign-in
- `/admin` - protected quote inquiry dashboard

The file-based routes live in [src/routes](/Users/saad/Desktop/Mux Tech/LandingPage/final/src/routes).

## Project Structure

```text
src/
  components/
    FAQ.tsx
    Header.tsx
    Logo.tsx
    QuoteForm.tsx
    WhatsAppIcon.tsx
  integrations/supabase/
    client.ts
    client.server.ts
    types.ts
  routes/
    __root.tsx
    index.tsx
    auth.tsx
    _authenticated/
      route.tsx
      admin.tsx
  styles.css

supabase/
  migrations/
  config.toml
```

## How The Quote Flow Works

1. A visitor fills out the quote form on the landing page.
2. Optional files are validated in the browser.
3. Files are uploaded to the Supabase Storage bucket `quote-uploads`.
4. A row is inserted into `public.quote_inquiries`.
5. Admin users can review and update inquiry status from `/admin`.

Current upload rules:

- Up to `5` files
- Max `10 MB` per file
- Max `20 MB` total
- Allowed formats: `jpg`, `jpeg`, `png`, `webp`, `pdf`, `svg`, `ai`, `eps`

If file upload succeeds but database insertion fails, the uploaded files are cleaned up to avoid orphaned storage objects.
Email notifications use the server-only `WEB3FORMS_ACCESS_KEY` environment variable; do not expose this key through `VITE_` variables.

## Supabase Data Model

### `quote_inquiries`

Stores inbound quote requests.

Important fields:

- `full_name`
- `business_name`
- `email`
- `whatsapp_number`
- `country`
- `product_type`
- `size_required`
- `quantity`
- `lighting_option`
- `material_finish`
- `deadline`
- `notes`
- `file_url` - legacy single-file path
- `file_urls` - current multi-file JSON array
- `status` - `New | Contacted | Quoted | Closed`
- `source`
- `created_at`

### `user_roles`

Stores application roles for authenticated users.

Current role enum:

- `admin`

## Security Model

This project uses Supabase Row Level Security.

Public users can:

- Submit quote inquiries
- Upload quote files into the restricted storage path

Authenticated admin users can:

- View all quote inquiries
- Update inquiry status
- Read uploaded quote files

The admin dashboard checks:

- user authentication
- presence of the `admin` role in `public.user_roles`

## Environment Variables

Use [.env.example](/Users/saad/Desktop/Mux Tech/LandingPage/final/.env.example) as the template.

Required client/runtime variables:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Optional or server-only variables:

- `SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_SERVICE_ROLE_KEY`

Notes:

- `src/integrations/supabase/client.ts` uses `VITE_*` values in the browser and falls back to server envs during SSR.
- `src/integrations/supabase/client.server.ts` requires `SUPABASE_SERVICE_ROLE_KEY` and must never be exposed to client code.

## Local Development

### Prerequisites

- `Node.js >= 20`
- npm
- a Supabase project

### Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the env template and fill in real Supabase values:

```bash
cp .env.example .env
```

3. Run the app:

```bash
npm run dev
```

4. Open the local URL shown by Vite.

## Database And Supabase Setup

Apply the SQL migrations in `supabase/migrations` to your Supabase project.

Relevant migrations include:

- [20260608000000_b2b_forms_init.sql](/Users/saad/Desktop/Mux Tech/LandingPage/final/supabase/migrations/20260608000000_b2b_forms_init.sql)
- [20260608010000_quote_files_multifile.sql](/Users/saad/Desktop/Mux Tech/LandingPage/final/supabase/migrations/20260608010000_quote_files_multifile.sql)

These migrations create:

- `inquiry_status` enum
- `app_role` enum
- `quote_inquiries` table
- `user_roles` table
- `quote-uploads` storage bucket
- storage and RLS policies

## Creating An Admin User

There is no admin management UI in this project yet.

To grant admin access:

1. Create or sign in the user in Supabase Auth.
2. Insert a row into `public.user_roles` with:
   - that user’s `auth.users.id`
   - role = `admin`

Example:

```sql
insert into public.user_roles (user_id, role)
values ('YOUR_AUTH_USER_ID', 'admin');
```

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build
- `npm run build:dev` - development-mode build
- `npm run preview` - preview the production build
- `npm run start` - run the built server output
- `npm run lint` - run ESLint
- `npm run format` - run Prettier

## Notes For Future Work

- `file_url` remains for backward compatibility, while `file_urls` is the current multi-file field.
- The admin dashboard currently updates inquiry status client-side through Supabase auth and RLS.
- Some shared UI files still produce `react-refresh/only-export-components` warnings during lint, but the app builds and runs correctly.

## Verification

At the time of this README update:

- `npm run build` passes
- `npm run lint` passes with warnings only
