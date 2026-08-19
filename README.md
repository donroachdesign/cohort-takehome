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
