# QuizMD

**The assessment format of the [LearnSpec](/) suite.**

QuizMD uses Markdown with progressive YAML configuration to create quizzes, exams, and assessments — from simple practice questions to full scored exams with timed sections, all in portable plain-text files.

[LearnMD](/learnmd/) covers instruction; QuizMD covers assessment. The two compose freely: a `.quiz.md` can be embedded inline in a lesson via `!import`.

## Key principles

| Principle | Description |
|---|---|
| **YAML everywhere** | One configuration syntax across three progressive levels |
| **Markdown-first** | Valid Markdown files readable in any editor |
| **File-native** | All content lives in files — no database required |
| **AI-native** | Generatable and consumable by LLMs without special tooling |
| **Rich question types** | MCQ, multi-select, open answer, true/false, match, order |
| **LearnSpec-interoperable** | Natively integrates with LearnMD, DiagramMD, MediaMD, GlossaryMD |

QuizMD inherits its frontmatter, directives, and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | Plain `.quiz.md`, no configuration | Minimal quiz, human-readable |
| 1 | YAML frontmatter at top of file | Global metadata, behaviour, scoring |
| 2 | Per-question fenced block | Per-question overrides (points, timer, hint) |

Each level is a strict superset of the previous one.

## Quick example

```markdown
---
title: Physics Exam
lang: en
domain: academic
passing_score: 0.6
reveal: sequential
feedback_mode: deferred
spec_version: "0.3"
---

# Physics Exam

## Q1 · What is the speed of light in a vacuum?

- [ ] 150,000 km/s
- [x] 299,792 km/s
- [ ] 1,000,000 km/s

> The speed of light is c ≈ 2.998 × 10⁸ m/s.

## Q2 · State Newton's second law: F = ___.

**Answer:** ma

> F = ma: net force equals mass times acceleration.
```

## Status

QuizMD is stable. **v0.3** is drafting to align with the new LearnSpec suite — it requires the universal `lang` field, adds `!ref` for [MediaMD](/mediamd/) and [GlossaryMD](/glossarymd/) contexts, supports `media:slug` images with fallback URLs, and delegates diagram syntax to [DiagramMD](/diagrammd/).

## Next steps

- Read the full [Specification](/quizmd/spec).
- Try the [Getting Started](/quizmd/getting-started) guide.
- Browse [Examples](/quizmd/examples).
