# QuizMD — Format Specification v0.3

> Part of the [LearnSpec](/) suite. Draft based on v0.2.

## Core principle: YAML everywhere

QuizMD uses **YAML as its single configuration syntax**, applied across three progressive and backward-compatible levels. Keys are the same at every level — one mental model to learn.

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | Plain `.quiz.md`, no configuration | Minimal quiz, human-readable |
| 1 | YAML frontmatter at top of file | Global metadata, behaviour, scoring |
| 2 | Per-question ` ```quiz ` fenced block | Per-question overrides (points, timer, hint) |

A Level 0 file is valid at Level 1 and 2. Each level is a strict superset of the previous one.

| Principle | Description |
|---|---|
| **Markdown-first** | A `.quiz.md` file is valid Markdown readable in any editor |
| **File-native** | All content lives in files — no database required |
| **YAML everywhere** | One configuration syntax across all three levels |
| **AI-native** | Generatable and consumable by LLMs without specific tooling |
| **LearnSpec-interoperable** | Natively integrates with LearnMD, DiagramMD, MediaMD, and GlossaryMD |

QuizMD inherits its frontmatter, directives, and validation rules from the shared [Architecture Charter](/charter/).

## Level 0 — Base Markdown syntax

### Conventions

| Syntax | Meaning |
|---|---|
| `## Qn` or `## Qn · Title` | Start of a question |
| `- [x]` | Correct answer choice |
| `- [ ]` | Incorrect answer choice |
| `___` | Open-answer field (short answer / fill-in-the-blank) |
| `---` | Question separator (optional when `##` is used) |
| `> text` | Feedback / explanation (shown after submission) |
| `!import ./file.quiz.md` | Include questions from a sub-quiz file |
| `!import ./file.diagram.md` | Include DiagramMD diagram blocks in a question body |
| `!ref ./file.media.md` | Declare a MediaMD context (enables `media:slug` resolution) |
| `!ref ./file.glossary.md` | Declare a GlossaryMD context (enables term highlighting) |
| `$...$` | Inline LaTeX math formula |
| `$$...$$` | Block (display) LaTeX math formula |
| `![alt](media:slug "fallback-url")` | Image via MediaMD with fallback |
| `![alt](url)` | Direct image |

### Question body

The body of a question is all Markdown content between the `## Qn` heading (and its optional ` ```quiz ` block) and the first answer choice (`- [ ]` / `- [x]`) or the `___` marker. The body may contain paragraphs, lists, tables, formulas, images, and diagrams — any valid Markdown.

This mechanism supports **passage-based questions** (reading comprehension, physics problems, legal cases) without any additional syntax.

### Minimal example

```markdown
# My first quiz

## Q1 · What is the capital of France?

- [ ] London
- [x] Paris
- [ ] Berlin

> Paris has been the capital since the 10th century.

## Q2 · True or false: The Earth is flat.

- [ ] True
- [x] False

## Q3 · Fill in the blank: The sun is a ___.

**Answer:** star
```

## Question types

### MCQ — single correct answer

One `- [x]` marks the correct choice. All other choices use `- [ ]`.

```markdown
## Q1 · Which composer wrote "The Four Seasons"?

- [ ] Johann Sebastian Bach
- [ ] George Frideric Handel
- [x] Antonio Vivaldi
- [ ] Arcangelo Corelli

> "The Four Seasons" (1725) is a set of four violin concertos by Vivaldi.
```

### Multi-select — multiple correct answers

Two or more `- [x]` marks indicate multiple correct choices. Players should display checkboxes rather than radio buttons.

```markdown
## Q2 · Which are characteristics of Baroque music?

- [x] Basso continuo
- [x] Terraced dynamics
- [ ] Twelve-tone serialism
- [x] Elaborate ornamentation
- [x] Counterpoint and polyphony
- [ ] Minimalist texture
```

### Open answer — fill in the blank

The `___` marker signals a free-text input field. The expected answer follows on an `**Answer:**` line.

```markdown
## Q3 · Fill in the blank: Bach's 30 keyboard variations are known as the ___ Variations.

**Answer:** Goldberg
```

Multiple blanks in a single question are supported by repeating `___`:

```markdown
## Q4 · Complete: ___ was born in ___, Germany.

**Answer:** Handel | Halle
```

### True / False

A True/False question is an MCQ with exactly two choices labelled `True` and `False`.

### Match pairs

Associates items from two columns. Declared with `type: match` in the per-question block.

````markdown
## Q5 · Match each composer with their nationality.

```quiz
type: match
points: 4
```

| Composer | Nationality |
|---|---|
| Bach | German |
| Vivaldi | Italian |
| Handel | German |
| Rameau | French |
````

### Order

Asks the learner to sort items into the correct sequence. Declared with `type: order`. The correct order is the order in which items appear in the list.

````markdown
## Q6 · Place these composers in chronological order of birth.

```quiz
type: order
points: 3
```

1. Claudio Monteverdi (1567)
2. Heinrich Schütz (1585)
3. Jean-Baptiste Lully (1632)
4. Henry Purcell (1659)
5. Antonio Vivaldi (1678)
````

## Diagrams and media in questions

### Diagrams

A question body may contain diagram blocks using **DiagramMD Level 0** fenced block syntax with optional Level 2 attributes (`caption`, `width`, `alt`). The DiagramMD frontmatter (Level 1) is not applicable.

````markdown
## Q7 · What type of circuit is shown below?

```tikz caption:"Circuit diagram" alt:"Series circuit with resistor and capacitor"
\begin{tikzpicture}
  \draw (0,0) to[R, l=$R$] (2,0) to[C, l=$C$] (4,0);
\end{tikzpicture}
```

- [x] Series RC circuit
- [ ] Parallel RL circuit
- [ ] Series LC circuit
````

For diagrams reused across multiple questions, use `!import ./file.diagram.md`.

### Images via MediaMD

```markdown
!ref ./media-biology.media.md

## Q9 · Which organelle is shown in the image?

![Plant cell diagram](media:plant-cell "https://upload.wikimedia.org/.../plant-cell.svg")

- [x] Chloroplast
- [ ] Mitochondrion
- [ ] Nucleus
```

## Feedback syntax

QuizMD supports four levels of feedback, freely combinable within a single question:

| Syntax | Scope | When displayed |
|---|---|---|
| ` > text` (indented under a choice) | Per-choice | Only when that choice is selected |
| `> [!correct] text` | Global | Only when the answer is correct |
| `> [!incorrect] text` | Global | Only when the answer is incorrect |
| `> text` | Global | Always (general explanation) |

### Display priority

1. Per-choice feedback is displayed **inline**, below the option, only if the learner selected it.
2. `[!correct]` or `[!incorrect]` appears in the result banner according to the outcome.
3. Global `>` feedback always appears in the result banner, after the targeted feedback.
4. For open-answer questions, only global feedback applies.

## The `!import` directive

Includes questions from another `.quiz.md` file or diagrams from a `.diagram.md` file.

```markdown
!import ./sub-quiz.quiz.md
!import ./diagrams-physics.diagram.md
```

- Questions from the sub-quiz are inserted at the position of the directive.
- Questions are renumbered sequentially across the full assembled quiz.
- The frontmatter of the sub-quiz is ignored.
- Imports are recursive — circular imports are silently skipped.
- Missing files are ignored without error (warning in lenient mode).

## Reveal and feedback modes

### `reveal` — question display

| Value | Behaviour |
|---|---|
| `all` (default) | All questions displayed at once |
| `sequential` | Questions revealed one at a time |

### `feedback_mode` — when corrections appear

| Value | Behaviour |
|---|---|
| `immediate` (default) | Correction shown immediately after submission |
| `deferred` | Answers recorded without revealing corrections; results shown at the end |

### Typical combinations

| `reveal` | `feedback_mode` | Use case |
|---|---|---|
| `all` | `immediate` | Practice mode (default) |
| `sequential` | `immediate` | Guided progression |
| `all` | `deferred` | Paper-style exam |
| `sequential` | `deferred` | Exam mode |

## Level 1 — YAML frontmatter

### Field reference

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | string | No | — | Quiz title — inferred from the first `# H1` if absent |
| `lang` | BCP-47 | **Yes** | — | Language code (`en`, `fr`, `en-US`…) |
| `description` | string | No | — | Short description |
| `author` | string or object | No | — | Author name, or `{name, email, url}` |
| `tags` | string[] | No | `[]` | Thematic tags |
| `domain` | enum | No | — | `recreational`, `academic`, `corporate`, `certification` |
| `reveal` | enum | No | `all` | `all` or `sequential` |
| `feedback_mode` | enum | No | `immediate` | `immediate` or `deferred` |
| `shuffle_questions` | bool | No | `false` | Randomise question order |
| `shuffle_answers` | bool | No | `true` | Randomise answer choice order |
| `passing_score` | float | No | — | Minimum ratio to pass (0.0–1.0) |
| `time_limit` | int | No | — | Total time limit in seconds |
| `scoring.correct` | int | No | 1 | Points per correct answer |
| `scoring.incorrect` | int | No | 0 | Points per incorrect answer |
| `created` | date | No | — | Creation date, ISO 8601 |
| `updated` | date | No | — | Last update date, ISO 8601 |
| `license` | string | No | — | SPDX identifier or `custom` |
| `spec_version` | string | No | — | Targeted spec version (e.g. `"0.3"`) |

### Example

```yaml
---
title: Physics — Geometric Optics
lang: en
domain: academic
passing_score: 0.6
reveal: sequential
feedback_mode: deferred
shuffle_answers: true
time_limit: 1800
scoring:
  correct: 2
  incorrect: -1
created: 2026-05-10
license: CC-BY-4.0
spec_version: "0.3"
---
```

## Level 2 — Per-question fenced block

A ` ```quiz ` block placed immediately after the question heading overrides global parameters for that specific question.

````markdown
## Q3 · Match each element to its geological period.

```quiz
id: geo-match-01
type: match
points: 6
hint: "Think about the geological time scale"
difficulty: hard
tags: [geology, chronology]
bloom: application
```
````

### Per-question field reference

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable unique identifier for this question |
| `type` | enum | `mcq`, `multi`, `open`, `tf`, `match`, or `order` — inferred if absent |
| `points` | int | Points for this question (overrides `scoring.correct`) |
| `timer` | int | Per-question time limit in seconds |
| `hint` | string | Hint shown on demand before submission |
| `difficulty` | enum | `easy`, `medium`, or `hard` |
| `tags` | string[] | Per-question thematic tags |
| `bloom` | enum | Bloom's taxonomy level |
| `depends_on` | string | ID of a question this one is conditional on |

**Type inference:**

| Condition | Inferred type |
|---|---|
| One `- [x]` | `mcq` |
| Two or more `- [x]` | `multi` |
| `___` present | `open` |
| Exactly two choices `True` / `False` | `tf` |

## Math support

LaTeX is auto-detected and rendered via KaTeX. No frontmatter flag required.

| Form | Syntax | Rendering |
|---|---|---|
| Inline | `$E = mc^2$` | Embedded in the line of text |
| Block | `$$\int_0^\infty e^{-x}\,dx = 1$$` | Centred on its own line |

## Diagram support

QuizMD supports **DiagramMD Level 0** fenced blocks in question bodies. See the [DiagramMD spec](/diagrammd/) for full syntax and supported types.

## Partial scoring

When `partial_scoring: true` (default), **match** and **order** questions award a proportional score.

- **match**: `score = correct_pairs / total_pairs`
- **order**: Kendall's tau (concordant pairs / all pairs)

## Syntax reference

| Element | Syntax | Level |
|---|---|---|
| Quiz title | `# Title` | 0 |
| Question heading | `## Q1` or `## Q1 · Title` | 0 |
| Correct choice | `- [x] text` | 0 |
| Incorrect choice | `- [ ] text` | 0 |
| Open answer marker | `___` | 0 |
| Expected answer | `**Answer:** value` | 0 |
| Per-choice feedback | ` > text` (indented) | 0 |
| Correct-only feedback | `> [!correct] text` | 0 |
| Incorrect-only feedback | `> [!incorrect] text` | 0 |
| General feedback | `> text` | 0 |
| Sub-quiz import | `!import ./file.quiz.md` | 0 |
| Diagram import | `!import ./file.diagram.md` | 0 |
| Declare MediaMD | `!ref ./file.media.md` | 0 |
| Declare GlossaryMD | `!ref ./file.glossary.md` | 0 |
| Inline math | `$formula$` | 0 |
| Block math | `$$formula$$` | 0 |
| Image via MediaMD | `![alt](media:slug "fallback")` | 0 |
| Direct image | `![alt](url)` | 0 |
| Diagram block | ` ```{type} [caption:"..."] [alt:"..."] ` | 0 |
| Frontmatter | `---` YAML `---` | 1 |
| Per-question config | ` ```quiz ` YAML ` ``` ` | 2 |

## Validation

### Lenient mode (default)

| Condition | Level |
|---|---|
| `lang` absent from frontmatter | Warning |
| `title` absent (no H1 and no frontmatter `title`) | Warning |
| No correct answer in an MCQ | Warning |
| Unclosed ` ```quiz ` block | Error |
| `!import` pointing to a missing file | Warning |
| `!ref` pointing to a missing file | Warning |
| `media:slug` without a matching `!ref` MediaMD | Warning |
| `media:slug` without a fallback URL | Warning |
| Frontmatter YAML parse error | Error |

### Strict mode (`--strict`)

| Condition | Level |
|---|---|
| `lang` absent | Error |
| `title` absent | Error |
| No correct answer in any question | Error |
| `!ref` pointing to a missing file | Error |
| `media:slug` without a fallback URL | Error |
| All lenient-mode errors | Error |

## Changes from v0.2

| Element | Change |
|---|---|
| `lang` | Promoted from "not required" to **required** — alignment with LearnSpec charter |
| `title` | Demoted from "required" to **optional** — inferred from the first `# H1` |
| Frontmatter | Added `created`, `updated`, `license` (universal LearnSpec fields) |
| `!import` | Added `.diagram.md` support |
| `!ref` | New directive — declares MediaMD and GlossaryMD contexts |
| Images | New `media:slug` syntax via MediaMD in question bodies |
| Diagrams | Explicit support for DiagramMD Level 0 blocks in question bodies |
| ABC | Section removed — delegates to DiagramMD spec |
| Principles | Added "LearnSpec-interoperable" |
