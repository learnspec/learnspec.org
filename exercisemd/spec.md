# ExerciseMD: Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft.
> File extension: `.exercise.md` (companion: `.solution.md`)

---

## Purpose

ExerciseMD describes **exercises**: tasks where the learner *produces* work, a
derivation, a proof, an essay, a translation, a program, and where grading
means **judging that production against a model solution, explicit
expectations, and a point-by-point rubric**.

One file carries the complete pedagogical object: statement, progressive
hints, worked solution, expectations, and rubric. From that single canonical
file, tools mechanically derive the two everyday artifacts:

- the **subject** (statement only, for an exam paper or a printable worksheet),
- the **grading kit** (solution + expectations + rubric, for a teacher or an
  AI grader).

The format is designed to serve both **practice** (self-training with hints
and worked solutions) and **assessment** (exams, tests, homework) without
changing syntax, only what is revealed changes.

---

## The QuizMD Boundary

ExerciseMD and QuizMD are complementary, not overlapping. The rule:

> **If the answer can be graded by matching** (choices, blanks, pairs,
> order, short expected answers) → **QuizMD**.  
> **If grading requires judging a production** against a model solution and
> a rubric → **ExerciseMD**.

| | QuizMD | ExerciseMD |
|---|---|---|
| Learner output | Selection or short answer | Free production (text, math, code…) |
| Ground truth | The expected answer | A model solution (one valid path among others) |
| Grading | Deterministic matching | Rubric-based judgment (human or AI) |
| Atom | Question (`## Qn`) | Exercise (`## En`) with sub-questions (`### a)`) |
| Typical use | Self-check, quiz, MCQ exam part | Problem set, essay, exam production part |

A real exam usually mixes both: the MCQ part is a `.quiz.md`, the production
part is an `.exercise.md`, and the full subject is assembled with [TrackMD](/trackmd/).
ExerciseMD deliberately has **no closed-answer syntax** (no `- [x]`, no
`___`): if you need one, that piece belongs in a QuizMD file.

One boundary case looks closed but is not: **justified true/false**
("state whether the claim is true or false; every answer must be
justified"). What earns the points is the justification, a production
judged against expectations, so it belongs in ExerciseMD, with the verdict
carried by `[!answer]`.

---

## Core Principles

| Principle | Description |
|---|---|
| **Markdown-first** | An `.exercise.md` file is valid Markdown, readable and *printable* from any editor |
| **File-native** | All content lives in files, no database required |
| **YAML everywhere** | One configuration syntax across all levels, shared with the rest of the suite |
| **AI-native** | Generatable by LLMs without tooling; the rubric makes AI grading reproducible and auditable |
| **Solution-complete** | The canonical file contains statement *and* solution *and* rubric, an exercise without its grading contract is incomplete |
| **Strippable** | The subject and the grading kit are derived from the canonical file by a mechanical, reversible operation, never maintained by hand in parallel |
| **Language-neutral markers** | All reserved markers are syntax (callout tags), never natural-language headings, content can be authored in any language with zero parser configuration |
| **LearnSpec-interoperable** | Same `!ref` / `!import` directives, math, diagram and media conventions as QuizMD |

---

## Level 0: Base Markdown Syntax

### Conventions

| Syntax | Meaning |
|---|---|
| `## E1` or `## E1 · Title` | Start of an exercise |
| `### a)` or `### a) Title` | Sub-question within an exercise |
| `> [!hint]` | Progressive hint (repeatable; display order = document order) |
| `> [!answer]` | Concise final answer (result only, no reasoning) |
| `> [!solution]` | Full worked solution, the model path, step by step |
| `> [!expected]` | Expectations, observable criteria the production must exhibit |
| `> [!rubric]` | Rubric, a Markdown table mapping criteria to points |
| `> [!anchor score:N]` | Anchor copy, a scored production the grader calibrates against |
| `!import ./file.exercise.md` | Include exercises from another file (entry-file only, as in QuizMD) |
| `!ref ./file.diagram.md` | Declare a DiagramMD context |
| `!ref ./file.media.md` | Declare a MediaMD context |
| `!ref ./file.glossary.md` | Declare a GlossaryMD context |
| `$...$` / `$$...$$` | Inline / block LaTeX math |
| ` ```{type} ` fenced blocks | DiagramMD Level 0 diagrams, as in QuizMD |
| `![alt](media:slug "fallback-url")` | Image via MediaMD with fallback |

### Structure

- An **exercise** starts at `## En`. Everything between the heading (and its
  optional ` ```exercise ` block) and the first sub-question or callout is the
  **statement**: shared context for all sub-questions (a document to read, a
  figure, experimental data, a scenario).
- A **sub-question** starts at a `###` heading whose label ends with `)`, 
  `### a)`, `### 2.1)`, `### A.1.b)`. Labels are free-form: deep exam
  structures (part / question / sub-question) are expressed by **flat
  compound labels** (`A.1.a`), not by deeper heading nesting.
- A `###` heading **not** ending in `)` (e.g. `### Part B, the function g`)
  is a **statement section**: shared context for the sub-questions that
  follow it, carrying no points and no grading callouts of its own.
- A sub-question that receives **no grading callout** (neither inline nor in
  a companion file) is a **context node**: it introduces shared material for
  the sub-questions that follow (e.g. a `### 5)` whose task lives in
  `### 5.a)` and `### 5.b)`). Validators must not warn about missing
  solution or rubric on context nodes.
- Exercise and sub-question **identifiers** are derived as `E1`, `E1.a`,
  `E1.b`, … and are stable reference keys for companion files and graders.

### Callout Scoping

A reserved callout (`[!hint]`, `[!answer]`, `[!solution]`, `[!expected]`,
`[!rubric]`, `[!anchor]`) attaches to the **nearest preceding heading**: the sub-question
if one precedes it, otherwise the exercise itself. Callouts may contain any
Markdown: paragraphs, math, tables, diagrams, images.

Text on the marker line is part of the callout (`> [!answer] x = 3`).

One document-level exception: an `[!expected]` placed **before the first
`## En` heading** applies to the whole document. This carries cross-cutting
grading guidance, real exams have it ("the quality of the writing is
taken into account", "partial work is credited"), that graders must
weigh on every sub-question.

### Minimal Example

```markdown
# Quadratic equations: practice

## E1 · Solve

Solve in $\mathbb{R}$: $x^2 - 2x - 3 = 0$.

> [!hint]
> Compute the discriminant $\Delta = b^2 - 4ac$.

> [!answer] $x_1 = -1$ and $x_2 = 3$

> [!solution]
> Identify $a = 1$, $b = -2$, $c = -3$.
>
> $\Delta = (-2)^2 - 4 \times 1 \times (-3) = 4 + 12 = 16 > 0$: two real
> roots.
>
> $$x = \frac{2 \pm \sqrt{16}}{2} = \frac{2 \pm 4}{2}$$
>
> Hence $x_1 = -1$ and $x_2 = 3$.

> [!rubric]
> | Criterion | Points |
> |---|---|
> | Discriminant computed correctly | 1 |
> | Both exact roots | 1 |
```

This file is a complete, printable worksheet with its answer key, and,
stripped, a clean subject.

---

## The Grading Contract

The three grader-facing callouts have distinct, complementary roles:

| Callout | Role | Normative? |
|---|---|---|
| `[!rubric]` | **The grading contract.** Each row is a criterion worth points. The grade is the sum of points awarded row by row. | **Yes**: graders must follow it |
| `[!expected]` | Observable criteria the production must exhibit, in prose or bullets, what "correct" looks like, independent of any particular solution path. | Yes, informs rubric interpretation |
| `[!solution]` | One model path, fully worked. Illustrative: **an alternative valid path earns full credit** if it satisfies the expectations. | No, illustrative |
| `[!answer]` | The bare final result, when one exists. Enables fast checking and self-correction. | Yes, when present |

### Rubric Table

A rubric takes one of two forms. The default, **additive**, has two columns
in this order: **criterion**, **points**. Header labels are free (any
language); column *order* is the contract.

The second form, **levels**: declared with `> [!rubric levels]`, serves
holistic grading (essays, dissertations): two columns, **profile
descriptor** then **floor score**, rows ordered by ascending floor. The
grader identifies the highest profile the production matches and awards at
least that floor (floors are minimums, not ceilings, the next row's floor
caps the band). Within the band above the last floor reached, graders must
position by the production's *excess* over that floor, not by its residual
flaws, a production may earn the top score without being flawless, if it
is remarkable relative to the expected level. Levels rubrics are exempt
from the sum rules below; a
sub-question's points come from its declared `points:`. This mirrors how
real holistic scales work (e.g. the French national dissertation grids:
"pas moins de 13 / 16 / 19").

### Anchor Copies (experimental)

> **Experimental in v0.1.** Anchors were designed after benchmarking
> exposed the calibration problem below, but the mechanism itself has
> not yet been evaluated. Treat it as a proposal: conforming tools may
> ignore `[!anchor]` blocks, and the syntax may change in v0.2.

A levels rubric **should** carry anchor copies: real (or reconstructed)
productions with the score they actually received, declared as
`> [!anchor score:16]` blocks placed after the rubric. Graders must read
the anchors and calibrate against them *before* scoring, an anchor is a
worked example of the scale, the way `[!solution]` is a worked example of
the task.

```markdown
> [!anchor score:14]
> Three-part plan held to the end, real knowledge of the text, but a
> tendency to retell rather than discuss the claim; the third part drops in
> course material that does not serve the question. [excerpt, or a faithful
> summary of the script]
```

Anchors exist because descriptors alone do not calibrate. A grader reading
only "good command of the subject" applies its own idea of *good*; benchmarking
showed AI graders converge on an idealised standard and under-score real
exam work by around four points on twenty, while human examiners score
relative to what is achievable at that level in exam conditions. Anchors
transmit that population-relative standard, which is exactly why human
examination boards calibrate markers on sample scripts before releasing
the batch.

Two anchors are the practical minimum (one mid-scale, one high); scoring a
production **between** two anchors is the intended operation. Anchors are
grader-facing: `strip` removes them like any other grading callout.

- Points are non-negative numbers (decimals allowed: `0.5`).
- A criterion may reference partial credit conditions in its text
  ("1 pt if the method is set out, 0.5 if only started").
- The **points of a sub-question** = the sum of its rubric rows. The
  **points of an exercise** = the sum of its sub-questions (or of its own
  rubric if it has no sub-questions). An explicit `points:` in a
  ` ```exercise ` block must match this sum (validation warning otherwise).
- Rubric rows are identified `E1.a-r1`, `E1.a-r2`, … for grader outputs and
  contestation, an AI or human grader can report an auditable
  per-row breakdown.

### AI Grading Semantics

A conforming AI grader receives the learner's production plus the exercise's
grading kit and must:

1. award points **per rubric row**, never as a single holistic score;
2. treat the solution as *one* valid path, judge alternatives against
   `[!expected]`, not against textual similarity with `[!solution]`;
3. produce a per-row justification, so the grade is contestable row by row.

This makes grading a **portable artifact**: the same file grades identically
on any conforming platform or script.

---

## Practice vs. Exam: Strip and Merge

The canonical file is always **merged** (statement + grading kit together).
Two mechanical operations are defined on it; conforming tools must implement
both:

### `strip`

Produces a derived view by removing callouts:

| Profile | Removes | Produces |
|---|---|---|
| `strip: solutions` | `[!answer]`, `[!solution]`, `[!expected]`, `[!rubric]`, `[!anchor]` | Practice subject (hints kept) |
| `strip: exam` | All reserved callouts, including `[!hint]` | Exam subject |

Everything else, frontmatter, statements, diagrams, math, is preserved
byte-for-byte. Stripping is **pure removal**: no rewriting, no renumbering.

### `merge` and the Companion `.solution.md`

For workflows where the subject must circulate without its answer key (exam
distribution, version control visibility), the grading kit may live in a
**companion file** with the `.solution.md` extension:

```markdown
---
for: ./final-paper-2026.exercise.md
lang: en
---

## E1

### a)

> [!answer] $x_1 = -1$ and $x_2 = 3$

> [!solution]
> ...

> [!rubric]
> | Attendu | Points |
> |---|---|
> | ... | 1 |
```

- The companion mirrors the exercise/sub-question **headings only** (same
  identifiers, statements not repeated) and carries the reserved callouts.
- `for:` is required and must reference the subject file.
- `merge` recombines subject + companion into the canonical form;
  `split` is the inverse. **Round-trip must be lossless**:
  `split(merge(s, c)) == (s, c)`.
- A subject file and its companion must not both define a grading callout
  for the same identifier (validation error).

The split form is a *distribution* format; authoring and storage should
prefer the canonical merged form.

---

## Level 1: YAML Frontmatter

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | string | No | none | Inferred from the first `# H1` if absent |
| `lang` | BCP-47 | **Yes** | none | Language code (`en`, `fr`…) |
| `description` | string | No | none | Short description |
| `author` | string or object | No | none | Author name, or `{name, email, url}` |
| `tags` | string[] | No | `[]` | Thematic tags |
| `kind` | enum | No | `practice` | `practice`, `worksheet`, `homework`, `exam` |
| `duration` | int | No | none | Expected working time, minutes |
| `total_points` | number | No | none | Declared total; must match the computed sum (warning otherwise) |
| `materials` | string[] | No | `[]` | Allowed materials (`calculator`, `dictionary`, `open-book`…) |
| `grade_level` | string | No | none | Free-form audience level (`terminale`, `CM1`, `undergraduate`…) |
| `source` | object | No | none | Provenance for real past papers: `{name, year, session, url}` |
| `created` / `updated` | date | No | none | ISO 8601 |
| `license` | string | No | none | SPDX identifier or `custom` |
| `spec_version` | string | No | none | Targeted spec version (`"0.1"`) |

### Example: a Past Exam Paper

```yaml
---
title: Advanced Mathematics, Final Paper 1
lang: en
kind: exam
duration: 240
total_points: 20
materials: [calculator]
grade_level: grade 12
source:
  name: National Final Examination
  year: 2026
  session: June
license: custom
spec_version: "0.1"
---
```

---

## Level 2: Per-Exercise Fenced Block

A ` ```exercise ` block immediately after an exercise **or sub-question**
heading overrides defaults for that scope:

```markdown
## E2 · Function study

```exercise
id: log-function-01
points: 8
difficulty: hard
time: 45
tags: [analysis, logarithm]
bloom: analysis
```
```

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable unique identifier (overrides the derived `En` / `En.x`) |
| `points` | number | Declared points, must match the rubric sum (warning otherwise) |
| `difficulty` | enum | `easy`, `medium`, `hard` |
| `time` | int | Expected time for this exercise, minutes |
| `tags` | string[] | Per-exercise thematic tags |
| `bloom` | enum | Bloom's taxonomy level |
| `materials` | string[] | Overrides the document-level `materials` |

---

## Composition

- `!import ./file.exercise.md` includes exercises from another file, with the
  **same rules as QuizMD**: entry-file only, imported files' directives are
  inert, missing files are a lenient-mode warning. This is the mechanism for
  assembling a worksheet from an exercise bank.
- A complete exam subject (MCQ part + production part) is assembled with
  [TrackMD](/trackmd/), referencing a `.quiz.md` and one or more `.exercise.md` files.
- Diagrams, media, and glossary integration are identical to QuizMD
  (`!ref` + ` ```diagram ref:slug ` + `media:slug`).

---

## Validation

### Lenient Mode (default)

| Condition | Level |
|---|---|
| `lang` absent | Warning |
| Exercise without `[!solution]` | Warning |
| Exercise without `[!rubric]` | Warning |
| `points:` ≠ rubric sum, or `total_points` ≠ computed sum | Warning |
| Rubric table not two columns, or non-numeric points | Error |
| Reserved callout other than `[!expected]` before the first `## En` heading | Error |
| Closed-answer syntax (`- [x]`, `___`) present | Warning (belongs in QuizMD) |
| `!import` / `!ref` target missing | Warning |
| Companion `for:` absent or target missing | Error |
| Grading callout defined in both subject and companion for the same id | Error |
| Frontmatter YAML parse error | Error |

### Strict Mode (`--strict`)

All lenient warnings become errors. In addition, for `kind: exam`:

| Condition | Level |
|---|---|
| Any exercise without a rubric | Error |
| `total_points` absent | Error |
| `duration` absent | Error |

---

## Non-Goals (v0.1)

Deliberately out of scope, possible future extensions, kept out to avoid
the fate of heavyweight assessment standards:

- **Psychometrics**: item calibration, discrimination indices, adaptive testing.
- **Anti-cheat / cryptographic sealing** of subjects; the `.solution.md`
  split is an *editorial* separation, not a security mechanism.
- **Automatic answer checking**: numeric/CAS equivalence checking of
  `[!answer]` values is a tool concern, not a format concern.
- **Peer grading workflows** and grade management, platform concerns.
- **Negative marking** and penalty schemes.

---

## Design Notes

- **All examples in this spec are English, the format is not.** Because the
  reserved markers are callout tags rather than headings, an exercise can be
  authored entirely in another language without any parser configuration.
  See `samples/fonctions-derivees.exercise.md`, written end to end in
  French, where no marker changes.
- **Callouts, not headings.** Reserved markers are GFM-style callout tags
  (`[!solution]`), not natural-language headings (`### Solution`): the format
  stays fully language-neutral (a French author writes French everywhere),
  renders as visually distinct asides in any Markdown viewer, and is trivial
  to strip mechanically. This follows a lesson learned in NuggetMD, where
  English section labels created localization pressure on the parser.
- **Merged canonical form.** Experience with parallel "subject + answer key"
  documents is that they drift. The single-file canonical form with derived
  views makes drift structurally impossible.
- **Rubric as a table, not YAML.** At Level 0 the rubric must be readable
  and printable by a teacher with zero tooling; a two-column table is both
  human-canonical and trivially machine-readable. Richer rubric models
  (per-criterion achievement levels) can layer on later without breaking it.

---

*Released under the MIT License. Copyright © 2024-present LearnSpec Contributors*
