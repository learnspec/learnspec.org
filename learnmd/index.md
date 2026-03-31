# LearnMD

**The open format for structured learning content.**

LearnMD is the companion format to QuizMD: where QuizMD covers assessment (testing what you know), LearnMD covers instruction (explaining what to know). Together they form a complete **teach → assess** stack, all in portable plain-text files.

## Key Principles

| Principle | Description |
|-----------|-------------|
| **Markdown-first** | A `.learn.md` file is valid Markdown — readable in any editor |
| **Git-native** | Versionable, diffable, and mergeable like code |
| **AI-native** | Generatable and consumable by LLMs without special tooling |
| **Progressively enriched** | Plain text (Level 0) up through special fenced blocks (Level 2) |
| **QuizMD-interoperable** | Inline quiz blocks and `!import` directive to embed checkpoints |

## Format Levels

| Level | Mechanism | Purpose |
|-------|-----------|---------|
| 0 | Plain `.learn.md`, pure Markdown | Minimal learning content, human-readable |
| 1 | YAML frontmatter + GFM callouts | Metadata, estimated time, language |
| 2 | Special fenced blocks + directives | Examples, summaries, inline quizzes, imports |

Each level is a strict superset of the previous one. A Level 0 file is valid at Level 1 and 2.

## Quick Example

```markdown
---
title: Introduction to Python
lang: en
estimated_time: 15min
tags: [python, variables]
---

# Introduction to Python

## Module 1 — Variables

A variable is a named reference to a value in memory.

\`\`\`python
age = 25
name = "Alice"
\`\`\`

> [!tip]
> Use descriptive names: `student_count` is clearer than `n`.

\`\`\`quiz
? Which syntax is valid Python?
- [x] age = 25
- [ ] int age = 25
- [ ] var age = 25
\`\`\`
```

## Next Steps

- Read the full [Specification](/learnmd/spec)
- Try the [Getting Started](/learnmd/getting-started) guide
- Browse [Examples](/learnmd/examples)
