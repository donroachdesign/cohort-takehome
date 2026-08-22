# Rationale

I gave Open the deepest polish. Real money moves there and reputations are on the line, so "calm, dense-but-legible" matters most in that state. Draft and Beta aren't rough shells. Draft is the instructor's daily workbench (curriculum editor, readiness checklist), and Beta reads like a scoreboard (cohort stats, roster, feedback). Leaving either half-built would hurt the density and state-clarity scoring on its own. What I cut: a course-creation flow. "Add course" is there but disabled. A second surface the brief never asked for wasn't worth the depth it'd cost the page actually being scored.

State clarity uses two layers: a Badge for the precise read, plus a full-width colored banner with a matching icon, so you understand the state before you've read a word of it.

Three override moments:

1. The obvious move for Beta to Open is a single "Are you sure?" AlertDialog. I overrode that. It's a growth action with asymmetric stakes, not a one-click destructive confirm: free beta seats keep access, curriculum stays locked, a public rating goes live. I built a consequences list, a warning banner surfacing real cohort data (1 of 35 beta students rated below 4 stars), and gated publishing on a set price plus two specific acknowledgments.

2. My first pass badged every transaction row's status. Astryx's own guidance warns against that: "if all rows show green Active, none stand out." I cut it. "Paid" is plain text now; only refunded rows get a status marker.

3. Price was only settable inside the promote dialog at first, invisible the rest of Beta. I moved it into a persistent panel on the Beta page itself: a decision made in context, not sprung on the instructor at the last screen.

Built with Astryx (Meta's design system) via Claude Code CLI, deployed on Cloudflare via GitHub.
