# BadgeMD — Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft.

## Core principle

BadgeMD is the **micro-credential format** of the LearnSpec suite. It defines a digital badge — its description, SVG image, issuer, award criteria, and expiry conditions — in a way that is human-readable and interoperable with the **Open Badges 3.0** standard (IMS Global / 1EdTech).

A badge recognises mastery of a specific skill. It is granular and stackable: a learner may accumulate several badges along a learning path. It is distinct from CertMD (a macro-credential attesting mastery of a complete domain) by its targeted scope.

BadgeMD is a **leaf format** in terms of imports — it imports no other LearnSpec format. It is referenced from TrackMD (`on_completion.badge`) or from a `!checkpoint` in LearnMD.

BadgeMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

| Principle | Description |
|---|---|
| **Markdown-first** | A `.badge.md` file is valid Markdown readable in any editor |
| **File-native** | All metadata lives in the file — no database required |
| **SVG-native** | The badge is an SVG file — vector, scalable, bakeable |
| **Graceful degradation** | The SVG image and description are visible in any standard reader |
| **Open Badges compatible** | Fields map to Open Badges 3.0 for interoperability |

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | `# Title` + image line + Markdown body | Minimal badge, readable everywhere |
| 1 | Full YAML frontmatter | Machine-readable metadata (issuer, expiry, alignment) |
| 2 | `criteria` fenced block | Machine-readable award conditions |

## Level 0 — Pure Markdown

A Level 0 BadgeMD file is a Markdown document with a title, the badge SVG image, and a description of the award criteria.

```markdown
# Badge — Python Beginner

![Python Beginner Badge](./badge-python-beginner.svg)

To earn this badge, the learner must have completed the **Learning Python — Beginner Track**
with an overall score of at least 65%.

This badge attests mastery of Python fundamentals: variables, data types,
control structures, lists, and dictionaries.
```

**Graceful degradation:** in any standard reader, the SVG badge displays, the title is visible, and the criteria are readable as text. A BadgeMD file is immediately understandable without any tooling.

### SVG image line

The badge image is a standard Markdown line placed immediately after the `# H1`:

```markdown
![Badge alt text](path/to/badge.svg)
```

- The image file **must be SVG** (`image/svg+xml`).
- Local path (`./badge.svg`) or URL (`https://...`).
- SVG renders natively in GitHub, Obsidian, and VS Code — optimal graceful degradation.

## Level 1 — YAML frontmatter

```yaml
---
name: "Python Beginner"                         # REQUIRED — badge display name
lang: en                                         # REQUIRED — BCP-47 code
description: "Mastery of Python fundamentals."  # optional — short summary
image: ./badge-python-beginner.svg               # REQUIRED — path or URL to SVG file
issuer:                                          # REQUIRED — badge issuer
  name: Example Academy                          #   organisation name
  url: https://academy.example.org               #   issuer URL
  email: badges@academy.example.org              #   optional
tags: [python, programming, beginner]            # optional
expires: P2Y                                     # optional — ISO 8601 duration (P2Y = 2 years)
verification_url: https://academy.example.org/verify/  # optional
alignment:                                       # optional — alignment to skill frameworks
  - framework: ESCO
    url: https://esco.ec.europa.eu/...
    name: "Use Python"
created: 2026-05-10
updated: 2026-05-10
spec_version: "0.1"
---
```

### Field reference

#### Universal LearnSpec fields

| Field | Required | Description |
|---|---|---|
| `lang` | **Yes** | BCP-47 code (`en`, `fr`, `en-US`…) |
| `tags` | No | Thematic tags |
| `created` | No | Creation date, ISO 8601 |
| `updated` | No | Last update date, ISO 8601 |
| `spec_version` | No | Targeted spec version (`"0.1"`) |

#### BadgeMD-specific fields

| Field | Required | Type | Description | Open Badges 3.0 |
|---|---|---|---|---|
| `name` | **Yes** | string | Badge display name | `name` |
| `description` | No | string | Short summary of the skills attested | `description` |
| `image` | **Yes** | path/URL | Path or URL to the badge SVG file | `image` |
| `issuer.name` | **Yes** | string | Name of the issuing organisation | `issuer.name` |
| `issuer.url` | **Yes** | URL | URL of the issuing organisation | `issuer.url` |
| `issuer.email` | No | email | Issuer contact email | `issuer.email` |
| `expires` | No | ISO 8601 duration | Validity duration after award (`P1Y`, `P2Y`, `P6M`…). Absent = no expiry. | `expires` |
| `verification_url` | No | URL | Public verification URL for a badge assertion | `verify` |
| `alignment` | No | object[] | Alignment to external skill frameworks (ESCO, O*NET, …) | `alignment` |

## Level 2 — `criteria` block

A `criteria` fenced block defines the badge award conditions in a machine-readable way. It is placed in the document body, after the narrative description.

````markdown
```criteria
type: track_complete
track: ./python-beginner.track.md
passing_score: 0.65
```
````

### Criteria types

| Type | Trigger | Specific fields |
|---|---|---|
| `track_complete` | Completion of a TrackMD | `track`, `passing_score` (optional) |
| `quiz_pass` | Passing a QuizMD | `quiz`, `passing_score` |
| `checkpoint_reached` | Reaching a named checkpoint | `checkpoint_id`, `source` (file path) |
| `manual` | Manual award by an instructor | *(no specific fields)* |

### Multiple criteria (AND logic)

Multiple criteria may be combined in a single block — all must be satisfied:

````markdown
```criteria
- type: track_complete
  track: ./python-beginner.track.md
  passing_score: 0.65
- type: quiz_pass
  quiz: ./quiz-final.quiz.md
  passing_score: 0.8
```
````

## Complete example

````markdown
---
name: "Python Beginner"
lang: en
description: "Mastery of Python fundamentals: variables, control flow, data structures."
image: ./badge-python-beginner.svg
issuer:
  name: Example Academy
  url: https://academy.example.org
  email: badges@academy.example.org
tags: [python, programming, beginner]
expires: P2Y
alignment:
  - framework: ESCO
    url: https://esco.ec.europa.eu/en/classification/skill?uri=http%3A%2F%2Fdata.europa.eu%2Fesco%2Fskill%2Fb633c537
    name: "Use Python"
created: 2026-05-10
spec_version: "0.1"
---

# Badge — Python Beginner

![Python Beginner Badge](./badge-python-beginner.svg)

To earn this badge, the learner must have completed the
**Learning Python — Beginner Track** with an overall score of at least 65%.

This badge attests the following skills:

- Declare and manipulate Python variables and data types
- Use control structures (`if`, `for`, `while`)
- Manipulate lists and dictionaries
- Read and write text files in Python

```criteria
type: track_complete
track: ./python-beginner.track.md
passing_score: 0.65
```
````

## Referencing from other formats

### From TrackMD

Declared in the TrackMD frontmatter via `on_completion.badge`:

```yaml
on_completion:
  badge: ./badge-python-beginner.badge.md
```

The badge is awarded when the track completion criteria are satisfied.

### From LearnMD — via `!checkpoint`

A badge may be awarded when a learner reaches a specific checkpoint in a LearnMD, via the `badge:` attribute on the `!checkpoint` directive:

```markdown
!checkpoint id:module-variables-done label:"Variables module complete" badge:./badge-variables.badge.md
```

The referenced badge should contain a matching `checkpoint_reached` criterion:

````markdown
```criteria
type: checkpoint_reached
checkpoint_id: module-variables-done
source: ./01-variables.learn.md
```
````

## SVG baking — implementation note

The Open Badges 3.0 standard supports **SVG baking**: embedding the badge JSON-LD assertion (learner data, award date, criteria) directly inside the awarded badge SVG file. A baked badge is self-verifiable and portable — the learner can share it on LinkedIn, display it on their portfolio, and anyone can verify its authenticity by inspecting the file.

SVG baking is a **player implementation feature**, not a BadgeMD spec constraint. The `.badge.md` file defines the badge class; the player handles generating and baking individual assertions.

## Interoperability

| Mechanism | Support |
|---|---|
| Referenced from TrackMD (`on_completion.badge`) | ✅ |
| Referenced from LearnMD (`!checkpoint badge:`) | ✅ |
| `!import` of other formats | ❌ — leaf format |
| `!ref` of other formats | ❌ — leaf format |

## Validation

### Lenient mode (default)

| Condition | Level |
|---|---|
| `lang` absent from frontmatter | Warning |
| `name` absent | Error |
| `image` absent | Error |
| `image` not pointing to an SVG file | Warning |
| `issuer.name` absent | Error |
| `issuer.url` absent | Warning |
| Markdown image line absent (after H1) | Warning |
| `criteria` block absent | Warning |
| Unrecognised criteria type in `criteria` block | Warning |
| `expires` in invalid format (not ISO 8601 duration) | Error |

### Strict mode (`--strict`)

All warnings are promoted to errors.

## Open Badges 3.0 mapping

| BadgeMD field | Open Badges 3.0 field | Notes |
|---|---|---|
| `name` | `name` | Identical |
| `description` | `description` | Identical |
| `image` | `image.id` | SVG URL or data URI |
| `issuer.name` | `issuer.name` | Identical |
| `issuer.url` | `issuer.url` | Identical |
| `issuer.email` | `issuer.email` | Identical |
| `expires` | `expires` | ISO 8601 duration |
| `verification_url` | `verify.url` | Identical |
| `alignment[].url` | `alignment.targetUrl` | Identical |
| `alignment[].name` | `alignment.targetName` | Identical |
| `alignment[].framework` | `alignment.framework` | Identical |
| `criteria` block (narrative) | `criteria.narrative` | Human-readable description |
| `criteria` block (machine) | `criteria.id` (URL) | Resolved by the player |
