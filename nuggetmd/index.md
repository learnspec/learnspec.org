# NuggetMD

**The micro-learning format of the [LearnSpec](/) suite.**

A `.nugget.md` file hosts a collection of *nuggets* — short, self-contained concepts designed to be read in under three minutes each and reviewed over time via spaced repetition.

NuggetMD occupies a distinct position between [FlashMD](/flashmd/) and [LearnMD](/learnmd/): larger than an atomic fact, smaller than a full lesson. A nugget captures one applicable concept — *knowing how and when*, not just *knowing that*.

The author decides how many nuggets live in a file and when to split into several — structure follows the topic, not an arbitrary file-per-concept rule.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.nugget.md` file is valid Markdown readable in any editor |
| **File-native** | All content lives in files — no database required |
| **Graceful degradation** | Renders as a readable multi-section article in any standard reader |
| **Author-controlled granularity** | The author decides how many nuggets per file and when to split |
| **FSRS-ready** | Each nugget can independently enter a spaced-repetition queue |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

NuggetMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | `##` headings + `###` sub-sections | Nugget collection, readable everywhere |
| 1 | YAML frontmatter + per-nugget `nugget` block | Metadata, FSRS, per-nugget attributes |
| 2 | `### Check` recall question (QuizMD Level 0 syntax) | FSRS review mechanism |

## Quick example

```markdown
## Prefer enumerate() over range(len())

### Concept

When iterating over a list and needing both the index and the value,
`enumerate()` is the idiomatic Python choice.

### Why it matters

Next time you write `for i in range(len(...))`, ask: do I need both the
index and the value? If yes, switch to `enumerate()`.
```

## Status

NuggetMD is a **draft v0.1**.

## Next steps

- Read the full [Specification](/nuggetmd/spec).
