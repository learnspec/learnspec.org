# Getting Started with QuizMD

## Create your first quiz

Create a file named `my-quiz.quiz.md`:

```markdown
---
title: My First Quiz
lang: en
domain: recreational
shuffle_answers: true
---

# My First Quiz

## Q1 · What format does QuizMD use?

- [x] Markdown
- [ ] XML
- [ ] JSON
- [ ] YAML only

> QuizMD uses Markdown as the base format, with YAML for configuration.

## Q2 · True or false: QuizMD files are valid Markdown.

- [x] True
- [ ] False

## Q3 · Fill in: QuizMD files use the ___ extension.

**Answer:** .quiz.md

> The `.quiz.md` extension identifies QuizMD files.
```

## Question types at a glance

| Type | Syntax | Detection |
|------|--------|-----------|
| MCQ | One `- [x]` | Auto |
| Multi-select | Multiple `- [x]` | Auto |
| Open answer | `___` + `**Answer:**` | Auto |
| True/False | Two choices: True/False | Auto |
| Match | `type: match` + table | Explicit |
| Order | `type: order` + ordered list | Explicit |

## Adding per-question config

Use a ` ```quiz ` block after the question heading:

````markdown
## Q4 · What is 2 + 2?

```quiz
points: 5
difficulty: easy
hint: "Think about basic addition"
```

- [x] 4
- [ ] 3
- [ ] 5
````

## Composing quizzes

Combine questions from multiple files:

```markdown
---
title: Complete Exam
lang: en
passing_score: 0.7
reveal: sequential
feedback_mode: deferred
---

# Complete Exam

!import ./section-1.quiz.md
!import ./section-2.quiz.md
!import ./section-3.quiz.md
```

## Tools

- **Parser**: `parse_quiz` converts `.quiz.md` to structured JSON
- **Validator**: `validate_quiz` checks for errors and warnings
- **Answer checker**: `check_open_answer` evaluates open-ended responses
- **MCP server**: Exposes QuizMD tools to AI assistants

## Next steps

- Read the full [Specification](/quizmd/spec)
- Browse [Examples](/quizmd/examples)
- Check out the [LearnMD format](/learnmd/) for learning content
