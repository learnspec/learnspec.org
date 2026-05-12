---
layout: home

hero:
  name: LearnSpec
  image:
    src: /logo.svg
    alt: LearnSpec
  text: An open suite of Markdown formats for learning
  tagline: Plain-text, file-native, AI-ready standards for teaching, assessing, and credentialing
  actions:
    - theme: brand
      text: Explore the suite
      link: /suite/
    - theme: alt
      text: Architecture charter
      link: /charter/
    - theme: alt
      text: GitHub
      link: https://github.com/learnspec

features:
  - icon: 📝
    title: Markdown-first
    details: Every format is valid Markdown — readable in any editor, with no proprietary tooling required.
  - icon: 🗂️
    title: File-native
    details: All content lives in flat files. No database, no server, no lock-in. Clone a folder and you have the corpus.
  - icon: 🔀
    title: Git-native
    details: Versionable, diffable, mergeable. Educational content gets the same workflows as code.
  - icon: 🤖
    title: AI-native
    details: Designed for LLMs to generate and consume. Predictable structure, plain-text syntax, no embedded JSON.
  - icon: 📊
    title: Progressively enriched
    details: Each format defines Level 0 / 1 / 2 — start with plain text, add YAML and fenced blocks as you need them.
  - icon: 🪶
    title: Gracefully degradable
    details: A LearnSpec file is never broken in a standard Markdown reader — only less rich.
---

## A suite, not a single format

LearnSpec is an **open specification suite** for educational content. Each format is plain Markdown, each lives in flat files, and each composes with the others through a small set of shared mechanisms.

### The 9 formats

| Format | Extension | Role | Status |
|---|---|---|---|
| **[LearnMD](/learnmd/)** | `.learn.md` | Structured educational content | Stable — v0.3, evolving to v0.4 |
| **[QuizMD](/quizmd/)** | `.quiz.md` | Quizzes and assessments | Stable — evolving to v0.3 |
| **[TrackMD](/trackmd/)** | `.track.md` | Sequenced learning paths | Drafting v0.1 |
| **[FlashMD](/flashmd/)** | `.flash.md` | Flashcards and spaced repetition | Drafting v0.1 |
| **[DiagramMD](/diagrammd/)** | `.diagram.md` | Diagram syntax + reusable diagrams referenced via `!ref` | Drafting v0.2 |
| **[MediaMD](/mediamd/)** | `.media.md` | Media catalogue with licences | Drafting v0.1 |
| **[GlossaryMD](/glossarymd/)** | `.glossary.md` | Term definitions for a corpus | Drafting v0.1 |
| **[BadgeMD](/badgemd/)** | `.badge.md` | Micro-credentials (Open Badges 3.0) | Drafting v0.1 |
| **[CertMD](/certmd/)** | `.cert.md` | Macro-credentials | Drafting v0.1 |

### Three principles tie the suite together

1. **Graceful degradation** — any LearnSpec syntax that would produce a broken render in a standard Markdown reader is forbidden without an explicit fallback.
2. **File-native** — metadata lives in YAML frontmatter, references are paths or URLs, a corpus is a folder. No database is ever required to read content.
3. **Progressive levels** — every format has a Level 0 (pure Markdown), Level 1 (frontmatter), and Level 2 (fenced blocks and directives). Each level is a strict superset of the previous one.

These rules are documented in the **[Architecture Charter](/charter/)**, the shared foundation every format builds on.

### How the formats compose

A learning corpus typically combines several formats:

- A **TrackMD** sequences a path through several **LearnMD** lessons and **QuizMD** checkpoints.
- The lessons embed diagrams defined in **DiagramMD**, images catalogued in **MediaMD**, and highlight terms from a **GlossaryMD**.
- A **FlashMD** deck supports spaced-repetition review of the same material.
- Completion may award a **BadgeMD** (per skill) or a **CertMD** (per track).

All references are resolved through three directives — `!import`, `!ref`, `!checkpoint` — defined once in the charter and used identically across the suite.

---

## Status & governance

LearnSpec is an **open standard** under the MIT licence. Specifications, tooling, and reference parsers are developed in the open at [github.com/learnspec](https://github.com/learnspec). The standard is currently maintained by [Neuroneo](https://neuroneo.com), which also operates a commercial implementation; the specs themselves remain independent of any single platform.
