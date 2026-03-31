# QuizMD

**The open format for assessments and quizzes.**

QuizMD uses Markdown with YAML configuration to create quizzes, exams, and assessments. From simple flashcard-style questions to full scored exams with timed sections — all in plain text.

## Key Principles

| Principle | Description |
|-----------|-------------|
| **YAML everywhere** | One configuration syntax across three progressive levels |
| **Markdown-first** | Valid Markdown files readable in any editor |
| **Git-native** | Versionable, diffable, and mergeable like code |
| **AI-native** | Generatable and consumable by LLMs without special tooling |
| **Rich question types** | MCQ, multi-select, open answer, true/false, match, and order |

## Format Levels

| Level | Mechanism | Purpose |
|-------|-----------|---------|
| 0 | Plain `.quiz.md`, no configuration | Minimal quiz, human-readable |
| 1 | YAML frontmatter at top of file | Global metadata, behavior, scoring |
| 2 | Per-question fenced block | Per-question overrides (points, timer, hint) |

Each level is a strict superset of the previous one.

## Quick Example

```markdown
---
title: Physics Exam
lang: en
domain: academic
passing_score: 0.6
reveal: sequential
feedback_mode: deferred
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

## Next Steps

- Read the full [Specification](/quizmd/spec)
- Try the [Getting Started](/quizmd/getting-started) guide
- Browse [Examples](/quizmd/examples)
