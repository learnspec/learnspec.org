# LearnMD

**The educational content format of the [LearnSpec](/) suite.**

LearnMD covers instruction — explaining what to know — while [QuizMD](/quizmd/) covers assessment. Together they form a complete **teach → assess** stack, all in portable plain-text files.

A complete course — modules, lessons, examples, exercises, embedded quizzes — can live in a single valid `.learn.md` file. The `!import` directive is a composition tool for reusability, not a prerequisite.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.learn.md` file is valid Markdown — readable in any editor |
| **File-native** | All content lives in files — no database required |
| **Git-native** | Versionable, diffable, and mergeable like code |
| **AI-native** | Generatable and consumable by LLMs without special tooling |
| **Progressively enriched** | Plain text (Level 0) up through special fenced blocks (Level 2) |
| **LearnSpec-interoperable** | Natively integrates with QuizMD, DiagramMD, MediaMD, and GlossaryMD |

LearnMD inherits its frontmatter, directives, and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | Plain `.learn.md`, native Markdown | Minimal content, readable everywhere |
| 1 | YAML frontmatter + GFM callouts | Metadata, estimated time, language |
| 2 | Special fenced blocks + directives | Examples, summaries, inline quizzes, imports |

Each level is a strict superset of the previous one.

## Quick example

````markdown
---
title: Introduction to Python
lang: en
estimated_time: 15min
tags: [python, variables]
spec_version: "0.4"
---

# Introduction to Python

!ref ./glossary-python.glossary.md

## Module 1 — Variables

A variable is a named reference to a value in memory.

```python
age = 25
name = "Alice"
```

> [!tip]
> Use descriptive names: `student_count` is clearer than `n`.

```quiz
? Which syntax is valid Python?
- [x] age = 25
- [ ] int age = 25
- [ ] var age = 25
```

!checkpoint id:module-1-done label:"Module 1 complete"
````

## Status

LearnMD v0.3 is stable. **v0.4** is drafting to align with the new LearnSpec suite — it extracts diagram syntax to [DiagramMD](/diagrammd/), media catalogues to [MediaMD](/mediamd/), and term definitions to [GlossaryMD](/glossarymd/), and adds the universal `!ref` and `!checkpoint` directives.

## Next steps

- Read the full [Specification](/learnmd/spec).
- Try the [Getting Started](/learnmd/getting-started) guide.
- Browse [Examples](/learnmd/examples).
