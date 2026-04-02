# Getting Started with LearnMD

## Create your first lesson

Create a file named `my-lesson.learn.md`:

````markdown
---
title: My First Lesson
lang: en
estimated_time: 10min
---

# My First Lesson

## Introduction

Welcome to your first LearnMD lesson! This format lets you write
structured learning content in plain Markdown.

> [!objectives]
> After this lesson, you will be able to:
> - Create a `.learn.md` file
> - Use frontmatter for metadata
> - Add callouts and inline quizzes

## Key Concepts

A LearnMD file is just Markdown with a few conventions:

1. **Headings define structure** — `##` for modules, `###` for lessons
2. **Frontmatter adds metadata** — language, time estimate, tags
3. **Callouts highlight content** — tips, warnings, summaries

> [!tip]
> Start with Level 0 (plain Markdown) and add features as needed.

## Quick Check

```quiz
? What file extension does LearnMD use?
- [x] .learn.md
- [ ] .lesson.md
- [ ] .lmd
```

> [!summary]
> - LearnMD files use the `.learn.md` extension
> - YAML frontmatter provides metadata
> - Callouts and inline quizzes enrich the content
````

## Adding structure

LearnMD uses a three-tier hierarchy:

```
path (.learn.md)
└── module (## heading)
    └── lesson (### heading)
```

## Composing with imports

Split content across files and compose with `!import`:

```markdown
# Complete Python Course

!import ./01-variables.learn.md
!import ./check-variables.quiz.md
!import ./02-conditions.learn.md
!import ./check-conditions.quiz.md
```

## Tools

- **Parser**: `parse_learn` converts `.learn.md` to structured JSON
- **Validator**: `validate_learn` checks for errors and warnings
- **MCP server**: Exposes LearnMD tools to AI assistants

## Next steps

- Read the full [Specification](/learnmd/spec)
- Browse [Examples](/learnmd/examples)
- Check out the [QuizMD format](/quizmd/) for assessments
