# CurriculumMD

**The reference format of the [LearnSpec](/) suite.**

CurriculumMD describes what a content corpus *must* cover — a school syllabus, a professional certification framework, an internal training plan — without being pedagogical content itself.

It is the first **meta** format in the suite: it contains no lessons, quizzes or flashcards, only the reference learning objectives against which a LearnSpec corpus can be assessed. Alignment between a curriculum and a corpus is performed by the AI or the player — never by the spec itself.

CurriculumMD is a **pure leaf format**: it imports and references no other LearnSpec format. It is always the endpoint of a `!ref`, never the emitter.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.curriculum.md` file is valid Markdown readable in any editor |
| **File-native** | The whole framework lives in a single file — no database required |
| **Graceful degradation** | Headings + lists — readable everywhere like an official syllabus |
| **AI-native** | Designed to be consumed by an LLM during alignment checks |
| **Reference, not content** | CurriculumMD describes what must be learned — not how to teach it |

CurriculumMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | Headings + objective lists | Minimal syllabus readable everywhere |
| 1 | YAML frontmatter | Institutional metadata, version, country, level |
| 2 | Inline per-objective attributes | Identifiers, Bloom level, weighting, mandatory flag |

## Quick example

```markdown
# General Baccalaureate — Mathematics (Final Year)

## Domain 1 — Analysis

### 1.1 Numerical sequences

- Define a sequence by recurrence or by its general term
- Prove the convergence or divergence of a sequence
- Reason by induction
```

## Status

CurriculumMD is a **draft v0.1**.

## Next steps

- Read the full [Specification](/curriculummd/spec).
