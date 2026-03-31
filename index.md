---
layout: home

hero:
  name: LearnSpec
  text: Open standards for structured learning content
  tagline: Markdown-first, git-native, AI-ready formats for teaching and assessment
  actions:
    - theme: brand
      text: LearnMD Spec
      link: /learnmd/
    - theme: alt
      text: QuizMD Spec
      link: /quizmd/

features:
  - icon: 📝
    title: Markdown First
    details: Valid Markdown files readable in any editor. No proprietary formats or lock-in.
  - icon: 🔀
    title: Git Native
    details: Versionable, diffable, and mergeable like code. Track changes with standard tools.
  - icon: 🤖
    title: AI Native
    details: Generatable and consumable by LLMs without special tooling or complex APIs.
  - icon: 📊
    title: Progressively Enriched
    details: Start with plain text (Level 0) and add structure as needed up to Level 2.
  - icon: 🔗
    title: Interoperable
    details: LearnMD and QuizMD work together as a complete teach-then-assess stack.
  - icon: 🧮
    title: Rich Content
    details: Built-in support for LaTeX math, ABC music notation, Penrose diagrams, and more.
---

## Why LearnSpec?

Education content is trapped in proprietary formats, walled gardens, and tools that don't talk to each other. LearnSpec defines two complementary open standards — **LearnMD** for instruction and **QuizMD** for assessment — that are plain-text, portable, and designed for the AI era.

### The Two Formats

| | LearnMD | QuizMD |
|---|---|---|
| **Purpose** | Teach | Assess |
| **Extension** | `.learn.md` | `.quiz.md` |
| **Core unit** | Section / Module | Question |
| **Standalone** | Yes | Yes |
| **Interop** | Embeds QuizMD checkpoints | Importable into LearnMD |

### Design Principles

- **No build step required** — files are readable as-is in any Markdown viewer
- **Progressive complexity** — start simple, add metadata and structure only when needed
- **Composable** — `!import` directives let you build paths from independent modules
- **Tool-friendly** — parsers, validators, and MCP integrations available
