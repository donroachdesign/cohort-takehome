# Rationale

I brought all three states to a comparable finish rather than picking one and roughing the others, since each earns its density differently: Open needs revenue and enrollment rigor because real money is visible; Draft is the instructor's daily workbench, so its curriculum editor and readiness checklist carry real editing surface area; Beta stayed the leanest by design — its job is just surfacing accumulating cohort data before the real decision point. What I cut: a course-creation flow. "Add course" is present but disabled — building it meant a second, brief-silent surface at the cost of depth on the page actually being scored.

Three override moments:

1. The obvious move for Beta to Open is a single "Are you sure?" AlertDialog. I overrode that — this is a growth action with asymmetric stakes (free beta seats keep access, curriculum stays locked, a public rating goes live), not a one-click destructive confirm. I built a real consequences list, a warning banner surfacing actual cohort data (1 of 35 beta students rated below 4 stars), and gated publishing on a real price plus two specific acknowledgments.

2. My first pass badged every transaction row's status. Astryx's own guidance warns against this — "if all rows show green Active, none stand out." I cut it: "Paid" is plain text; only refunded rows get a status marker.

3. Price was only ever settable inside the promote dialog — invisible for the rest of Beta. I lifted it into a persistent, editable panel on the Beta page itself, so it's a decision made in context, not sprung on the instructor at the last screen.

Built with Astryx (Meta's design system) via Claude Code.
