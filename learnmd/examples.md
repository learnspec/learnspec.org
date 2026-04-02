# LearnMD Examples

## Level 0 — Minimal lesson

The simplest possible LearnMD file is just Markdown:

````markdown
# Git Basics

## Module 1 — What is Git?

Git is a distributed version control system.
It tracks changes to files and lets multiple people
collaborate on the same project.

## Module 2 — Your First Commit

Open your terminal and run:

```bash
git init
git add .
git commit -m "Initial commit"
```
````

## Level 1 — With frontmatter and callouts

````markdown
---
title: CSS Flexbox
lang: en
estimated_time: 20min
tags: [css, layout, flexbox]
author: LearnSpec Contributors
---

# CSS Flexbox

## Module 1 — Flex Containers

> [!objectives]
> After this module, you will be able to:
> - Create a flex container
> - Align items along the main axis

To create a flex container, set `display: flex`:

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

> [!tip]
> Use `justify-content` for the main axis and `align-items`
> for the cross axis.

> [!warning]
> Flex items shrink by default. Set `flex-shrink: 0` to prevent it.

> [!summary]
> - `display: flex` creates a flex container
> - `justify-content` aligns on the main axis
> - `align-items` aligns on the cross axis
````

## Level 2 — With inline quizzes and imports

````markdown
---
title: Introduction to SQL
lang: en
estimated_time: 45min
tags: [sql, databases]
---

# Introduction to SQL

## Module 1 — SELECT Queries

The `SELECT` statement retrieves data from a table:

```sql
SELECT name, age FROM users WHERE age > 18;
```

```quiz
? Which SQL keyword filters rows?
- [ ] SELECT
- [x] WHERE
- [ ] FROM
- [ ] ORDER BY
```

## Module 2 — Joins

!import ./joins.learn.md
!import ./check-joins.quiz.md
````

## Math content

````markdown
---
title: Calculus — Derivatives
lang: en
estimated_time: 30min
tags: [math, calculus]
---

# Calculus — Derivatives

## Definition

The derivative of $f$ at point $x$ is defined as:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

## Basic Rules

| Function | Derivative |
|----------|------------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln(x)$ | $1/x$ |
| $\sin(x)$ | $\cos(x)$ |

```quiz scored:true
? What is the derivative of $x^3$?
- [x] $3x^2$
- [ ] $x^2$
- [ ] $3x^3$
```
````
