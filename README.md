# Cohort — Course Detail Page

Vantheon design take-home. Instructor-facing course detail page for a fictional course marketplace, built with [Astryx](https://astryx.atmeta.com/) via Claude Code.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3000. The page loads on **Open** (the polished state) — use the "Preview" segmented control in the top-right of the nav to flip between Draft / Beta / Open. From Beta, click **Promote to Open** to see the promotion dialog.

## Structure

- `src/lib/data.ts` — all mock data (single course object, three lifecycle sub-states)
- `src/components/CourseHeader.tsx` — shared breadcrumb/title/state-banner header
- `src/components/DraftView.tsx`, `BetaView.tsx`, `OpenView.tsx` — per-state page composition
- `src/components/PromoteDialog.tsx` — the Beta → Open promotion flow
- `src/components/DevStateSwitcher.tsx` — the dev-only state switcher

See `RATIONALE.md` for the write-up.

## Checks run

- `npx next build` — clean type check + production build
- `node ../astryx/scripts/audit-astryx-compliance.mjs` — clean (no raw hex/px, no hand-rolled layout divs, no non-Astryx components)

## Deploying changes

Live at **https://cohort-takehome.pages.dev** (Cloudflare Pages, connected to this repo's `main` branch). Any push to `main` auto-builds and redeploys — no manual step in Cloudflare needed.

```
npm run dev          # preview locally at localhost:3000 first
npx next build        # sanity check the production build
git add -A
git commit -m "describe the change"
git push               # triggers the Cloudflare build automatically
```

Build settings on Cloudflare (Pages project → Settings, if they ever need re-checking): framework preset **Next.js (Static HTML Export)**, build command `npm run build`, output directory `out`, env var `NODE_VERSION=20`. `npm ci` must pass locally before pushing — Cloudflare uses it for installs, and it fails hard on any `package.json`/`package-lock.json` drift (run `npm ci` locally to catch that before it hits the build log).

### Rolling back

- **Fast/live-only**: Cloudflare dashboard → Deployments tab → find the last good deployment → `...` menu → **Rollback to this deployment**. Instant, but doesn't touch git — the bad commit is still on `main`.
- **Proper fix**: `git revert <bad-commit-hash>` (not `reset --hard` — this repo's already pushed, so revert keeps history intact) → push → Cloudflare redeploys the reverted state automatically.
