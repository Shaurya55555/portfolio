# Shaurya Bajpai — Terminal Portfolio

An interactive terminal-style portfolio built with Next.js (App Router) and
Tailwind CSS v4. Visitors type commands (`about`, `projects`, `experience`,
`skills`, `contact`, ...) or tap the chips to explore.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On vercel.com, "Add New Project", import the repo. Framework preset is
   auto-detected as Next.js. No env vars needed.
3. Deploy. Every push to `main` ships to production; PRs get preview URLs.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

## Editing content

All copy lives in `lib/content.tsx`:

- `profile` — name, role, contact, links
- `projects` — array of project cards
- the `skills`, `experience`, `education`, `achievements` functions

Commands are registered in the `COMMANDS` map at the bottom of that file.

## Resume PDF

The `resume` command links to `/Shaurya_Bajpai_Resume.pdf`. Drop the current
PDF into `public/` with that exact name to wire it up.
