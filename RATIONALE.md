# Rationale

I polished **Open** — the revenue/enrollment cockpit — over Draft or Beta. It's the state where real money moves and an instructor's reputation is exposed, so "calm, dense-but-legible, obsessive about hierarchy" earns its keep rather than just looking nice. Beta and Draft are structurally complete (same stat-row + table pattern, same lifecycle chrome) but plainer — text-only cells, no side panels.

State clarity uses two layers: a Badge (Draft=neutral, Beta=warning, Open=success) for the precise read, plus a full-width colored banner with a matching icon for the peripheral, "don't have to read it" read the brief asks for.

Three override moments:

1. Astryx's own Badge guidance warns against badging every row the same value — "if all rows show green Active, none stand out." My first pass badged every transaction's status. I cut it: "Paid" is plain text; only the 6 exceptional "Refunded" rows get a status dot via `useTableRowStatus`. The badge now means something.

2. The generic move for Beta→Open is a single AlertDialog — "Are you sure?" I overrode that. AlertDialog is built for one-click destructive confirms; this is a growth action with asymmetric stakes (42 free beta seats keep access, curriculum locks, a 4.6★ rating goes public). I built a custom Dialog instead: a consequences list, a warning banner surfacing the *actual* cohort data (3 of 42 rated below 4 stars), and three specific acknowledgment checkboxes gating the publish button.

3. I drafted a "type $249 to confirm" pattern into that dialog, then cut it. Retyping a number doesn't correlate with comprehension — it's friction theater. Three specific checkboxes plus a data-backed warning already force actual reading.

Built with Astryx (Meta's design system) via Claude Code — component-first, audited clean against Astryx's own compliance script.
