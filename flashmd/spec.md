# FlashMD — Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft.

## Core principle

FlashMD is the **flashcard format** of the LearnSpec suite. It enables the creation of front/back cards designed for spaced-repetition review, designed to be simple to read, simple to generate with an LLM, and usable without any tooling.

FlashMD is a **review format**: it is consumed in a context separate from the lesson (review session, notification, flashcard mode), never embedded inline within a LearnMD. TrackMD orchestrates the relationship between a LearnMD and its associated FlashMD files.

FlashMD may reference visual resources via `!ref` + `media:slug`, but imports no other LearnSpec format.

FlashMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

| Principle | Description |
|---|---|
| **Markdown-first** | A `.flash.md` file is valid Markdown readable in any editor |
| **File-native** | All data lives in the file — no database required |
| **Graceful degradation** | Each card is readable as a code block in any standard reader |
| **LaTeX from Level 0** | Mathematical formulas are available without frontmatter |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | ` ```flash ` fenced block with front/back | Minimal cards, readable everywhere |
| 1 | YAML frontmatter | File metadata, language, spaced repetition settings |
| 2 | Per-card fields, MediaMD references | Per-card tags, images |

## Level 0 — Basic syntax

### Card structure

````
```flash id:slug
[front content — text, LaTeX, inline Markdown]
---
[back content — text, LaTeX, inline Markdown]
```
````

- `id`: unique identifier for the card within the file (slug, lowercase, hyphens).
- `---`: front/back separator — appears exactly once per block.
- Both sides support **inline Markdown** (bold, italic, `code`, links), **inline LaTeX** (`$...$`), and **block LaTeX** (`$$...$$`).
- Both sides may be multi-line.

### Minimal example

````markdown
# Cell biology — flashcards

```flash id:photosynthesis
What is photosynthesis?
---
The process by which plants convert sunlight into chemical energy, using $CO_2$ and $H_2O$.
```

```flash id:mitosis-phases
What are the 4 phases of mitosis?
---
**Prophase** → **Metaphase** → **Anaphase** → **Telophase**
```

```flash id:atp-formula
What is the chemical formula of ATP?
---
$$C_{10}H_{16}N_5O_{13}P_3$$

Adenosine **tri**phosphate — the energy currency of the cell.
```
````

### Graceful degradation

In a standard Markdown reader (GitHub, Obsidian, VS Code), each card renders as a code block. The `---` separator is visible as plain text — the front and back are readable, in order.

## Level 1 — Frontmatter

```yaml
---
title: "Cell biology — flashcards"    # optional — inferred from first # H1
lang: en                               # REQUIRED — BCP-47 code
spec_version: "0.1"                    # optional
author: Jane Smith                     # optional
tags: [biology, cell, high-school]     # optional — file-level tags
new_per_day: 20                        # optional — new cards per day (player default)
created: 2026-05-10                    # optional — ISO 8601
updated: 2026-05-10                    # optional — ISO 8601
---
```

### FlashMD-specific fields

| Field | Status | Type | Description |
|---|---|---|---|
| `new_per_day` | Optional | integer | Number of new cards to introduce per day in spaced repetition. Indicative — the player may ignore or override it. |

## Level 2 — Per-card fields

Optional attributes may be added on the opening line of the block, after the `id`:

````
```flash id:slug tags:[tag1,tag2] hint:"Think about the membrane"
```
````

| Attribute | Status | Type | Description |
|---|---|---|---|
| `id` | **Required** | string | Unique identifier within the file |
| `tags` | Optional | string[] | Card-specific tags. Added to the file-level tags from frontmatter |
| `hint` | Optional | string | Hint displayed on demand before flipping the card |

## Images in cards

Images are referenced within card content via the standard `media:slug` syntax, with a fallback URL:

````markdown
!ref ./media-biology.media.md

```flash id:chloroplast
What does a chloroplast look like?
---
![Chloroplast diagram](media:chloroplast-diagram "https://upload.wikimedia.org/.../chloroplast.svg")

An oval organelle surrounded by a double membrane, containing thylakoids and stroma.
```
````

The `!ref` directive is placed at the top of the file, before the `flash` blocks. Card content may freely mix text, LaTeX, and images.

## Interoperability

| Mechanism | Support |
|---|---|
| `!ref ./media.media.md` | ✅ — for images within cards |
| `!ref ./glossary.glossary.md` | ✅ — for term highlighting |
| `!import` | ❌ — FlashMD imports no other format |
| Imported by TrackMD via `!import` | ✅ |
| Imported by LearnMD via `!import` | ❌ — flashcards are a separate review mode |

## Validation

### Lenient mode (default)

| Condition | Level |
|---|---|
| `lang` absent from frontmatter | Warning |
| `id` missing on a `flash` block | Error |
| Duplicate `id` within the file | Error |
| `---` separator missing from a `flash` block | Error |
| `---` separator appears more than once in a block | Error |
| Empty front | Error |
| Empty back | Error |
| `media:slug` without a matching `!ref` | Warning |

### Strict mode (`--strict`)

All warnings are promoted to errors.
