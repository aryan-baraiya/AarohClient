# Application Architecture

This app follows a feature-first structure so the codebase stays understandable as it grows.

## Core principles

- Features own their state and screens.
- Shared UI and utilities live outside feature folders.
- Root app files should stay thin and orchestration-focused.
- Reusable logic should be extracted before the app becomes difficult to maintain.

## Structure

```text
src/
  app/                 # Expo Router screens and root layout
  components/          # Legacy UI helpers kept for compatibility until migrated
  constants/           # App-wide constants and theme tokens
  features/
    auth/
      hooks/
      screens/
      AuthFlow.tsx
    onboarding/
      screens/
  hooks/               # Shared React hooks
  shared/              # Reusable UI, utils, and types
```

## Rules

1. Add new business logic inside the relevant feature folder.
2. Keep shared UI in `src/shared` or `src/components` only when it is truly reusable.
3. Avoid mixing auth flow, device onboarding, and main app shell logic in a single file.
4. Prefer small, explicit modules over large screen files that handle multiple concerns.

This keeps future changes local, easier to test, and easier to review.
