# QuizMD — Format Specification v0.2

## Core principle: YAML everywhere

QuizMD uses **YAML as its single configuration syntax**, applied across three progressive and backward-compatible levels. Keys are the same at every level — one mental model to learn.

| Level | Mechanism | Purpose |
|-------|-----------|---------|
| 0 | Plain `.quiz.md`, no configuration | Minimal quiz, human-readable |
| 1 | YAML frontmatter at top of file | Global metadata, behavior, scoring |
| 2 | Per-question ` ```quiz ` fenced block | Per-question overrides (points, timer, hint) |

A Level 0 file is valid at Level 1 and 2. Each level is a strict superset of the previous one.

---

## Level 0 — Base Markdown syntax

### Conventions

| Syntax | Meaning |
|--------|---------|
| `## Qn` or `## Qn · Title` | Start of a question |
| `- [x]` | Correct answer choice |
| `- [ ]` | Incorrect answer choice |
| `___` | Open-answer field (short answer / fill-in-the-blank) |
| `---` | Question separator (optional when `##` is used) |
| `> text` | Feedback / explanation (shown after the answer is submitted) |
| `!import ./file.quiz.md` | Include questions from a sub-quiz file |
| `$...$` | Inline LaTeX math formula |
| `$$...$$` | Block (display) LaTeX math formula |

### Question body

The body of a question is all Markdown content between the `## Qn` heading (and its optional ` ```quiz ` block) and the first answer choice (`- [ ]` / `- [x]`) or the `___` marker. The body may contain multiple paragraphs, lists, tables, math formulas, and images — any valid Markdown.

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

---

## Question types

### MCQ — Single correct answer

One `- [x]` marks the correct choice. All other choices use `- [ ]`.

```markdown
## Q1 · Which composer wrote "The Four Seasons"?

- [ ] Johann Sebastian Bach
- [ ] George Frideric Handel
- [x] Antonio Vivaldi
- [ ] Arcangelo Corelli

> "The Four Seasons" (1725) is a set of four violin concertos by Vivaldi.
```

### Multi-select — Multiple correct answers

Two or more `- [x]` marks indicate multiple correct choices. Renderers should display checkboxes rather than radio buttons.

```markdown
## Q2 · Which are characteristics of Baroque music?

- [x] Basso continuo
- [x] Terraced dynamics
- [ ] Twelve-tone serialism
- [x] Elaborate ornamentation
- [x] Counterpoint and polyphony
- [ ] Minimalist texture
```

### Open answer — Fill in the blank

The `___` marker signals a free-text input field. The expected answer follows on a `**Answer:**` line.

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

A True/False question is an MCQ with exactly two choices labeled `True` and `False`.

### Match pairs

A match question associates items from two columns. Declared with `type: match` in the per-question block:

````markdown
## Q6 · Match each composer with their nationality.

```quiz
type: match
points: 4
```

| Composer | Nationality |
|----------|-------------|
| Bach | German |
| Vivaldi | Italian |
| Handel | German |
| Rameau | French |
````

### Order

An order question asks the learner to sort items into the correct sequence. Declared with `type: order`. The correct order is the order in which items appear in the list:

````markdown
## Q7 · Place these composers in chronological order of birth.

```quiz
type: order
points: 3
```

1. Claudio Monteverdi (1567)
2. Heinrich Schutz (1585)
3. Jean-Baptiste Lully (1632)
4. Henry Purcell (1659)
5. Antonio Vivaldi (1678)
````

---

## Feedback syntax

QuizMD supports four levels of feedback, freely combinable within a single question:

| Syntax | Scope | When displayed |
|--------|-------|----------------|
| `  > text` (indented under a choice) | Per-choice | Only when that choice is selected |
| `> [!correct] text` | Global | Only when the answer is correct |
| `> [!incorrect] text` | Global | Only when the answer is incorrect |
| `> text` | Global | Always (general explanation) |

### Display priority rules

1. Per-choice feedback is displayed **inline**, below the option, only if the learner selected it.
2. `[!correct]` or `[!incorrect]` appears in the result banner according to the outcome.
3. Global `>` feedback always appears in the result banner, after the targeted feedback.
4. For open-answer questions, only global feedback applies.

---

## The `!import` directive

The `!import` directive includes questions from another `.quiz.md` file directly into the current quiz.

```markdown
!import ./path/to/sub-quiz.quiz.md
```

- Questions from the sub-quiz are inserted at the position of the directive.
- Questions are renumbered sequentially across the full assembled quiz.
- The frontmatter of the sub-quiz is ignored.
- Imports are recursive. Circular imports are silently skipped.
- Missing files are ignored without error.

---

## Reveal and feedback modes

### `reveal` — question display

| Value | Behavior |
|-------|----------|
| `all` (default) | All questions are displayed at once |
| `sequential` | Questions are revealed one at a time |

### `feedback_mode` — when corrections appear

| Value | Behavior |
|-------|----------|
| `immediate` (default) | Correction shown immediately after submission |
| `deferred` | Answers recorded without revealing corrections; results shown at the end |

### Typical combinations

| `reveal` | `feedback_mode` | Use case |
|----------|-----------------|----------|
| `all` | `immediate` | Practice mode (default) |
| `sequential` | `immediate` | Guided progression |
| `all` | `deferred` | Paper-style exam |
| `sequential` | `deferred` | Exam mode |

---

## Level 1 — YAML frontmatter

### Frontmatter field reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | string | Yes | — | Quiz title |
| `description` | string | No | — | Short description |
| `author` | string or object | No | — | Author name, or `{name, email, url}` |
| `lang` | BCP-47 | No | — | Language code |
| `tags` | string[] | No | `[]` | Thematic tags |
| `domain` | enum | No | — | `recreational`, `academic`, `corporate`, `certification` |
| `reveal` | enum | No | `all` | `all` or `sequential` |
| `feedback_mode` | enum | No | `immediate` | `immediate` or `deferred` |
| `shuffle_questions` | bool | No | `false` | Randomize question order |
| `shuffle_answers` | bool | No | `true` | Randomize answer choice order |
| `passing_score` | float | No | — | Minimum ratio to pass (0.0–1.0) |
| `time_limit` | int | No | — | Total time limit in seconds |
| `scoring.correct` | int | No | 1 | Points per correct answer |
| `scoring.incorrect` | int | No | 0 | Points per incorrect answer |
| `spec_version` | string | No | — | QuizMD spec version (e.g. `"0.2"`) |

---

## Level 2 — Per-question fenced block

A ` ```quiz ` block placed immediately after the question heading overrides global parameters for that specific question.

### Per-question block field reference

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable unique identifier for this question |
| `points` | int | Points for this question (overrides `scoring.correct`) |
| `timer` | int | Per-question time limit in seconds |
| `hint` | string | Hint shown on demand before submission |
| `difficulty` | enum | `easy`, `medium`, or `hard` |
| `tags` | string[] | Per-question thematic tags |
| `type` | enum | `mcq`, `multi`, `open`, `tf`, `match`, or `order` |
| `bloom` | enum | Bloom's taxonomy level |
| `depends_on` | string | ID of a question this one is conditional on |

The `type` field is inferred automatically when omitted:
- One `- [x]` → `mcq`
- Two or more `- [x]` → `multi`
- `___` present → `open`
- Exactly two choices `True` / `False` → `tf`

---

## Math support

LaTeX math is auto-detected and rendered via KaTeX. No frontmatter flag required.

| Form | Syntax | Rendering |
|------|--------|-----------|
| Inline | `$E = mc^2$` | Embedded in the line of text |
| Block | `$$\int_0^\infty e^{-x}\,dx = 1$$` | Centered on its own line |

---

## ABC music notation

Supports ABC notation for rendering sheet music inline in question bodies. Flags: `play`, `cursor`, `colors`.

---

## Partial scoring

When `partial_scoring: true` (default), **match** and **order** questions award a proportional score.

- **match**: `score = correct_pairs / total_pairs`
- **order**: Uses Kendall's tau (concordant pairs / all pairs)

---

## Syntax reference table

| Element | Syntax | Level |
|---------|--------|-------|
| Quiz title | `# Title` | 0 |
| Question heading | `## Q1` or `## Q1 · Title` | 0 |
| Correct choice | `- [x] text` | 0 |
| Incorrect choice | `- [ ] text` | 0 |
| Open answer marker | `___` | 0 |
| Expected answer | `**Answer:** value` | 0 |
| Per-choice feedback | `  > text` (indented) | 0 |
| Correct-only feedback | `> [!correct] text` | 0 |
| Incorrect-only feedback | `> [!incorrect] text` | 0 |
| General feedback | `> text` | 0 |
| Sub-quiz import | `!import ./file.quiz.md` | 0 |
| Inline math | `$formula$` | 0 |
| Block math | `$$formula$$` | 0 |
| Frontmatter | `---` YAML `---` | 1 |
| Per-question config | ` ```quiz ` YAML ` ``` ` | 2 |
| ABC (static) | ` ```abc ` | 0 |
| ABC (interactive) | ` ```abc play cursor colors ` | 0 |

---

## Validation

### Lenient mode (default)

| Condition | Level |
|-----------|-------|
| No correct answer in an MCQ | Warning |
| `title` absent from frontmatter | Warning |
| `lang` absent from frontmatter | Warning |
| Unclosed ` ```quiz ` block | Error |
| `!import` pointing to a missing file | Warning |
| Frontmatter YAML parse error | Error |

### Strict mode (`--strict`)

| Condition | Level |
|-----------|-------|
| `title` absent | Error |
| `lang` absent | Error |
| No correct answer in any question | Error |
| All lenient-mode errors | Error |
