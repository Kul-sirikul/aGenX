# Token Generator

This Figma plan doesn't grant the `file_variables:read` REST API scope, so tokens are pulled manually via a dev-mode Figma plugin instead of the REST API.

1. In Figma desktop, **Plugins → Development → Import plugin from manifest...** and select [`figma-plugin-token-json/manifest.json`](figma-plugin-token-json/manifest.json).
2. Run the plugin from the same menu. It shows a JSON export of all Variables + styles — copy it into `scripts/tokens/tokens.json`.
3. Run `npm run script:tokens` (calls [`build.mjs`](build.mjs)) to regenerate `src/theme.css` from `tokens.json`.

`figma-plugin-styles-json/` is an older, styles-only export plugin kept for reference; the token-json plugin above already includes styles in its output.
