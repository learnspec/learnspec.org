# BadgeMD

**The micro-credential format of the [LearnSpec](/) suite.**

BadgeMD defines a digital badge — its description, SVG image, issuer, award criteria, and expiry conditions — in a way that is human-readable and interoperable with the **Open Badges 3.0** standard (IMS Global / 1EdTech).

A badge recognises mastery of a specific skill. It is granular and stackable: a learner may accumulate several badges along a learning path. It is distinct from [CertMD](/certmd/), a macro-credential attesting mastery of a complete domain.

BadgeMD is a **leaf format**: it imports no other LearnSpec format. It is referenced from [TrackMD](/trackmd/) via `on_completion.badge`, or from a [LearnMD](/learnmd/) `!checkpoint` via `badge:`.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.badge.md` file is valid Markdown readable in any editor |
| **File-native** | All metadata lives in the file — no database required |
| **SVG-native** | The badge is an SVG file — vector, scalable, bakeable |
| **Graceful degradation** | The SVG image and description are visible in any standard reader |
| **Open Badges compatible** | Fields map to Open Badges 3.0 for interoperability |

BadgeMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Quick example

```markdown
# Badge — Python Beginner

![Python Beginner Badge](./badge-python-beginner.svg)

To earn this badge, the learner must have completed the **Learning Python — Beginner Track**
with an overall score of at least 65%.
```

## Status

BadgeMD is a **draft v0.1**, designed alongside [CertMD](/certmd/) and [TrackMD](/trackmd/).

## Next steps

- Read the full [Specification](/badgemd/spec).
