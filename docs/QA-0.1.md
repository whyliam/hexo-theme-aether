# Aether 0.1 stability verification

Verified on 2026-11-11 using Ego Lite (Chromium) against the actual rendered pages. Browser checks complement the package and template checks; they are not a claim of physical-device or Safari/Firefox coverage.

## Browser coverage

- 66 populated-blog cases: home, archive, category, tag, series index/detail, photographs, about, newsletter, guestbook and a long code-heavy article; 320/768/1440px; light and dark. Checked horizontal overflow, clipped headings, footer overlap, control sizes and runtime errors.
- 32 consumer cases: neutral example site, `/journal/` deployment and a new empty site; mobile/desktop; light and dark. Checked navigation, personal-copy leakage, overflow and runtime errors.
- 13 functional journeys: archive pagination, category/tag navigation, a 145-article series, search type filters/no-results/arrow selection/focus containment/Escape, keyboard search-to-article, native code copying with accessible success feedback, article contents tracking, keyboard back-to-top, mobile menu/Escape, actual photograph loading, RSS navigation, subdirectory search, empty archive and guestbook editor focus. No guestbook comment was submitted.
- Custom configuration: module order, one-item limit, no hero artwork, purple accent, 1000px layout, forced light mode and glass disabled.
- Failure/preferences: blocked photo requests preserve captions, dimensions and article links; unavailable WebGL preserves static artwork; reduced motion/transparency removes animation, blur and glint.
- Blocked search-index requests show an explanation; Enter navigates to the readable archive.
- 24 mixed interaction rounds involving theme changes, search, Escape, scrolling and Home; 29 homepage same-origin links returned successful responses.

The final browser reports had no failing cases. Screenshots and machine-readable reports are retained outside the source tree; the curated real-browser directory screenshot is `docs/assets/aether.png` (800×500).

## Issues corrected during verification

- Empty Hexo sites did not generate home/archive pages. Aether now supplies both, keeping default navigation usable before the first post.
- Hexo merged nonempty default arrays into custom module order/navigation. Defaults now defer to validated fallbacks.
- Code-copy controls were inaccessible to keyboard users. Aether uses native buttons with localized success labels.
- Pagination and back-to-top controls now meet the intended 44px target size; hidden back-to-top controls do not receive keyboard focus.
- A duplicate contents highlighter was removed; the existing NexT contents tracking was verified on the article page.

## Build and package checks

158 unit checks, JavaScript lint, all Nunjucks templates and the changed Aether styles passed. An isolated consumer installed the actual npm tarball and built empty, configured and subdirectory sites; a clone-style installation with runtime dependencies also passed. Installing the theme preserves the consumer's existing Git hooks.

Full-repository `npm run stylint` reports 239 formatting errors in unchanged upstream styles. The same 239 errors were reproduced from the pre-change commit; changed Aether files pass independently. This is tracked validation debt, separate from rendering or interaction failures.

Release preparation includes neutral example content, configuration/migration guides, a package allowlist, attribution and a Hexo-directory submission file. npm publication and directory submission are separate release actions.

## Runtime dependency audit

The legacy `css` parser was replaced with the already supported `@adobe/css-tools` implementation, removing its vulnerable source-map decoding chain. `js-yaml` now requires at least 4.3.2, covering the [merge-key CPU advisory](https://github.com/advisories/GHSA-2883-xcg3-v3hh).

After a fresh dependency refresh, `npm audit --omit=dev --registry=https://registry.npmjs.org` reported **0 critical, 0 high, 0 moderate and 2 low entries**. The two low entries describe the same unpatched `deepmerge` chain through `hexo-util` ([upstream advisory](https://github.com/advisories/GHSA-gcqx-w48m-w2h4)). The theme uses that merge utility for local language configuration during static-site generation. This result covers the theme's runtime dependency tree; the maintainer blog's separate plugin dependencies are not included.
