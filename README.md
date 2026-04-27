# app-template

Source-of-truth template for new apps under `madewaylabs.com`. Every new app is bootstrapped from this repo via `gh repo create --template`.

## What's in here

A minimal hello-world that proves the entire infrastructure stack works. Three routes:

- `/` — public landing page
- `/sign-in`, `/sign-up` — Clerk hosted UI
- `/app` — protected route reading from Convex (proves Clerk → Convex sync via webhook)

When all three render correctly after a fresh bootstrap, the infra is healthy and feature work can begin.

## Bootstrapping a new app

Run the app-factory bootstrap script:

```bash
./scripts/bootstrap.sh
```

The script handles repo creation, Convex + Vercel + Cloudflare wiring, and pauses for the manual Clerk steps. ~10 minutes per app.

## Local development of the template itself

```bash
npm install
cp .env.example .env.local   # fill in
npm run dev                  # frontend
npx convex dev               # backend (separate terminal)
```

## Updating the template

Templates don't auto-propagate. Existing apps stay on the version they were bootstrapped from. For big changes, branch-replace inside the affected app; for small fixes, cherry-pick or just live with it.
