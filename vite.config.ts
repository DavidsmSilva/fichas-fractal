// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Subdirectory deployments (e.g. GitHub Pages project site) set VITE_BASE_PATH,
  // e.g. "/fichas-fractal/". Default "/" keeps the Lovable deploy unchanged.
  vite: { base: process.env.VITE_BASE_PATH || "/" },
  // Static export for GitHub Pages: enabled only when STATIC_EXPORT=true.
  // Builds with the node-server preset so CI can run the SSR server, capture the
  // rendered HTML as index.html, and publish .output/public as a static site.
  // Lovable's sandbox forces its own cloudflare preset, so this never affects the
  // Lovable deploy.
  nitro: process.env.STATIC_EXPORT === "true" ? { preset: "node-server" } : undefined,
});
