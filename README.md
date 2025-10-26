# Hacker News V3

A small Hacker News reader built with React, TypeScript and Tailwind CSS. It fetches data from the official Hacker News API and demonstrates pagination, lazy-loading, and a small E2E test suite.

## Live demo

The app is hosted on Netlify: https://hacker-news-v3.netlify.app/top

## Quick start

Prerequisites: Node 18+ and npm

Install and run locally:

```bash
npm install
npm run dev
# open http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview
```

## Testing

- Unit tests (Vitest):

```bash
npm run test
```

- Playwright E2E tests (browser):

```bash
npx playwright test
```

Playwright helpers and selectors live in `tests/` — useful helpers:

- `tests/playwright-network.ts` (network intercept helpers)
- `tests/selectors.ts` (reusable page selectors)

## Netlify / SPA routing

If you deploy to Netlify, keep the `_redirects` file in `public/` so deep links and page reloads work. The repo contains `public/_redirects` with the rule:

```
/*    /index.html   200
```

## Notes

- The refresh control triggers a client-side refetch in the app (no full page reload) to avoid Netlify routing issues.
- The project includes a small Playwright E2E suite that uses request interception to make tests deterministic.

## Contributing

PRs welcome — please keep changes focused and add tests for new behaviors.

## License

MIT
