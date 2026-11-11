# Publishing Aether

The display name is **Aether**. The npm package is `hexo-theme-aether` (npm requires lowercase names). The initial independent package version is `0.1.0`; NexT 8.27.0 remains the upstream base, not the Aether release version.

## Current release

Version [0.1.0](https://www.npmjs.com/package/hexo-theme-aether/v/0.1.0) was published on 2026-11-11. Its public registry tarball SHA-1 is `64691753e1563c4593da324d84eb8f0e86afb3a9`. A clean consumer installed the public package and generated its empty home and archive.

## Verify a release

From a clean repository checkout:

```sh
npm install
npm run eslint
npm test
npm run test:smoke
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/curlylint --include .njk layout
npm pack --dry-run
```

The consumer smoke test packs and installs the actual tarball in a temporary site, then tests empty content, module order/limits, disabled glass, custom colors, and subdirectory URLs/search. It retains the temporary fixture for inspection. It does not deploy anything.

Preview both `examples/` and a real populated blog. Check light/dark, mobile navigation, keyboard search, reduced motion/transparency, and photo fallback. The screenshot for the Hexo directory is `docs/assets/aether.png` (800×500 PNG).

## npm

1. Confirm ownership or availability of `hexo-theme-aether` in the public npm registry. An availability check does not reserve the name.
2. For the first publication, use an authorized npm account. Configure GitHub trusted publishing for subsequent releases if desired.
3. Update the package version and release notes, run the checks above, and publish the reviewed version.
4. The `v*` tag workflow runs lint, unit and consumer checks before publishing with provenance. Do not create a release tag until the npm account/trusted publisher is configured.

The consumer package includes runtime assets, configuration, essential guides, licenses and attribution. It excludes example posts, historical design logs, screenshot evidence, local planning files and Git hooks. User installation never runs a Git-hook setup script. Developers can run `npm run hooks:install` explicitly from a cloned repository.

## Hexo theme directory

The submission file is `docs/release/aether.yml`. Copy it into `hexojs/site/source/_data/themes/aether.yml` and copy `docs/assets/aether.png` to `source/themes/screenshots/aether.png`, then open a PR following the [official theme publishing guide](https://hexo.io/docs/themes#Publishing).

The configured public preview is the maintainer's blog, not a promise of a hosted site for every user. Review its production build before submitting. The example content is available separately for users who want a neutral starting point.

## Syncing the maintainer blog

Keep personal text, selected posts, category labels, series inference rules and image host upgrades in the blog's `_config.aether.yml`. Commit its theme submodule revision and configuration together. The blog deployment checks out the committed theme; only the article submodule is allowed to track new content automatically. This prevents a new theme from deploying against an old site configuration.
