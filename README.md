# Next I18n Simple

Minimal internationalization example for Next.js App Router based on the official guide and without external i18n libraries.

Reference: https://nextjs.org/docs/app/guides/internationalization

## Overview

- Route-based locales via `app/[lang]`
- JSON dictionaries in `dictionaries/` loaded lazily on the server
- No external i18n libraries

## Project Structure

- `app/[lang]/page.tsx`: locale-aware page
- `app/[lang]/dictionaries.ts`: lazy dictionary loader
- `dictionaries/*.json`: translation data

## Requirements

- Node.js >= 24
- Yarn 1.x

## Commands

```bash
yarn dev
yarn build
yarn test
yarn tsc --noEmit
yarn knip
```

## Notes

- The CI workflow runs eslint, tsc, tests, and knip on push.
