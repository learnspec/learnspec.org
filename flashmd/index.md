# FlashMD

**The flashcard format of the [LearnSpec](/) suite.**

FlashMD enables front/back cards designed for spaced-repetition review. It is simple to read, simple to generate with an LLM, and usable without any tooling.

FlashMD is a **review format**: it is consumed in a context separate from the lesson (review session, notification, flashcard mode) — never embedded inline within a LearnMD. [TrackMD](/trackmd/) orchestrates the relationship between a lesson and its associated flashcard decks.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.flash.md` file is valid Markdown readable in any editor |
| **File-native** | All data lives in the file — no database required |
| **Graceful degradation** | Each card is readable as a code block in any standard reader |
| **LaTeX from Level 0** | Mathematical formulas are available without frontmatter |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

FlashMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | ` ```flash ` fenced block with front/back | Minimal cards, readable everywhere |
| 1 | YAML frontmatter | Metadata, spaced-repetition settings |
| 2 | Per-card fields, MediaMD references | Per-card tags, images |

## Quick example

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
````

## Status

FlashMD is a **draft v0.1**.

## Next steps

- Read the full [Specification](/flashmd/spec).
