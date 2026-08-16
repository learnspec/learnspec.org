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
| **Language-neutral** | Sub-section roles come from their order, not from fixed English labels — author in any language |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

NuggetMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | `##` headings + `###` sub-sections, roles carried by position | Nugget collection, readable everywhere |
| 1 | YAML frontmatter + per-nugget `nugget` block | Metadata, FSRS, per-nugget attributes |
| 2 | Recall question in the third `###` section (QuizMD Level 0 syntax) | FSRS review mechanism |

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

Since v0.3 the three sub-sections are identified by **position** — first, second,
third `###` in the nugget — so the headings can be written in any language:

```markdown
## Préférer enumerate() à range(len())

### Le concept

Quand on parcourt une liste en ayant besoin de l'indice *et* de la valeur,
`enumerate()` est la façon idiomatique de le faire en Python.

### Pourquoi c'est important

La prochaine fois que vous écrivez `for i in range(len(...))`, demandez-vous
si vous avez besoin des deux.
```

`Concept` / `Why it matters` / `Check` remain the recommended English labels for
interchange, and files written against v0.2 parse identically.

## Status

NuggetMD is a **draft v0.3**.

## Next steps

- Read the full [Specification](/nuggetmd/spec).
