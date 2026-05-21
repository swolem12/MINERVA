# MINERVA

MINERVA is a free, personal math tutor for adults. Short lessons, guided practice, and a clear learning path — inspired by Khan Academy and Duolingo, with a Stanford-inspired design.

**Local-first:** progress is saved on your device. No account, no cloud backend, no subscription.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), tap **Get started for free**, and begin learning.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run validate:questions` | Validate question bank schema |
| `npm run validate:content` | Check lessons, questions, and campaign wiring |

## Structure

```
MINERVA/
├── frontend/              # Next.js app (PWA-ready)
├── packages/minerva-core/ # Lessons, questions, campaign engine
├── scripts/               # Content validation
└── docs/                  # Agent and deployment notes
```

## Tech stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Zustand (local persistence)
- **Content:** TypeScript packages with typed lessons and question bank

Optional folders (`backend/`, `firebase.json`) are legacy scaffolding and are not required to run the app.

## License

Private project — see repository owner for usage terms.
