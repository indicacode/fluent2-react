# Repository Guidelines

This repository is a Next.js (App Router) implementation of the Fluent2 design system using React, Tailwind CSS, and Radix primitives.

## Project Structure & Module Organization
- `app/`: Next.js routes, layouts, and page-level UI.
- `components/`: Reusable UI components; component tests live in `components/tests/`.
- `lib/` and `utils/`: Shared helpers, hooks, and utilities.
- `public/`: Static assets served by Next.js.
- `Types/`: Shared TypeScript types.
- `pipelines/`: CI/CD or deployment pipeline assets.

## Build, Test, and Development Commands
Use Yarn (see `packageManager` in `package.json`).
- `yarn dev`: Run the local Next.js dev server.
- `yarn build`: Create a production build.
- `yarn start`: Serve the production build.
- `yarn test`: Run Jest tests.

Makefile shortcuts (if you prefer):
- `make build`, `make test` mirror `npm run build/test`.
- `make pack` builds a distributable `dist/` bundle.

## Coding Style & Naming Conventions
- Formatting is enforced by Prettier (`prettier.config.js`): 2-space indentation, no semicolons, double quotes, trailing commas (es5).
- Imports are organized via Prettier plugins; avoid manual reordering.
- Tailwind classes are sorted by `prettier-plugin-tailwindcss`.

## Testing Guidelines
- Test framework: Jest + Testing Library (`jest.config.ts`).
- Test files use `*.test.tsx` and are currently located in `components/tests/`.
- No explicit coverage threshold is defined; keep tests focused on rendering and behavior.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits with optional scope, e.g. `feat(web): add input form state` or `fix(web): fix makefile`.
- Use lowercase types (`feat`, `fix`, `chore`, `refactor`) and include scope `web` when applicable.
- PRs should include: a concise summary, linked issue (if any), and screenshots for UI changes.

## Configuration Notes
- Next.js config lives in `next.config.js`.
- Tailwind is configured via `postcss.config.js` and dependencies in `package.json`.

## References
- `https://ui.shadcn.com/docs/components`
- `https://storybooks.fluentui.dev/react/?path=/docs/concepts-introduction--docs`
- `https://www.radix-ui.com/themes/docs/overview/getting-started`
