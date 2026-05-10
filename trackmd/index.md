# TrackMD

**The learning path format of the [LearnSpec](/) suite.**

TrackMD orchestrates [LearnMD](/learnmd/), [QuizMD](/quizmd/), and [FlashMD](/flashmd/) files into an ordered pedagogical sequence — with path-level metadata, completion criteria, and progress checkpoints.

It is the **only format in the suite that imports all content types**. A `.track.md` transforms a set of independent files into a path with a beginning, an end, and milestones. A Level 0 TrackMD file is a human-readable table of contents in any standard Markdown reader.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.track.md` file is valid Markdown readable in any editor |
| **File-native** | All structure lives in files — no database required |
| **Graceful degradation** | `##` sections + `!import` directives — readable as a syllabus everywhere |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |
| **Orchestrator** | The only format in the suite that imports multiple content types |

TrackMD inherits its frontmatter, directives, and validation rules from the shared [Architecture Charter](/charter/).

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | `##` headings + `!import` directives | Minimal sequence, readable everywhere |
| 1 | YAML frontmatter | Metadata, completion criteria, objectives |
| 2 | Attributes on `!import` | Optional steps, per-quiz passing score |

## Quick example

```markdown
# Learning Python

## The basics

!import ./01-variables.learn.md
!import ./quiz-variables.quiz.md
!import ./flashcards-variables.flash.md

## Control flow

!import ./02-conditions.learn.md
!import ./02-loops.learn.md
!import ./quiz-control.quiz.md

## Final assessment

!import ./quiz-final.quiz.md
```

## Status

TrackMD is a **draft v0.1**. The format is being designed alongside FlashMD, BadgeMD, and CertMD; conditional prerequisites between sections are deferred to v0.2.

## Next steps

- Read the full [Specification](/trackmd/spec).
