# Vendored visual runtimes

- `three.module.min.js`: Three.js **0.170.0**, copied from https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js. MIT license: `three.LICENSE`.
- `gradient-backdrop.js`: https://github.com/nonlineartom/gradient-backdrops, local installed skill snapshot copied on 2026-11-08. MIT license: `gradient-backdrop.LICENSE`. Runtime is unmodified.

Loaded lazily by `aether-organic.js` only on eligible desktop devices. The page never depends on a third-party CDN at runtime. Third-party sources are excluded from first-party ESLint rules.
