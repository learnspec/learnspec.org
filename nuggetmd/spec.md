# NuggetMD — Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft.

## Core principle

NuggetMD is the **micro-learning format** of the LearnSpec suite. A `.nugget.md` file hosts a collection of nuggets — short, self-contained concepts designed to be read in under 3 minutes each and reviewed over time via spaced repetition.

The author decides how many nuggets to put in a file and when to split into multiple files. A file may contain a single nugget or dozens. Structure follows the topic, not an arbitrary file-per-concept rule.

NuggetMD occupies a distinct position between FlashMD and LearnMD:

| | FlashMD | NuggetMD | LearnMD |
|---|---|---|---|
| Unit | Atomic fact | Applicable concept | Full lesson |
| Review time | 5–30 sec | 1–3 min | 10–60 min |
| Memory type | Declarative — *knowing that* | Procedural — *knowing how / when* | Structured instruction |
| File structure | Many cards per file | Many nuggets per file | One document per file |

NuggetMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

| Principle | Description |
|---|---|
| **Markdown-first** | A `.nugget.md` file is valid Markdown readable in any editor |
| **File-native** | All content lives in files — no database required |
| **Graceful degradation** | Renders as a readable multi-section article in any standard reader |
| **Author-controlled granularity** | The author decides how many nuggets per file and when to split |
| **FSRS-ready** | Each nugget can independently enter a spaced repetition queue |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | `##` headings + `###` sub-sections | Nugget collection, readable everywhere |
| 1 | YAML frontmatter + per-nugget `nugget` block | Metadata, FSRS, per-nugget attributes |
| 2 | `### Check` recall question (QuizMD Level 0 syntax) | FSRS review mechanism |

## Level 0 — Heading-based structure

Each nugget is a `##` heading. Its three sub-sections are `###` headings with fixed labels. The file reads as a natural Markdown document — no tooling required.

```markdown
# Python Best Practices

## Prefer enumerate() over range(len())

### Concept

When iterating over a list and needing both the index and the value,
`enumerate()` is the idiomatic Python choice. It returns an iterator of
`(index, value)` pairs, making your code more readable and slightly faster.

### Why it matters

Next time you write `for i in range(len(...))`, stop and ask: do I need
both the index and the value? If yes, switch to `enumerate()`.

---

## Use zip() to iterate over multiple lists simultaneously

### Concept

`zip()` takes two or more iterables and returns an iterator of tuples,
pairing elements at the same index across all iterables.

### Why it matters

Instead of managing indices manually to combine two lists, `zip()` makes
the intent immediately clear and eliminates off-by-one errors.
```

### Structure rules

- The **`# H1`** is the file title — optional, inferred from frontmatter `title` if absent.
- Each **`## H2`** heading opens one nugget. The heading text is the nugget title.
- Inside each nugget, up to three **`### H3`** sub-sections with fixed labels:

| Sub-section | Heading label | Required | Purpose |
|---|---|---|---|
| Concept | `### Concept` | **Yes** | The concept, explained in 2–5 sentences |
| Why it matters | `### Why it matters` | **Yes** | One concrete example or actionable takeaway |
| Check | `### Check` | No — strongly recommended when FSRS is active | One recall question |

- A **`---` horizontal rule** between nuggets is optional but strongly recommended for visual clarity.
- No `####` or deeper headings inside a nugget — if more structure is needed, the content belongs in LearnMD.

## Level 1 — Frontmatter and per-nugget metadata

### File-level frontmatter

```yaml
---
title: "Python Best Practices"          # optional — inferred from # H1
lang: en                                 # REQUIRED — BCP-47 code
tags: [python, best-practices]           # optional — file-level tags
spaced_repetition: fsrs                  # optional — fsrs | sm2 | false (default: false)
author: Jane Smith                       # optional
created: 2026-05-10                      # optional — ISO 8601
updated: 2026-05-10                      # optional — ISO 8601
license: CC-BY-4.0                       # optional — SPDX identifier or custom
spec_version: "0.1"                      # optional
---
```

`spaced_repetition` at file level sets the default for all nuggets in the file. It can be overridden per nugget.

### Per-nugget metadata block

An optional empty fenced `nugget` block placed **immediately after the `##` heading** carries per-nugget attributes. It contains no body — attributes only.

````markdown
## Prefer enumerate() over range(len())

```nugget id:enumerate tags:[iteration] level:beginner related:[zip-function,unpacking]
```

### Concept
...
````

In a standard Markdown reader, the empty fenced block renders as a small empty code block — readable and unobtrusive. A LearnSpec parser extracts the attributes; the player may render them as a discrete metadata badge.

### Per-nugget attribute reference

| Attribute | Status | Type | Description |
|---|---|---|---|
| `id` | Recommended | string | Stable unique slug within the file. Auto-generated from the heading slug if absent. Enables precise FSRS tracking. |
| `tags` | Optional | string[] | Per-nugget tags. Added to file-level tags. |
| `level` | Optional | enum | `beginner`, `intermediate`, `advanced`. Overrides file-level default. |
| `spaced_repetition` | Optional | enum | Per-nugget override: `fsrs`, `sm2`, or `false`. Overrides file-level setting. |
| `related` | Optional | string[] | Slugs of related nuggets within the same file or other `.nugget.md` files. Informational only — no import dependency. The player may surface these as "next nugget" suggestions. |

## Level 2 — Recall question

The `### Check` section contains a single recall question in **QuizMD Level 0 syntax** — no fenced block wrapper, no scoring configuration.

```markdown
### Check

? Which built-in function gives you both the index and the value
when iterating over a list?

- [x] enumerate()
- [ ] range(len())
- [ ] zip()
- [ ] iter()
```

This is the FSRS recall mechanism. After reading the nugget, the learner answers, then rates their confidence. No scoring, no `feedback_mode` — recall rating only.

## Complete example

````markdown
---
title: "Python Best Practices"
lang: en
tags: [python, best-practices]
spaced_repetition: fsrs
author: Jane Smith
created: 2026-05-10
license: CC-BY-4.0
spec_version: "0.1"
---

# Python Best Practices

## Prefer enumerate() over range(len())

```nugget id:enumerate tags:[iteration] level:beginner related:[zip-function]
```

### Concept

When iterating over a list and needing both the index and the value,
`enumerate()` is the idiomatic Python choice. It returns an iterator of
`(index, value)` pairs, making your code shorter and more readable.

```python
# ❌ Avoid
for i in range(len(fruits)):
    print(i, fruits[i])

# ✅ Prefer
for i, fruit in enumerate(fruits):
    print(i, fruit)
```

You can also set a custom start index: `enumerate(fruits, start=1)`.

### Why it matters

Next time you write `for i in range(len(...))`, stop and ask: do I need
both the index and the value? If yes, switch to `enumerate()`. Your code
reviewer will thank you.

### Check

? Which function gives you both the index and the value when iterating?

- [x] enumerate()
- [ ] range(len())
- [ ] zip()
- [ ] index()

---

## Use zip() to iterate over multiple lists simultaneously

```nugget id:zip-function tags:[iteration] level:beginner related:[enumerate,unpacking]
```

### Concept

`zip()` takes two or more iterables and returns an iterator of tuples,
pairing elements at the same position. It stops at the shortest iterable.

```python
names = ["Alice", "Bob", "Carol"]
scores = [88, 92, 79]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

### Why it matters

Instead of managing a shared index across two lists, `zip()` makes the
pairing explicit and eliminates off-by-one errors entirely.

### Check

? What does zip() do when the two iterables have different lengths?

- [x] It stops at the shortest one
- [ ] It raises a ValueError
- [ ] It pads the shorter one with None
- [ ] It stops at the longest one

---

## Unpack tuples directly in loops

```nugget id:unpacking tags:[iteration,tuples] level:intermediate
```

### Concept

When iterating over a list of tuples, Python lets you unpack each tuple
directly in the `for` statement, eliminating indexed access and making
variable names self-documenting.

```python
# ❌ Less clear
for item in coordinates:
    print(item[0], item[1])

# ✅ Clearer
for x, y in coordinates:
    print(x, y)
```

### Why it matters

Tuple unpacking pairs naturally with `enumerate()` and `zip()` — both
produce tuples. Combining them gives you expressive, readable iteration
with zero boilerplate.

### Check

? Which syntax correctly unpacks a tuple in a for loop?

- [x] for x, y in pairs:
- [ ] for (x, y) = pairs:
- [ ] for pair.unpack() in pairs:
- [ ] for x and y in pairs:
````

## Reading-time constraint

The 3-minute limit applies **per nugget**, not per file. A file with 20 nuggets is valid as long as each individual nugget reads in under 3 minutes.

| Condition | Level |
|---|---|
| Estimated reading time of a single nugget > 3 min | **Error** |
| Estimated reading time of a single nugget > 2.5 min | Warning |

Estimation: `word_count / 200` wpm, rounded up to the nearest 30 seconds. If a nugget exceeds the limit, the content belongs in LearnMD.

## FSRS integration

When `spaced_repetition: fsrs` is active (file-level or per-nugget), each nugget enters its own independent FSRS slot in the player's review queue. Nuggets within the same file are tracked individually.

```
1. Learner reads the nugget (Concept + Why it matters)
2. Learner answers the ### Check question (if present)
3. Learner rates recall confidence:
      Again (1) — didn't remember
      Hard  (2) — remembered with effort
      Good  (3) — remembered correctly
      Easy  (4) — instantly recalled
4. FSRS calculates the next review interval for this specific nugget
5. Nugget is scheduled — other nuggets in the same file are unaffected
```

FlashMD and NuggetMD feed **separate FSRS queues** — never mixed:

| | FlashMD | NuggetMD |
|---|---|---|
| Review duration | ~10 sec | ~2 min |
| Typical "Easy" interval | 4–7 days | 14–30 days |
| Player queue label | Cards | Concepts |

## Interoperability

| Mechanism | Support |
|---|---|
| Imported by TrackMD via `!import` | ✅ |
| Imported by LearnMD via `!import` | ✅ |
| `!ref ./curriculum.curriculum.md` | ✅ — declares curriculum alignment |
| `!ref ./glossary.glossary.md` | ✅ — enables term highlighting |
| `!ref ./media.media.md` | ✅ — enables `media:slug` resolution |
| `!import` of other formats | ❌ — leaf format |
| FSRS (player-managed, per nugget) | ✅ when `spaced_repetition` is set |

### In a TrackMD

```markdown
## Section 3 — Iteration in Python

!import ./03-iteration.learn.md
!import ./quiz-iteration.quiz.md
!import ./flashcards-iteration.flash.md
!import ./nuggets-iteration.nugget.md optional:true
```

## Validation

### Lenient mode (default)

| Condition | Level |
|---|---|
| `lang` absent from frontmatter | Warning |
| `### Concept` missing from a nugget | Error |
| `### Why it matters` missing from a nugget | Error |
| More than one `### Check` question in a single nugget | Error |
| Duplicate `id` within the file | Error |
| `### Check` missing when `spaced_repetition` is active on that nugget | Warning |
| Estimated reading time of a nugget > 2.5 min | Warning |
| Estimated reading time of a nugget > 3 min | **Error** |
| `####` or deeper heading inside a nugget | Warning |
| `### H3` with a label other than `Concept`, `Why it matters`, `Check` | Warning |

### Strict mode (`--strict`)

All warnings are promoted to errors.

## Decisions deferred to v0.2

| Feature | Reason for deferral |
|---|---|
| Contextual triggers (`event: before_meeting`) | Player implementation complexity |
| Audio / video nuggets | Binary content outside Markdown scope |
| Cross-file `related` resolution | Requires corpus-level indexing — player concern |
