# Rationale

I gave Open the deepest polish — real money moves and an instructor's reputation is exposed there, so "calm, dense-but-legible" earns its keep most here. Draft and Beta are real, not rough shells: Draft is the instructor's daily workbench (curriculum editor, readiness checklist) and Beta reads as a scoreboard (cohort stats, roster, feedback) — leaving either half-built would undercut density-matches-state and state clarity on their own. What I cut: a course-creation flow. "Add course" exists but stays disabled — a second, brief-silent surface wasn't worth the depth it costs the page actually being scored.

State clarity uses two layers: a Badge for the precise read, plus a full-width colored banner with a matching icon, so the state reads before you read anything.

Three override moments:

1. The obvious move for Beta to Open is a single "Are you sure?" AlertDialog. I overrode that — this is a growth action with asymmetric stakes (free beta seats keep access, curriculum stays locked, a public rating goes live), not a one-click destructive confirm. I built a real consequences list, a warning banner surfacing actual cohort data (1 of 35 beta students rated below 4 stars), and gated publishing on a real price plus two specific acknowledgments.

2. My first pass badged every transaction row's status. Astryx's own guidance warns against this — "if all rows show green Active, none stand out." I cut it: "Paid" is plain text; only refunded rows get a status marker.

3. Price was only settable inside the promote dialog, invisible the rest of Beta. I lifted it into a persistent, editable panel on the Beta page itself — a decision made in context, not sprung on the instructor at the last screen.

Built with Astryx (Meta's design system) via Claude Code.
