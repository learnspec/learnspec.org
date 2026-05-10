# CertMD — Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft.

## Core principle

CertMD is the **macro-credential format** of the LearnSpec suite. It defines a digital certification — its description, SVG image, issuer, award requirements, grade levels, and accreditation conditions — in a way that is human-readable and interoperable with the **Open Badges 3.0** standard.

A certification attests mastery of a **complete domain**, as opposed to a badge (BadgeMD) which attests a targeted skill. It may require completing multiple TrackMD learning paths, passing a formal examination, and holding prerequisite badges.

CertMD is a **leaf format** in terms of imports. It is referenced from TrackMD (`on_completion.certificate`).

CertMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

| Principle | Description |
|---|---|
| **Markdown-first** | A `.cert.md` file is valid Markdown readable in any editor |
| **File-native** | All metadata lives in the file — no database required |
| **SVG-native** | The certification is represented by a bakeable SVG file |
| **Graceful degradation** | The SVG image and description are visible in any standard reader |
| **Open Badges compatible** | Fields map to Open Badges 3.0 for interoperability |

## Key differences from BadgeMD

| Dimension | BadgeMD | CertMD |
|---|---|---|
| Scope | Targeted skill | Complete domain |
| Requirements | 1 track or 1 checkpoint | 1 or N tracks + badges + formal exam |
| Grades | No — binary (earned/not earned) | Yes — Pass / Merit / Distinction |
| Formal exam | No | Yes (optional in v0.1) |
| Credits | No | Yes (CPD, hours, ECTS…) |
| Accreditation | No | Yes (external body) |
| Renewal | Simple expiry | Explicit renewal conditions |

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | `# Title` + image line + Markdown body | Minimal certification, readable everywhere |
| 1 | Full YAML frontmatter | Metadata, grades, credits, accreditation |
| 2 | `requirements` fenced block | Machine-readable award requirements |

## Level 0 — Pure Markdown

```markdown
# Certification — Python Developer

![Python Developer Certification](./cert-python-developer.svg)

This certification attests complete mastery of the Python language, from fundamentals
to object-oriented programming, data manipulation, and advanced scripting.

To earn this certification, the learner must have completed all three Python curriculum
tracks and passed the final examination with a score of at least 70%.
```

**Graceful degradation:** the certification SVG displays, the title and criteria are readable in any standard reader.

## Level 1 — YAML frontmatter

```yaml
---
name: "Python Developer"
lang: en                                            # REQUIRED — BCP-47 code
description: "Complete mastery of Python."
image: ./cert-python-developer.svg                  # REQUIRED — SVG file
issuer:                                             # REQUIRED
  name: Example Academy
  url: https://academy.example.org
  email: certifications@academy.example.org
grade_levels:
  pass: 0.65
  merit: 0.80
  distinction: 0.92
credits:
  value: 35
  unit: hours                                       # hours | ects | cpd_points
  framework: CPD
accreditation:
  body: "European Digital Skills Certificate"
  url: https://digital-skills-jobs.europa.eu/...
  reference: "EDSC-PY-2026-001"
tags: [python, programming, development]
expires: P3Y                                        # ISO 8601 duration
renewal:
  before_expiry: P6M
  requires:
    - type: exam
      quiz: ./exam-python-renewal.quiz.md
      passing_score: 0.65
verification_url: https://academy.example.org/verify/
alignment:
  - framework: ESCO
    url: https://esco.ec.europa.eu/...
    name: "Python development"
created: 2026-05-10
updated: 2026-05-10
spec_version: "0.1"
---
```

### Field reference

#### Universal LearnSpec fields

| Field | Required | Description |
|---|---|---|
| `lang` | **Yes** | BCP-47 code |
| `tags` | No | Thematic tags |
| `created` | No | Creation date, ISO 8601 |
| `updated` | No | Last update date, ISO 8601 |
| `spec_version` | No | Targeted spec version (`"0.1"`) |

#### CertMD-specific fields

| Field | Required | Type | Description |
|---|---|---|---|
| `name` | **Yes** | string | Certification display name |
| `description` | No | string | Short summary of the domain attested |
| `image` | **Yes** | path/URL | Path or URL to the certification SVG file |
| `issuer.name` | **Yes** | string | Name of the issuing organisation |
| `issuer.url` | **Yes** | URL | URL of the issuing organisation |
| `issuer.email` | No | email | Issuer contact email |
| `grade_levels.pass` | No | float | Minimum score to pass (0.0–1.0) |
| `grade_levels.merit` | No | float | Merit grade threshold |
| `grade_levels.distinction` | No | float | Distinction grade threshold |
| `credits.value` | No | number | Training credit value |
| `credits.unit` | No | enum | `hours`, `ects`, `cpd_points` |
| `credits.framework` | No | string | Credit framework (`CPD`, `ECTS`, `CEC`…) |
| `accreditation.body` | No | string | Name of the accrediting body |
| `accreditation.url` | No | URL | Accreditation URL |
| `accreditation.reference` | No | string | Accreditation reference number |
| `expires` | No | ISO 8601 duration | Validity duration after award |
| `renewal.before_expiry` | No | ISO 8601 duration | Renewal window before expiry |
| `renewal.requires` | No | object[] | Renewal requirements (same format as `requirements` block) |
| `verification_url` | No | URL | Public verification URL |
| `alignment` | No | object[] | Alignment to external skill frameworks |

## Level 2 — `requirements` block

A `requirements` fenced block defines the certification award conditions in a machine-readable way. It is placed in the document body, after the narrative description.

### Simple requirements

````markdown
```requirements
- type: track_complete
  track: ./python-beginner.track.md
  passing_score: 0.65
- type: track_complete
  track: ./python-intermediate.track.md
  passing_score: 0.70
- type: track_complete
  track: ./python-advanced.track.md
  passing_score: 0.70
- type: exam
  quiz: ./exam-final-python.quiz.md
  passing_score: 0.70
```
````

### Requirement types

| Type | Trigger | Specific fields |
|---|---|---|
| `track_complete` | Completion of a TrackMD | `track`, `passing_score` (optional) |
| `exam` | Passing a dedicated QuizMD (formal examination) | `quiz`, `passing_score` |
| `badge_earned` | Holding a BadgeMD badge | `badge` |
| `manual` | Manual award by a panel | *(no specific fields)* |

### `exam` vs `track_complete` with quizzes

An `exam` is a QuizMD treated as a formal certification-level assessment — typically with `feedback_mode: deferred`, `reveal: sequential`, and `time_limit`. It is distinct from quizzes embedded within tracks. A `track_complete` with included quizzes assesses pedagogical progression; the `exam` assesses final mastery.

## Referencing from TrackMD

CertMD is declared in the frontmatter of the final curriculum TrackMD via `on_completion.certificate`:

```yaml
on_completion:
  badge: ./badge-python-advanced.badge.md
  certificate: ./cert-python-developer.cert.md
```

When the track completion conditions are satisfied, the player then evaluates the `requirements` block of the CertMD to determine whether the certification is awarded, and at which grade level.

## SVG baking — implementation note

As with BadgeMD, the Open Badges 3.0 standard supports **SVG baking** for certifications: the JSON-LD assertion (learner, date, grade, credits) is embedded inside the certification SVG. The resulting file is self-verifiable and shareable. This is a player implementation feature, not a CertMD spec constraint.

## Interoperability

| Mechanism | Support |
|---|---|
| Referenced from TrackMD (`on_completion.certificate`) | ✅ |
| `!import` of other formats | ❌ — leaf format |
| `!ref` of other formats | ❌ — leaf format |
| Referenced from LearnMD | ❌ — TrackMD level only in v0.1 |

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
| `requirements` block absent | Warning |
| Unrecognised requirement type in `requirements` block | Warning |
| `grade_levels.merit` < `grade_levels.pass` | Error |
| `grade_levels.distinction` < `grade_levels.merit` | Error |
| `expires` in invalid format (not ISO 8601 duration) | Error |
| `credits.unit` not recognised | Warning |

### Strict mode (`--strict`)

All warnings are promoted to errors.

## Deferred to v0.2

| Feature | Reason |
|---|---|
| Conditional prerequisites between certifications | Dependency graph — real-world usage feedback needed |
| Referencing from LearnMD | Certification is a macro-credential — TrackMD level is appropriate in v0.1 |
| Full renewal pathway (multi-track) | `renewal.requires` already supports exams — multi-track extension is v0.2 |

## Open Badges 3.0 mapping

| CertMD field | Open Badges 3.0 field | Notes |
|---|---|---|
| `name` | `name` | Identical |
| `description` | `description` | Identical |
| `image` | `image.id` | SVG URL or data URI |
| `issuer.name` | `issuer.name` | Identical |
| `issuer.url` | `issuer.url` | Identical |
| `grade_levels` | — | Resolved into assertion at player level |
| `credits.value` | `creditsAvailable` | OB3 extension |
| `accreditation.body` | `endorsement.issuer` | Via EndorsementCredential |
| `expires` | `expires` | ISO 8601 duration |
| `verification_url` | `verify.url` | Identical |
| `alignment[].url` | `alignment.targetUrl` | Identical |
| `alignment[].name` | `alignment.targetName` | Identical |
| `requirements` block | `criteria.narrative` + `criteria.id` | Resolved by the player |
