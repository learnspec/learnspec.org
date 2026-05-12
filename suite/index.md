# The LearnSpec Suite

LearnSpec is a family of nine Markdown-based formats that cover the full lifecycle of educational content — from a single lesson to a complete certification path.

Each format is independent, each is valid Markdown, and each composes with the others through the shared mechanisms defined in the **[Architecture Charter](/charter/)**.

## Overview

| Format | Ext. | Role | Status |
|---|---|---|---|
| [LearnMD](/learnmd/) | `.learn.md` | Structured educational content | Stable — v0.3 (v0.4 drafting) |
| [QuizMD](/quizmd/) | `.quiz.md` | Quizzes and assessments | Stable — v0.3 drafting |
| [TrackMD](/trackmd/) | `.track.md` | Sequenced learning paths | Draft v0.1 |
| [FlashMD](/flashmd/) | `.flash.md` | Flashcards and spaced repetition | Draft v0.1 |
| [DiagramMD](/diagrammd/) | `.diagram.md` | Diagram syntax + reusable diagrams referenced via `!ref` | Draft v0.2 |
| [MediaMD](/mediamd/) | `.media.md` | Media catalogue with licences | Draft v0.1 |
| [GlossaryMD](/glossarymd/) | `.glossary.md` | Term definitions | Draft v0.1 |
| [BadgeMD](/badgemd/) | `.badge.md` | Micro-credentials | Draft v0.1 |
| [CertMD](/certmd/) | `.cert.md` | Macro-credentials | Draft v0.1 |

## How the formats relate

The suite forms three layers:

- **Orchestrator** — `TrackMD` sequences everything else.
- **Content formats** — `LearnMD`, `QuizMD`, `FlashMD` carry the actual material.
- **Leaf formats** — `DiagramMD`, `MediaMD`, `GlossaryMD`, `BadgeMD`, `CertMD` are referenced but never reference anything else.

```
                    ┌──────────────┐
                    │   TrackMD    │   ← orchestrator
                    └──────┬───────┘
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          LearnMD       QuizMD       FlashMD          ← content
              │            │            │
              └────────────┼────────────┘
                           ▼
              DiagramMD · MediaMD · GlossaryMD        ← leaves
                           │
                    BadgeMD · CertMD                  ← credentials
```

The full compatibility matrix — who can `!import` whom, who can `!ref` whom — lives in the [charter](/charter/#interoperability-matrix).

---

## Stable formats

### LearnMD

**Status:** stable, v0.3 in production; v0.4 drafting to align with the new suite (extracts diagrams to DiagramMD, media to MediaMD, definitions to GlossaryMD).

The educational content format — explanations, examples, exercises, inline checkpoints. A complete course can live in a single `.learn.md` file; `!import` is a composition tool, not a prerequisite.

→ **[LearnMD documentation](/learnmd/)**

### QuizMD

**Status:** stable, v0.3 drafting consolidates the "YAML everywhere" principle across the three levels.

The assessment format — single questions, full quizzes, configurable behaviour through YAML at every level. Natively embeddable inline in a LearnMD via `!import`.

→ **[QuizMD documentation](/quizmd/)**

---

## Upcoming formats {#upcoming}

The formats below are at draft v0.1. Their specifications are stabilising; documentation pages on this site will follow.

### TrackMD {#trackmd}

**Role:** sequence learners through an ordered path of `LearnMD`, `QuizMD`, and `FlashMD` files, with completion criteria and progress checkpoints.

TrackMD is the only format that can `!import` all content types. A Level 0 `.track.md` is a human-readable table of contents in any standard Markdown reader.

**Key decisions so far:**
- v0.1 is a linear sequence; conditional prerequisites deferred to v0.2.
- TrackMD references `BadgeMD` and `CertMD` through `on_completion` metadata.

### FlashMD {#flashmd}

**Role:** front/back flashcards for spaced-repetition review. Consumed in a context separate from the lesson (review session, notification, flashcard mode) — never inlined in a LearnMD.

**Key decisions:** inline LaTeX is available from Level 0 — mathematical content is a fundamental element of cards, not an advanced feature. Visual richness (`media:slug`) comes at Level 2.

### DiagramMD {#diagrammd}

**Role:** dual-purpose. It is both the **canonical syntax specification** for diagram blocks across the entire suite (`mermaid`, `abc`, `chess`, `vega`, `d3`, `smiles`, …) and a **standalone file format** for reusable named diagrams referenced by slug via `!ref` from any content format.

Other specs (LearnMD, QuizMD, FlashMD) delegate diagram documentation to DiagramMD — a diagram block valid in DiagramMD is valid everywhere in the suite. Rendering implementation is left to players.

### MediaMD {#mediamd}

**Role:** centralise the metadata, sources, and licences for media assets so that other formats can reference images by a symbolic identifier without managing licensing themselves.

**Resolution model:**
```markdown
![Cross-section of the heart](media:heart "https://commons.wikimedia.org/img/heart.svg")
```
A standard Markdown reader displays the image via the fallback URL. A LearnSpec player resolves `media:heart` through the MediaMD file pulled in by `!ref`, using the canonical source and licence.

**Licence convention:** SPDX identifiers (`CC-BY-4.0`, `CC0-1.0`, …). The value `custom` is reserved for cases SPDX does not cover, and must be accompanied by `license_url` or `license_text`.

### GlossaryMD {#glossarymd}

**Role:** centralise definitions of key terms in a corpus. Referenced via `!ref` so a compatible player can highlight terms, surface tooltips, and link related entries — without modifying source content.

This is the format with the most natural graceful degradation: a Level 0 `.glossary.md` is a perfectly readable glossary in any Markdown viewer with no specific syntax at all. Inline Markdown and LaTeX are allowed in definitions; fenced blocks (Mermaid, quiz, rich examples) are not — a definition that needs a diagram is a lesson, not a glossary entry.

### BadgeMD {#badgemd}

**Role:** define a **micro-credential** that recognises mastery of a specific, granular skill. Badges are stackable: a learner accumulates them along a path.

Designed for compatibility with **Open Badges 3.0** (IMS Global / 1EdTech), so a `.badge.md` can be issued to LinkedIn, Credly, and similar platforms. SVG-native: the badge image lives next to the file and is bakeable.

### CertMD {#certmd}

**Role:** define a **macro-credential** attesting mastery of a complete domain — typically requiring completion of one or more `TrackMD` paths, a passing score on a formal assessment, and possibly prerequisite badges.

CertMD is to BadgeMD what a degree is to a module completion certificate: same family, different scope. Kept as two separate formats to keep each spec focused.

---

## Where to next

- Read the **[Architecture Charter](/charter/)** for the principles every format inherits — graceful degradation, levels, frontmatter, directives, validation.
- Read the **[LearnMD](/learnmd/)** and **[QuizMD](/quizmd/)** specifications for the stable formats.
- Follow [github.com/learnspec](https://github.com/learnspec) for spec drafts of the upcoming formats.
