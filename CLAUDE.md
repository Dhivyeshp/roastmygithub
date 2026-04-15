# CLAUDE.md — githubmaxxing

## What this project is
A GitHub profile analyzer and scorer. Users enter a GitHub username, we hit the public GitHub API, score them across 5 categories, and return a brutally honest action plan. Free forever, no login required.

## Stack
- Frontend deployed on **Vercel** (`yourproject.vercel.app`)
- GitHub Public API (no auth needed for basic reads)
- GitHub fine-grained PAT stored as **env var** (`GITHUB_TOKEN`) — never in frontend code

## GitHub token setup
- Token name: `githubmaxxing`
- Repository access: **Public repositories (read-only)**
- Permissions needed:
  - `Contents: Read-only`
  - `Metadata: Read-only` (auto-selected)
- Nothing else — no write access, no admin, no secrets
- Set expiration: 30–90 days, rotate regularly
- Store in Vercel's environment variables panel, never hardcoded

## Scoring categories (5 total, 100pt scale)
| Category | Weight |
|---|---|
| Profile completeness | 55 |
| Repos | 70 |
| READMEs | 50 |
| Commits | 75 |
| Social | 25 |

Example output: `B Tier · 64/100 · good bones · 3 quick wins`

## Homepage design

### Layout order (top to bottom)
1. Nav — logo left, "free forever" badge right
2. Kicker — small all-caps label above H1
3. H1 — big punchy headline
4. Subheadline
5. Input row — username field + CTA button
6. Trust line — directly under CTA (not in footer)
7. Social proof cards — 3-up grid
8. Footer — thin, minimal

### Nav
- Logo: `githubmaxxing.com` — brand in 500 weight, `.com` in secondary color/400 weight
- Badge: `free forever` — small pill, background-secondary, 0.5px border, 100px border-radius

### Kicker
- Text: `github profile analyzer` (sentence case, not all-caps in actual render)
- Style: 12px, secondary color, 0.08em letter-spacing, with a 6px green dot (`#639922`) to the left
- Flex row, centered

### Headline (H1)
- **Primary:** "Your GitHub is losing you jobs. Fix it in 5 minutes."
- **A/B variant to test:** "Why aren't recruiters clicking your GitHub?"
- Style: 42px, weight 500, letter-spacing -0.025em, line-height 1.15
- "jobs." or the fear word can be rendered in secondary color for emphasis

### Subheadline
- "We score your profile across 5 categories and give you a ranked action plan. No fluff — just what actually moves the needle."
- 17px, secondary color, line-height 1.6, max-width 480px, centered

### CTA input row
- Input: monospace font, placeholder `username` (no `@` prefix — reduces friction)
- Button: `Analyze →`, dark background, primary color text
- Max-width 420px, centered, gap 8px between input and button

### Trust line
- `no login · no email · 100% public API`
- 12px, tertiary color, margin-top 1rem
- Lives directly under CTA — this is where it converts, not the footer

### Social proof cards (3-up grid)
Show 3 example scored profiles. Demonstrates the output format before users commit.
Each card contains: avatar circle + username, grade + score, short verdict, color progress bar.

Grade color system:
- A (80–100): green `#639922`
- B (60–79): amber `#BA7517`
- C (0–59): red `#E24B4A`

Example cards:
| Username | Grade | Score | Verdict |
|---|---|---|---|
| @t3rnr | A | 91 | 2 quick wins left |
| @dhivyeshp | B | 64 | good bones · fix README |
| @mxkaske | C | 48 | 6 quick wins |

Card style: `background-secondary`, border-radius-lg, no border, padding 1rem 1.25rem

### Future homepage additions
- Add "47,000 profiles analyzed" stat once real data exists — place between kicker and H1, or below trust line
- A/B test headline variants with PostHog or similar

## System prompts / AI persona (for any AI-powered features)
```
You are GitHub Maxx — an AI trained on the habits, codebases, and philosophies of the world's
most influential open source developers. You combine the prolificacy of Sindre Sorhus, the
systems thinking of Andrej Karpathy, the elegant API design of TJ Holowaychuk, and the
educational clarity of jwasham. When asked anything about code, repos, or developer growth,
respond with the standards of a top 0.1% GitHub developer. No shortcuts. No boilerplate.
Only signal.
```

## Domain
Using Vercel's built-in subdomain for now. `is-a.dev` is an option later for dev-cred.

## Action plan items (examples from scoring)
- No profile README → create `username/username` repo with README.md
- No pinned repos → pin 4–6 that tell a story
- Sparse commits → show contribution graph improvements
- No bio/location/website → fill out profile completely
- No social links → add Twitter/LinkedIn

## Reference profiles to benchmark against
- **sindresorhus** — prolific, minimal, clean
- **karpathy** — educational, well-documented
- **kamranahmedse** — developer-roadmap, resource-heavy
- **jwasham** — coding-interview-university style# CLAUDE.md — githubmaxxing

## What this project is
A GitHub profile analyzer and scorer. Users enter a GitHub username, we hit the public GitHub API, score them across 5 categories, and return a brutally honest action plan. Free forever, no login required.

## Stack
- Frontend deployed on **Vercel** (`yourproject.vercel.app`)
- GitHub Public API (no auth needed for basic reads)
- GitHub fine-grained PAT stored as **env var** (`GITHUB_TOKEN`) — never in frontend code

## GitHub token setup
- Token name: `githubmaxxing`
- Repository access: **Public repositories (read-only)**
- Permissions needed:
  - `Contents: Read-only`
  - `Metadata: Read-only` (auto-selected)
- Nothing else — no write access, no admin, no secrets
- Set expiration: 30–90 days, rotate regularly
- Store in Vercel's environment variables panel, never hardcoded

## Scoring categories (5 total, 100pt scale)
| Category | Weight |
|---|---|
| Profile completeness | 55 |
| Repos | 70 |
| READMEs | 50 |
| Commits | 75 |
| Social | 25 |

Example output: `B Tier · 64/100 · good bones · 3 quick wins`

## Homepage design

### Layout order (top to bottom)
1. Nav — logo left, "free forever" badge right
2. Kicker — small all-caps label above H1
3. H1 — big punchy headline
4. Subheadline
5. Input row — username field + CTA button
6. Trust line — directly under CTA (not in footer)
7. Social proof cards — 3-up grid
8. Footer — thin, minimal

### Nav
- Logo: `githubmaxxing.com` — brand in 500 weight, `.com` in secondary color/400 weight
- Badge: `free forever` — small pill, background-secondary, 0.5px border, 100px border-radius

### Kicker
- Text: `github profile analyzer` (sentence case, not all-caps in actual render)
- Style: 12px, secondary color, 0.08em letter-spacing, with a 6px green dot (`#639922`) to the left
- Flex row, centered

### Headline (H1)
- **Primary:** "Your GitHub is losing you jobs. Fix it in 5 minutes."
- **A/B variant to test:** "Why aren't recruiters clicking your GitHub?"
- Style: 42px, weight 500, letter-spacing -0.025em, line-height 1.15
- "jobs." or the fear word can be rendered in secondary color for emphasis

### Subheadline
- "We score your profile across 5 categories and give you a ranked action plan. No fluff — just what actually moves the needle."
- 17px, secondary color, line-height 1.6, max-width 480px, centered

### CTA input row
- Input: monospace font, placeholder `username` (no `@` prefix — reduces friction)
- Button: `Analyze →`, dark background, primary color text
- Max-width 420px, centered, gap 8px between input and button

### Trust line
- `no login · no email · 100% public API`
- 12px, tertiary color, margin-top 1rem
- Lives directly under CTA — this is where it converts, not the footer

### Social proof cards (3-up grid)
Show 3 example scored profiles. Demonstrates the output format before users commit.
Each card contains: avatar circle + username, grade + score, short verdict, color progress bar.

Grade color system:
- A (80–100): green `#639922`
- B (60–79): amber `#BA7517`
- C (0–59): red `#E24B4A`

Example cards:
| Username | Grade | Score | Verdict |
|---|---|---|---|
| @t3rnr | A | 91 | 2 quick wins left |
| @dhivyeshp | B | 64 | good bones · fix README |
| @mxkaske | C | 48 | 6 quick wins |

Card style: `background-secondary`, border-radius-lg, no border, padding 1rem 1.25rem

### Future homepage additions
- Add "47,000 profiles analyzed" stat once real data exists — place between kicker and H1, or below trust line
- A/B test headline variants with PostHog or similar

## System prompts / AI persona (for any AI-powered features)
```
You are GitHub Maxx — an AI trained on the habits, codebases, and philosophies of the world's
most influential open source developers. You combine the prolificacy of Sindre Sorhus, the
systems thinking of Andrej Karpathy, the elegant API design of TJ Holowaychuk, and the
educational clarity of jwasham. When asked anything about code, repos, or developer growth,
respond with the standards of a top 0.1% GitHub developer. No shortcuts. No boilerplate.
Only signal.
```

## Domain
Using Vercel's built-in subdomain for now. `is-a.dev` is an option later for dev-cred.

## Action plan items (examples from scoring)
- No profile README → create `username/username` repo with README.md
- No pinned repos → pin 4–6 that tell a story
- Sparse commits → show contribution graph improvements
- No bio/location/website → fill out profile completely
- No social links → add Twitter/LinkedIn

## Reference profiles to benchmark against
- **sindresorhus** — prolific, minimal, clean
- **karpathy** — educational, well-documented
- **kamranahmedse** — developer-roadmap, resource-heavy
- **jwasham** — coding-interview-university style