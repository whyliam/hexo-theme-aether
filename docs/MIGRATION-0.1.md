# Migrating to Aether 0.1

Back up the site's `_config.aether.yml` before upgrading. The theme's own `_config.yml` now has generic defaults; keep site-specific content in the site override.

| Previous setting | Current setting |
| --- | --- |
| `aether.start_here` | `aether.paths` (the old name remains readable for migration) |
| `notes_visuals.notes_limit` | `notes.limit` |
| `notes_visuals.visuals_limit` | `visuals.limit` |
| Previously ignored `notes.enable` / `visuals.enable` | Now controls each half of the combined module |
| Fixed homepage order | `home.sections` |
| Fixed palette and glass appearance | `appearance` |
| Built-in topic-specific series inference | `series.rules`; empty means explicit `post.series` only |
| Built-in category translations | `taxonomy.labels` |
| Built-in image-host HTTPS upgrade | `images.https_hosts` |
| Fixed Newsletter series and copy | `newsletter.series`, `title`, `description`, RSS/email URLs and labels |

The unused Hero `identity`, `title`, `description`, `actions`, `side_panel` and `meta_stats` fields, and inactive `building`, `featured` and `kindex` modules have been removed from the default configuration. Use `hero.name`, `intro`, `links`, `artwork`, `image` and `motion`. Manual `series_items` and `project_items` have been removed; use article `series` metadata and configured inference rules.

Series rules are evaluated in order. Explicit article `series` wins. A rule can match `title_pattern`, `path_pattern`, `tags`, or `categories`; matching is case-insensitive. `issue_pattern` optionally removes an issue prefix from display titles and extracts its first capture group as the issue number. Canonical titles and URLs are never changed.

```yaml
aether:
  series:
    rules:
      - name: Garden Notes
        tags: [botany]
      - name: Weekly Notes
        title_pattern: '^W[0-9]+:'
        issue_pattern: '^W([0-9]+):\s*'
  taxonomy:
    labels:
      Garden: Gardening
  images:
    https_hosts: [images.example.com]
```

The optional HTTPS upgrade only applies to listed hosts. Relative paths and other hosts are preserved. User content is not rewritten.

After migration, run a clean build and check navigation, module counts, generated series, selected photos and RSS destinations. For deployments, pin the theme revision alongside the migrated configuration.
