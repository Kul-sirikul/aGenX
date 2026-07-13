# aGentX

Design system for aGentX, built with React, Vite, Storybook, and Figma Code Connect.

## Setup

- `npm i` to install dependencies
- `npm run app:dev` runs the app at [localhost:5173](http://localhost:5173)
- `npm run storybook` starts Storybook at [localhost:6006](http://localhost:6006)
- Live Storybook (deployed on push to `main`): [kul-sirikul.github.io/aGentX/storybook](https://kul-sirikul.github.io/aGentX/storybook/)

### Figma Auth

- Create a Figma API token at figma.com/developers/api with `Code Connect`, `File Read`, `Variables`, and `Dev Resources Write` scopes
- Duplicate [.env-rename](./.env-rename), rename it to `.env` (git-ignored)
  - Set `FIGMA_ACCESS_TOKEN=` with your token
  - Set `FIGMA_FILE_KEY=` with the aGentX Figma file key

### Code Connect

Component-to-Figma mappings live in [src/figma](./src/figma), mirroring [src/ui](./src/ui). Figma URL substitutions are configured in [figma.config.json](./figma.config.json). Run `npx figma connect publish` after adding or updating mappings.

## Structure

- `src/ui/primitives` — atomic components
- `src/ui/compositions` — primitives combined into patterns
- `src/ui/layout` — layout-only components
- `src/figma` — Code Connect mapping files, mirrors `src/ui`
- `src/stories` — Storybook stories and docs
- `scripts/tokens` — pulls design tokens from Figma Variables
- `scripts/icons` — pulls icon components from Figma
