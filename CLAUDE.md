# __APP_NAME__

Bootstrapped from [siyoo7/app-template](https://github.com/siyoo7/app-template).

## Stack
- **Frontend:** Vite + React 19 + React Router + Tailwind v4
- **Auth:** Clerk (hosted UI components, JWT-bridged into Convex)
- **Backend / DB:** Convex (TypeScript end-to-end, webhooks, schedulers)
- **Hosting:** Vercel (prod = `main`, preview = branches)

## Local dev

```bash
npm run dev          # Vite frontend
npx convex dev       # Convex backend (separate terminal)
```

Set `VITE_BYPASS_AUTH=true` in `.env.local` to skip Clerk during local UI work — the app renders with a mock user. **Never** set this in production.

## Schema

Lives in `convex/schema.ts`. New tables go there with at least one index. Run `npx convex dev` after editing — types are regenerated into `convex/_generated/`.

## Auth

Wrap any protected page in `<ProtectedRoute>` (see `src/App.jsx`). Server-side, Convex queries/mutations get the Clerk user identity via `ctx.auth.getUserIdentity()` once `convex/auth.config.js` is wired (already done).

## Stripe

Wired but inert. To activate, follow the app-factory `references/04-stripe-integration.md`.
