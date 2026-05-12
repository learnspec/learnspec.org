# LearnMD — Format Specification v0.4

> Part of the [LearnSpec](/) suite. Draft based on v0.3.

## Core principle

LearnMD is the **educational content format** of the LearnSpec suite. It covers instruction — explaining what to know — while [QuizMD](/quizmd/) covers assessment. Together they form a complete **teach → assess** stack, in portable plain-text files.

**A complete course — chapters, lessons, exercises, quizzes — can live in a single valid `.learn.md` file.** The `!import` directive is a composition tool for reusability, not a prerequisite.

| Principle | Description |
|---|---|
| **Markdown-first** | A `.learn.md` file is valid Markdown readable in any editor |
| **File-native** | All content lives in files — no database required |
| **Git-native** | Versionable, diffable, and mergeable like code |
| **AI-native** | Generatable and consumable by LLMs without specific tooling |
| **Progressively enriched** | Plain text (Level 0) up through special fenced blocks (Level 2) |
| **LearnSpec-interoperable** | Natively integrates with QuizMD, DiagramMD, MediaMD, and GlossaryMD |

LearnMD inherits the universal frontmatter, directives, and validation rules defined in the [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | Plain `.learn.md`, native Markdown | Minimal content, readable everywhere |
| 1 | YAML frontmatter + GFM callouts | Metadata, estimated time, language |
| 2 | Special fenced blocks + directives | Examples, summaries, inline quizzes, imports |

Each level is a strict superset of the previous one. A Level 0 file is valid at Level 1 and 2.

## Document architecture

### Three-tier hierarchy

```
document (.learn.md, minimal or no frontmatter)
└── module (## heading)
    └── lesson (### heading or file imported via !import)
```

- Structure is **strictly linear** in v0.4 (no branching).
- ` ```quiz ` blocks and `!import`, `!ref`, `!checkpoint` directives are usable at any level.
- Images are referenced via `![alt](media:slug "fallback")` (recommended) or `![alt](url)` (direct).

## Level 0 — Plain Markdown

### Basic syntax

| Syntax | Meaning |
|---|---|
| `# Title` | Document title (inferred by the parser if absent from frontmatter) |
| `## Module title` | Main section heading |
| `### Lesson title` | Sub-section heading |
| `> text` | Generic blockquote |
| `!import ./file.learn.md` | Include another lesson file |
| `!import ./file.quiz.md` | Embed an external QuizMD checkpoint |
| `!ref ./file.diagram.md` | Declare a DiagramMD context (enables ` ```diagram ref:slug ` resolution) |
| `!ref ./file.media.md` | Declare a MediaMD context (enables `media:slug` resolution) |
| `!ref ./file.glossary.md` | Declare a GlossaryMD context (enables term highlighting) |
| ` ```diagram ref:slug ` | Render a named diagram from a `!ref`-ed DiagramMD file |
| `!checkpoint id:slug` | Mark a learner progress checkpoint |
| `$...$` | Inline LaTeX math formula |
| `$$...$$` | Block (display) LaTeX math formula |
| `![alt](media:slug "fallback-url")` | Image via MediaMD with fallback for standard readers |
| `![alt](url)` | Direct image (URL) |

### Minimal example

````markdown
# Introduction to Python

!ref ./glossary-python.glossary.md

## Module 1 — Variables

A **variable** is a named reference to a value in memory.

```python
age = 25
name = "Alice"
```

!checkpoint id:module-1-done label:"Module 1 complete"

## Module 2 — Conditions

An `if` statement runs code only when a condition is true.
````

## Level 1 — YAML frontmatter

A YAML block at the top of the `.learn.md` file, between two `---` lines.

```yaml
---
title: Python — Variables      # optional — inferred from the first # H1 if absent
lang: en                       # REQUIRED — BCP-47 code (en, fr, en-US, …)
estimated_time: 15min          # optional — free-form duration string
tags: [python, variables]      # optional — list of strings
author: Jane Smith             # optional — string or {name, email, url}
spec_version: "0.4"            # optional — LearnMD spec version this file targets
created: 2026-05-10            # optional — ISO 8601
updated: 2026-05-10            # optional — ISO 8601
license: CC-BY-4.0             # optional — SPDX identifier or "custom"
---
```

### Field reference

| Field | Required | Type | Description |
|---|---|---|---|
| `title` | No | string | Overrides the first `# H1`. Inferred from H1 if absent. |
| `lang` | **Yes** | BCP-47 | Language code: `en`, `fr`, `en-US`, etc. |
| `estimated_time` | No | string | Free-form estimated reading/study time: `15min`, `1h30`, `2h` |
| `tags` | No | string[] | Thematic tags |
| `author` | No | string or object | Author name, or `{name, email, url}` |
| `spec_version` | No | string | LearnMD spec version this file targets (e.g. `"0.4"`) |
| `created` | No | date | Creation date, ISO 8601 |
| `updated` | No | date | Last update date, ISO 8601 |
| `license` | No | string | SPDX identifier (e.g. `CC-BY-4.0`) or `custom` |

### GFM callouts

Callouts use GitHub Flavored Markdown syntax and are rendered with visual emphasis by compatible players.

**Supported everywhere** (GitHub, Obsidian, LearnSpec players):

| Syntax | Semantic | Typical use |
|---|---|---|
| `> [!note]` | Note | Supplementary information |
| `> [!tip]` | Tip | Best practice, shortcut, helpful advice |
| `> [!warning]` | Warning | Common pitfall, frequent mistake |
| `> [!important]` | Important | Critical point to remember |
| `> [!caution]` | Caution | Risk of error or data loss |

**Extended callouts** (degrade gracefully to a blockquote on GitHub):

| Syntax | Semantic | Typical use |
|---|---|---|
| `> [!summary]` | Summary | Key takeaways at the end of a lesson |
| `> [!example]` | Example | Non-code illustrative example |
| `> [!objectives]` | Learning Objectives | What the learner will be able to do — place at top |

## Level 2 — Special fenced blocks and directives

### Composition directives

#### `!import <path>`

Includes content from another file at the current position. The file type is detected from the extension:

| Extension | Behaviour |
|---|---|
| `.learn.md` | Lesson content inserted inline (frontmatter ignored) |
| `.quiz.md` | Rendered as an interactive QuizMD checkpoint |

DiagramMD files (`.diagram.md`) are not consumed via `!import` — they are leaf catalogues declared with `!ref` and addressed by slug. See `!ref` below.

```markdown
!import ./03-conditions.learn.md
!import ./check-variables.quiz.md
```

- Imports are recursive (an imported file may itself contain `!import` directives).
- Circular imports are silently skipped.
- Local paths or external URLs accepted — see the [Architecture Charter](/charter/#cross-format-directives).

#### `!ref <path>`

Declares a context file without including its content inline. Produces no visible render — it establishes a context the player uses in the background.

| Extension | Behaviour |
|---|---|
| `.media.md` | Enables `media:slug` reference resolution |
| `.glossary.md` | Enables defined-term highlighting |

```markdown
!ref ./media-python.media.md
!ref ./glossary-python.glossary.md
!ref https://github.com/example/commons/blob/main/glossaries/en/computing.glossary.md
```

Multiple `!ref` directives may coexist in the same document.

#### `!checkpoint id:slug [label:"..."] [type:...] [badge:...]`

Marks a named progress point in the lesson.

```markdown
!checkpoint id:module-1-done label:"Module 1 complete"
!checkpoint id:module-variables-done label:"Variables mastered" badge:./badge-variables.badge.md
```

| Attribute | Required | Default | Description |
|---|---|---|---|
| `id` | **Yes** | — | Unique identifier within the document |
| `label` | No | `"Checkpoint"` | Display text shown to the learner |
| `type` | No | `milestone` | `milestone` / `read` / `exercise-complete` |
| `badge` | No | — | Path to a BadgeMD file awarded when this checkpoint is reached |

**Rules:**
- `id` values must be unique within a document.
- When a `!import ./quiz.quiz.md` is present, the quiz itself acts as a natural checkpoint — an additional `!checkpoint` at the same position is redundant.

### Checkpoint JSON (parser output)

```json
{
  "checkpoints": [
    { "id": "module-1-done", "label": "Module 1 complete", "type": "milestone", "position": 42 },
    { "id": "module-2-done", "label": "Module 2 complete", "type": "milestone", "position": 87 }
  ]
}
```

### Inline quiz checkpoint

Embeds a **single question** using **QuizMD Level 0** syntax directly in the lesson. The QuizMD frontmatter (global configuration — scoring, `reveal`, `feedback_mode`) is not applicable inline. All QuizMD Level 0 question types are supported: `mcq`, `multi`, `open`, `tf`, `match`, `order`.

````markdown
```quiz
? Which operator assigns a value in Python?
- [x] =
- [ ] ==
- [ ] :=
```
````

| Attribute | Default | Description |
|---|---|---|
| `scored:false` | Yes (default) | Practice mode — immediate feedback, no score recorded |
| `scored:true` | — | Scored checkpoint — contributes to lesson score |

**Inline quiz vs external file:**

| Need | Syntax |
|---|---|
| Single simple question | Inline ` ```quiz ` block |
| Multiple questions, advanced scoring, or shared config | `!import ./file.quiz.md` |

### Fenced callout blocks

Level 2 alternatives to GFM callouts. Support richer content (multi-paragraph, nested lists, syntax-highlighted code).

| Language | Icon | Label | Typical use |
|---|---|---|---|
| ` ```note ` | 📝 | Note | Supplementary information |
| ` ```tip ` | 💡 | Tip | Best practice or helpful advice |
| ` ```warning ` | ⚠️ | Warning | Common pitfall, frequent mistake |
| ` ```important ` | ❗ | Important | Critical point to remember |
| ` ```caution ` | 🔴 | Caution | Risk of error or data loss |
| ` ```summary ` | ✅ | Summary | Key takeaways at the end of a lesson |
| ` ```example ` | 🔍 | Example | Illustrative example |
| ` ```objectives ` | 🎯 | Learning Objectives | What the learner will achieve — place at top |

**Optional `title` attribute:**

````markdown
```example title:"Token prediction"
Context: "The capital of France is"
Most likely token: " Paris"
```
````

**Optional code language** — place before `title:` to enable syntax highlighting:

````markdown
```example python title:"Assigning and reassigning a variable"
score = 0
print(score)   # → 0

score = 42
print(score)   # → 42
```
````

## Math support

LearnMD uses LaTeX formulas rendered via KaTeX. Math is **auto-detected** — no frontmatter flag is required.

| Form | Syntax | Rendering |
|---|---|---|
| Inline | `$E = mc^2$` | Embedded in the line of text |
| Block (display) | `$$\int_0^\infty e^{-x}\,dx = 1$$` | Centred on its own line |

## Diagram support

LearnMD supports all diagram block types defined in the [DiagramMD spec](/diagrammd/). Inline diagrams use **DiagramMD Level 0** fenced block syntax with optional **Level 2 attributes** (`caption`, `width`, `alt`). The DiagramMD frontmatter (Level 1) is not applicable inline.

````markdown
```mermaid caption:"System architecture" width:80% alt:"Client-API-DB diagram"
flowchart LR
    Client --> API --> DB
```
````

````markdown
```abc play
X:1
T:Main Theme
K:C
|: G2 AB c2 BA | G4 E4 :|
```
````

Supported types, shared attributes (`caption`, `width`, `alt`), and AI authoring recommendations are documented in the [DiagramMD spec](/diagrammd/).

For diagrams reused across multiple lessons, gather them in a `.diagram.md` catalogue declared via `!ref ./file.diagram.md` and reference each one inline with:

````markdown
```diagram ref:auth-flow
```
````

## Media references

Images are referenced via two mechanisms.

### Via MediaMD (recommended)

Requires a `!ref` to a MediaMD file at the top of the document. Enables automatic licence and attribution resolution.

```markdown
!ref ./media-biology.media.md

![Chloroplast diagram](media:chloroplast "https://upload.wikimedia.org/.../chloroplast.svg")
```

- `media:chloroplast`: slug resolved via the MediaMD → full-resolution image + licence metadata.
- `"https://..."`: fallback URL — displayed in standard readers without LearnSpec.

### Direct (URL)

```markdown
![Chloroplast diagram](https://example.com/chloroplast.svg)
```

## Syntax reference

| Element | Syntax | Level |
|---|---|---|
| Document title | `# Title` | 0 |
| Module heading | `## Module title` | 0 |
| Lesson heading | `### Lesson title` | 0 |
| Generic blockquote | `> text` | 0 |
| Import lesson | `!import ./file.learn.md` | 0 |
| Embed quiz | `!import ./file.quiz.md` | 0 |
| Declare DiagramMD | `!ref ./file.diagram.md` | 0 |
| Reference a diagram | ` ```diagram ref:slug ` | 0 |
| Declare MediaMD | `!ref ./file.media.md` | 0 |
| Declare GlossaryMD | `!ref ./file.glossary.md` | 0 |
| Progress checkpoint | `!checkpoint id:slug [label:"..."] [type:...] [badge:...]` | 0 |
| Inline math | `$formula$` | 0 |
| Block math | `$$formula$$` | 0 |
| Image via MediaMD | `![alt](media:slug "fallback")` | 0 |
| Direct image | `![alt](url)` | 0 |
| Diagram block | ` ```{type} [caption:"..."] [width:...] [alt:"..."] ` | 0 |
| Frontmatter | `---` YAML `---` | 1 |
| Note callout | `> [!note]` | 1 |
| Tip callout | `> [!tip]` | 1 |
| Warning callout | `> [!warning]` | 1 |
| Important callout | `> [!important]` | 1 |
| Summary callout | `> [!summary]` | 1 |
| Example callout | `> [!example]` | 1 |
| Objectives callout | `> [!objectives]` | 1 |
| Inline quiz | ` ```quiz ` | 2 |
| Scored inline quiz | ` ```quiz scored:true ` | 2 |
| Note callout (fenced) | ` ```note ` | 2 |
| Summary callout (fenced) | ` ```summary ` | 2 |
| Example callout (fenced) | ` ```example [lang] [title:"..."] ` | 2 |
| Objectives callout (fenced) | ` ```objectives ` | 2 |

## Validation

### Lenient mode (default)

| Condition | Level |
|---|---|
| `lang` absent from frontmatter | Warning |
| Title absent (no H1 and no frontmatter `title`) | Warning |
| Unclosed fenced block | Error |
| Inline quiz block with no `?` line | Error |
| `!checkpoint` missing required `id` attribute | Error |
| Duplicate `!checkpoint` `id` within a document | Error |
| `!import` pointing to a missing file | Warning |
| `!ref` pointing to a missing file | Warning |
| `media:slug` without a matching `!ref` MediaMD | Warning |
| `media:slug` without a fallback URL | Warning |

### Strict mode (`--strict`)

| Condition | Level |
|---|---|
| `lang` absent | Error |
| Title absent | Error |
| All lenient-mode errors | Error |
| `!ref` pointing to a missing file | Error |
| `media:slug` without a fallback URL | Error |

Strict mode is recommended for CI pipelines and production publishing. Lenient mode is appropriate during authoring.

## Changes from v0.3

| Element | Change |
|---|---|
| Hierarchy | `path` renamed to `document` (avoids confusion with TrackMD) |
| Principles | "QuizMD-interoperable" → "LearnSpec-interoperable" |
| `!ref` | New directive — declares DiagramMD, MediaMD and GlossaryMD contexts |
| Diagram reference | New ` ```diagram ref:slug ` block — resolves a named diagram from a `!ref`-ed DiagramMD |
| Images | New `media:slug` syntax via MediaMD |
| Frontmatter | Added `created`, `updated`, `license` (universal LearnSpec fields) |
| Diagrams | Mermaid and ABC sections simplified — delegate to DiagramMD spec |
