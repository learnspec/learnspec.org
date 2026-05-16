# CurriculumMD — Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft.

## Core principle

CurriculumMD is the **reference format** of the LearnSpec suite. It describes what a content corpus *must* cover — a school syllabus, a professional certification framework, an internal training plan — without being pedagogical content itself.

It is the first format in the suite to be **meta**: it contains no lessons, quizzes or flashcards. It defines the reference learning objectives against which LearnSpec content can be assessed. Alignment between a curriculum and a corpus is performed by the AI or the player — not by the spec itself.

A CurriculumMD file is a **pure Markdown document** at level 0: a hierarchy of headings and bullet lists readable by anyone, in any editor, without tooling.

CurriculumMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

| Principle | Description |
|---|---|
| **Markdown-first** | A `.curriculum.md` file is valid Markdown readable in any editor |
| **File-native** | The entire framework lives in a single file — no database required |
| **Graceful degradation** | Headings + lists — readable everywhere like an official syllabus |
| **AI-native** | Designed to be consumed by an LLM during alignment checks |
| **Reference, not content** | CurriculumMD describes what must be learned — not how to teach it |

## Format levels

| Level | Mechanism | Use |
|---|---|---|
| 0 | Headings `#`/`##`/`###` + objective lists | Minimal syllabus readable everywhere |
| 1 | YAML frontmatter | Institutional metadata, version, country, level |
| 2 | Inline per-objective attributes | Identifiers, Bloom, weighting, mandatory flag |

Each level is a strict superset of the previous one.

## Hierarchical structure

A CurriculumMD organizes objectives into four nested levels:

```
Syllabus (.curriculum.md)
└── Domain (## heading)
    └── Unit (### heading)
        └── Objective (- list item)
```

The syllabus corresponds to the whole file. Domains, units and objectives are expressed in native Markdown — no special syntax is required at Level 0.

## Level 0 — Pure Markdown

### Minimal example

```markdown
# General Baccalaureate — Mathematics (Final Year)

## Domain 1 — Analysis

### 1.1 Numerical sequences

- Define a sequence by recurrence or by its general term
- Compute the first terms of a sequence and conjecture its monotonicity
- Prove the convergence or divergence of a sequence
- Reason by induction

### 1.2 Continuity and differentiation

- Study the continuity of a function over an interval
- Compute derivatives of composite functions
- Use the intermediate value theorem

## Domain 2 — Algebra and geometry

### 2.1 Complex numbers

- Represent a complex number in the complex plane
- Compute the modulus and argument of a complex number
- Solve equations in ℂ
```

### Structure rules

- The **`# H1`** is the official title of the syllabus. It may be absent (inferred from the frontmatter).
- The **`## H2`** headings are the domains or main thematic blocks.
- The **`### H3`** headings are the units or chapters within a domain.
- The **`#### H4`** headings (optional) allow an additional level of granularity.
- The **`- items`** are the learning objectives. Each item is a self-contained, assessable objective.
- Objectives are phrased in the infinitive or introduced by an action verb (know, understand, apply, analyze, evaluate, create).
- Fenced blocks, images and diagrams are **forbidden** in CurriculumMD — it is a reference framework, not a lesson.

## Level 1 — YAML frontmatter

```yaml
---
title: "General Baccalaureate — Mathematics"      # optional — inferred from # H1
lang: en                                          # REQUIRED — BCP-47 code
spec_version: "0.1"                               # optional
institution: "French Ministry of Education"       # optional — issuing body
country: FR                                       # optional — ISO 3166-1 alpha-2 code
level: "Final Year"                               # optional — level (Final Year, L3, Pro…)
domain: academic                                  # optional — academic | professional | internal
version: "2023"                                   # optional — year or version of the syllabus
references:                                       # optional — sources: url required, label optional
  - label: "Official syllabus — Official Bulletin"
    url: https://eduscol.education.fr/...
tags: [mathematics, baccalaureate, final-year]    # optional
created: 2026-05-10                               # optional — ISO 8601
updated: 2026-05-10                               # optional — ISO 8601
license: CC-BY-4.0                                # optional — SPDX or "custom"
---
```

### Field reference

#### LearnSpec universal fields

| Field | Required | Description |
|---|---|---|
| `lang` | **Yes** | BCP-47 code (`fr`, `en`, `en-US`…) |
| `tags` | No | Thematic tags |
| `created` | No | ISO 8601 creation date |
| `updated` | No | ISO 8601 update date |
| `license` | No | SPDX identifier or `custom` |
| `spec_version` | No | Targeted spec version (`"0.1"`) |

#### CurriculumMD-specific fields

| Field | Required | Type | Description |
|---|---|---|---|
| `institution` | No | string | Body or institution issuing the syllabus |
| `country` | No | ISO 3166-1 | Two-letter country code (`FR`, `US`, `BE`…) |
| `level` | No | string | Level of the syllabus (`Final Year`, `L3`, `Pro`…) |
| `domain` | No | enum | `academic` — school or university syllabus · `professional` — certification or occupational framework · `internal` — company training plan |
| `version` | No | string | Year or version number of the official syllabus |
| `references` | No | list of objects | List of 0 to N sources or reference documents. Each entry has a `url` (required) and an optional `label` (free text). |

> **`references` — reference sources.** The `references` field is a list of 0 to N entries. Each entry is an object whose `url` is the only required key:
>
> | Key | Required | Type | Description |
> |---|---|---|---|
> | `url` | **Yes** | URL | Link to the document |
> | `label` | No | string | Free-text title of the source (official text, annex, syllabus, assessment grid…). When absent, a parser may display the raw URL. |
>
> ```yaml
> references:
>   - label: "Official syllabus — Official Bulletin No. 25"
>     url: https://eduscol.education.fr/...
>   - url: https://pythoninstitute.org/exams-syllabus/pcep   # label optional
> ```
>
> The field is entirely optional: a curriculum with no source at all is valid (`references` absent or empty list). Order has no meaning; the first entry may be treated as the primary source by convention.

## Level 2 — Inline per-objective attributes

Optional attributes can be added at the start of each objective, in square brackets, to allow more precise machine-readable alignment.

```markdown
- [id:1.1.3 bloom:apply weight:2] Compute the derivative of a composite function
- [id:1.1.4 bloom:analyze weight:3 mandatory:true] Study the monotonicity of a sequence
- [id:2.1.1 bloom:understand] Represent a complex number in the plane
```

### Attribute reference

| Attribute | Status | Type | Description |
|---|---|---|---|
| `id` | Recommended | string | Unique, stable identifier of the objective within the file. Lets the AI and tools reference this objective precisely. Recommended format: `{domain}.{unit}.{index}` (e.g. `1.1.3`). |
| `bloom` | Optional | enum | Bloom taxonomy level associated with the objective. Values: `remember`, `understand`, `apply`, `analyze`, `evaluate`, `create`. |
| `weight` | Optional | int (1–5) | Relative weighting of the objective in the assessment of the syllabus. `1` = minor, `5` = fundamental. Default: `1`. |
| `mandatory` | Optional | bool | If `true`, the objective is required to complete the syllabus. If `false` or absent, the objective is supplementary. |

### Graceful degradation of attributes

In a standard Markdown reader, the syntax `[id:1.1.3 bloom:apply]` is displayed as plain text at the start of the item — readable, non-interactive. A CurriculumMD parser extracts and ignores these attributes during display, or renders them as discreet badges.

## Full example

````markdown
---
title: "Python — Certified Entry-Level Programmer (PCEP)"
lang: en
institution: Python Institute
country: PL
level: Entry
domain: professional
version: "2024"
references:
  - label: "PCEP certification page"
    url: https://pythoninstitute.org/pcep
  - label: "Detailed PCEP exam syllabus"
    url: https://pythoninstitute.org/exams-syllabus/pcep
tags: [python, programming, certification, beginner]
created: 2026-05-10
spec_version: "0.1"
---

# Python — Certified Entry-Level Programmer (PCEP)

## Domain 1 — Python fundamentals

### 1.1 Introduction to Python

- [id:1.1.1 bloom:remember mandatory:true] Know the characteristics of the Python language
- [id:1.1.2 bloom:understand mandatory:true] Distinguish the scalar data types: `int`, `float`, `str`, `bool`
- [id:1.1.3 bloom:apply mandatory:true weight:2] Write and run a simple Python program
- [id:1.1.4 bloom:understand] Understand the notion of interpreter and runtime environment

### 1.2 Variables and operators

- [id:1.2.1 bloom:apply mandatory:true weight:2] Declare and initialize variables
- [id:1.2.2 bloom:apply mandatory:true] Use arithmetic, comparison and logical operators
- [id:1.2.3 bloom:analyze weight:2] Identify common typing errors

## Domain 2 — Control structures

### 2.1 Conditionals

- [id:2.1.1 bloom:apply mandatory:true weight:3] Write `if`, `elif`, `else` conditional statements
- [id:2.1.2 bloom:analyze weight:2] Evaluate nested boolean expressions
- [id:2.1.3 bloom:apply] Use the ternary conditional expression

### 2.2 Loops

- [id:2.2.1 bloom:apply mandatory:true weight:3] Write `for` and `while` loops
- [id:2.2.2 bloom:apply mandatory:true weight:2] Use `break`, `continue` and `range()`
- [id:2.2.3 bloom:analyze weight:2] Identify infinite loops and exit conditions

## Domain 3 — Data structures

### 3.1 Lists

- [id:3.1.1 bloom:apply mandatory:true weight:3] Create, index and slice lists
- [id:3.1.2 bloom:apply mandatory:true weight:2] Use the main methods: `append`, `insert`, `remove`, `sort`
- [id:3.1.3 bloom:analyze weight:2] Distinguish lists, tuples and sets

### 3.2 Dictionaries

- [id:3.2.1 bloom:apply mandatory:true weight:3] Create and manipulate dictionaries
- [id:3.2.2 bloom:apply weight:2] Iterate over the keys, values and pairs of a dictionary
````

## Referencing from other formats

A CurriculumMD is declared via the `!ref` directive in a TrackMD, LearnMD, QuizMD, FlashMD or NuggetMD:

```markdown
!ref ./pcep-curriculum.curriculum.md
```

This declaration means: *"this content targets the objectives defined in this framework"*. The player and the AI can then perform an alignment check.

Several `!ref` directives pointing to different CurriculumMD files can coexist in the same document, for content that covers multiple frameworks at once:

```markdown
!ref ./pcep-curriculum.curriculum.md
!ref ./rncp-35581.curriculum.md
```

## AI alignment — use cases

Alignment between a CurriculumMD and a LearnSpec corpus is performed by the AI or the MCP — not by the spec itself. CurriculumMD provides the structured framework that the AI consumes.

### Typical questions the AI can address

**Overall coverage:**
> *"How many objectives of the PCEP framework does my Python Beginner TrackMD cover?"*

**Missing objectives:**
> *"Which mandatory objectives (`mandatory:true`) of the PCEP are not covered by my LearnMD?"*

**Targeted content generation:**
> *"Generate the missing LearnMD lessons to reach 100% coverage of domain 3"*

**Quiz adequacy:**
> *"Does this QuizMD assess the Bloom:analyze and Bloom:evaluate objectives of domain 2?"*

**Overlap between frameworks:**
> *"Which PCEP objectives are also covered by the Python framework of the Bac NSI?"*

**Alignment score:**
> *"Give me a coverage score per domain between my TrackMD and the PCEP curriculum, taking the weightings (`weight`) into account"*

### Expected response format (by convention)

When an AI performs an alignment check, it can produce a structured report such as:

```
Overall coverage: 74% (41/56 objectives)
Mandatory objectives: 89% (24/27)
Missing objectives (mandatory):
  - [id:1.2.3] Identify common typing errors
  - [id:3.2.2] Iterate over the keys, values and pairs
By domain:
  - Domain 1: 100% ✓
  - Domain 2: 83%
  - Domain 3: 60%
```

This format is a recommended convention — not prescribed by the spec.

## Interoperability

| Mechanism | Support |
|---|---|
| Referenced via `!ref` by LearnMD | ✅ |
| Referenced via `!ref` by QuizMD | ✅ |
| Referenced via `!ref` by TrackMD | ✅ |
| Referenced via `!ref` by FlashMD | ✅ |
| Referenced via `!ref` by NuggetMD | ✅ |
| `!import` of other formats | ❌ — leaf format |
| `!ref` of other formats | ❌ — leaf format |
| Comparison between two CurriculumMD files | Via the AI / MCP — outside the scope of the spec |

CurriculumMD is a **pure leaf format**: it imports and references no other LearnSpec format. It is always the endpoint of a reference, never the emitter.

## Relationship with the other recognition formats

CurriculumMD can serve as the **basis for the criteria of a CertMD**. A `requirements` block in a CertMD could declare a minimum coverage of a curriculum as a condition for awarding:

```yaml
# In a .cert.md — future use case, not specified in v0.1
requires:
  - type: curriculum_coverage
    curriculum: ./pcep-curriculum.curriculum.md
    min_coverage: 0.90
    mandatory_only: true
```

This use case is documented here as a design direction — it will be formalized in CertMD v0.2.

## Validation

### Lenient mode (default)

| Condition | Level |
|---|---|
| `lang` absent from the frontmatter | Warning |
| No objective (no `-` item) in the file | Warning |
| Fenced block in the body of the document | Error |
| Duplicate `id` in the file | Error |
| `bloom` attribute with an unrecognized value | Warning |
| `weight` attribute outside [1, 5] | Warning |
| `references` entry without a `url` | Warning |
| `url` of a `references` entry malformed (not a URL) | Warning |

### Strict mode (`--strict`)

All warnings become errors.

## Architecture charter update

The introduction of CurriculumMD entails the following updates to the LearnSpec charter:

**Format table** — add CurriculumMD as an active format.

**Compatibility matrix** — CurriculumMD is a pure leaf format, referenced by every content format and by TrackMD:

| Source format | Can import (`!import`) | Can reference (`!ref`) |
|---|---|---|
| **TrackMD** | LearnMD, QuizMD, FlashMD, NuggetMD | MediaMD, GlossaryMD, **CurriculumMD** |
| **LearnMD** | LearnMD, QuizMD, NuggetMD, DiagramMD | MediaMD, GlossaryMD, **CurriculumMD** |
| **QuizMD** | DiagramMD | MediaMD, GlossaryMD, **CurriculumMD** |
| **FlashMD** | DiagramMD | MediaMD, GlossaryMD, **CurriculumMD** |
| **NuggetMD** | — | MediaMD, GlossaryMD, **CurriculumMD** |
| **CurriculumMD** | — | — |
