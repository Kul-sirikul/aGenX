# aGenX Design System

React + Vite + TypeScript + Storybook 8, backed by Figma Variables and Figma Code Connect, integrated with Figma's Dev Mode MCP server so AI tools can read the design system directly from Figma.

## Status

- Scaffold pushed to `https://github.com/Kul-sirikul/aGenX` (public repo, `main` branch).
- Config was bootstrapped from Figma's own "Simple Design System" reference repo — only reusable tooling was kept (Storybook config, CI workflow, token/icon pull scripts). No demo components, no Figma-owned LICENSE, no SDS branding.
- No components exist yet. `src/ui/*` and `src/figma/*` subfolders are empty, ready to be filled in one at a time.
- **Pending immediate task**: the old reference folder `sds-main` (sibling of this folder) should be deleted once this session is confirmed to be running from inside `aGenX` — do this early in the first session here.

## Structure

- `src/ui/primitives` — atomic components (Button, Input, Tag...)
- `src/ui/compositions` — primitives combined into patterns (forms, headers...)
- `src/ui/layout` — layout-only components, no Figma equivalent
- `src/figma/**` — Code Connect mapping files (`.figma.tsx`), mirrors `src/ui/**` 1:1
- `src/stories/**` — Storybook stories/docs, mirrors `src/ui/**`
- `scripts/tokens` — pulls design tokens (Variables) from Figma into `tokens.json` / CSS
- `scripts/icons` — pulls icon components from Figma
- `figma.config.json` — Code Connect config + `documentUrlSubstitutions` (currently empty, fill in as components are connected)

## Workflow (solo-maintained project — no PR review required)

1. **Foundation first**: design tokens must be pulled from Figma (`scripts/tokens`) before any component work starts.
2. **One component per request.** Never build multiple components in a single pass.
3. Every new primitive/composition must ship all three together in the same request:
   - the component itself (`src/ui/...`)
   - its Storybook story (`src/stories/...`)
   - its Code Connect mapping (`src/figma/...`)
4. A Figma link or node-id is required for every component request — never invent a component from a screenshot or description alone.
5. Component and prop names must match the Figma layer/variant property names exactly.
6. Review happens in the Storybook playground (`npm run storybook`) before anything is pushed.
7. Once approved: one component = one commit, pushed directly to `main` (no PR needed, single maintainer).
8. Only run `npx figma connect publish` when explicitly asked — it publishes to the live Figma file and should be deliberate, not automatic per-component.

## Environment

- Node: match whatever version this machine already has installed (no `.nvmrc` pinned yet — single maintainer, not a blocking concern currently).
- Figma access: needs `FIGMA_ACCESS_TOKEN` + `FIGMA_FILE_KEY` in a local `.env` (see `.env-rename`), and/or Figma's Dev Mode MCP server / Figma connector enabled for this AI tool.
- GitHub push uses HTTPS with a Personal Access Token — the token must include both `repo` and `workflow` scopes, or pushes touching `.github/workflows/*` will be rejected.
