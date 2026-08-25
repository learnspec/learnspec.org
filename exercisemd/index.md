# ExerciseMD

**The exercise format of the [LearnSpec](/) suite.**

An `.exercise.md` file describes exercises, tasks where the learner *produces* work: a derivation, an essay, a translation, a program, together with everything needed to grade that work: a model solution, explicit expectations, and a rubric.

Its contribution is not the statement but the **grading contract**. A rubric whose rows are identified can be applied line by line, so a grade is produced, justified, and contested at the same grain.

## Not a quiz

ExerciseMD and [QuizMD](/quizmd/) split cleanly:

> If the answer can be graded by **matching**: choices, blanks, pairs, ordering, a short expected answer, it belongs in QuizMD.
> If grading requires **judging a production** against a model solution and a rubric, it belongs in ExerciseMD.

To keep the boundary from blurring, ExerciseMD defines **no** closed-answer syntax at all. A mixed exam paper, a multiple-choice part and a production part, composes both through [TrackMD](/trackmd/).

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | An `.exercise.md` file is valid Markdown, readable and *printable* from any editor |
| **File-native** | All content lives in files, no database required |
| **Solution-complete** | The canonical file holds statement *and* solution *and* rubric, an exercise without its grading contract is incomplete |
| **Strippable** | Subject and grading kit are *derived* from the canonical file by a mechanical, reversible operation, never maintained in parallel |
| **Language-neutral markers** | Reserved markers are callout tags, never natural-language headings, author entirely in your own language |
| **AI-native** | Generatable by an LLM, and gradable by one reproducibly, because the rubric is explicit |

ExerciseMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | `##` exercises, `###` sub-questions, reserved callouts | Complete worksheet with its answer key, readable everywhere |
| 1 | YAML frontmatter | Duration, total points, allowed materials, provenance |
| 2 | Per-exercise `exercise` block | Points, difficulty, expected time, Bloom level |

## Quick example

```markdown
## E1 · Solve

Solve in $\mathbb{R}$: $x^2 - 2x - 3 = 0$.

> [!hint]
> Compute the discriminant $\Delta = b^2 - 4ac$.

> [!answer] $x_1 = -1$ and $x_2 = 3$

> [!solution]
> $\Delta = 4 + 12 = 16 > 0$, so there are two real roots:
> $x = \frac{2 \pm 4}{2}$, hence $x_1 = -1$ and $x_2 = 3$.

> [!rubric]
> | Criterion | Points |
> |---|---|
> | Discriminant computed correctly | 1 |
> | Both exact roots | 1 |
```

The same file serves three uses without changing syntax: **practice** (hints and worked solutions visible), **exam** (stripped of everything but the statements), and **grading** (the rubric, applied row by row).

## Two rubric shapes

- **Additive**: one observable criterion per point. Use it whenever grading rests on criteria that can be checked: computations, method steps, required justifications.
- **Levels**: profile descriptors with floor scores, for holistic productions such as essays. Levels rubrics may carry **anchor copies**: scored productions the grader calibrates against before marking. Anchors are *experimental* in v0.1.

## Status

ExerciseMD is a **draft v0.1**.

## Next steps

- Read the full [Specification](/exercisemd/spec).
- Browse [samples on GitHub](https://github.com/learnspec/exercisemd/tree/main/samples).
