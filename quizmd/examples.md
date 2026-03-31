# QuizMD Examples

## Level 0 — Minimal quiz

```markdown
# Geography Quiz

## Q1 · What is the capital of Japan?

- [ ] Beijing
- [x] Tokyo
- [ ] Seoul
- [ ] Bangkok

> Tokyo has been the capital of Japan since 1868.

## Q2 · True or false: Australia is both a country and a continent.

- [x] True
- [ ] False

## Q3 · The longest river in the world is the ___.

**Answer:** Nile
```

## Level 1 — Scored exam with frontmatter

```markdown
---
title: Biology — Cell Structure
lang: en
domain: academic
tags: [biology, cells]
passing_score: 0.7
reveal: sequential
feedback_mode: deferred
scoring:
  correct: 2
  incorrect: -1
---

# Biology — Cell Structure

## Q1 · Which organelle produces energy?

- [ ] Nucleus
- [x] Mitochondria
- [ ] Ribosome
- [ ] Golgi apparatus

> Mitochondria are the "powerhouses" of the cell.

## Q2 · Which structures are found in plant cells but not animal cells?

- [x] Cell wall
- [x] Chloroplasts
- [ ] Mitochondria
- [ ] Ribosomes
- [x] Central vacuole

> Plant cells have cell walls, chloroplasts, and a large central vacuole.
```

## Level 2 — Per-question configuration

````markdown
---
title: Physics Fundamentals
lang: en
domain: academic
passing_score: 0.6
---

# Physics Fundamentals

## Q1 · What is the speed of light?

```quiz
id: q-speed-of-light
points: 5
difficulty: easy
hint: "Approximately 3 × 10⁸ m/s"
```

- [ ] 150,000 km/s
- [x] 299,792 km/s
- [ ] 1,000,000 km/s

> c ≈ 2.998 × 10⁸ m/s

## Q2 · Match units with quantities.

```quiz
type: match
points: 4
```

| Unit | Quantity |
|------|----------|
| Newton | Force |
| Joule | Energy |
| Watt | Power |
| Pascal | Pressure |

## Q3 · Order these planets by distance from the Sun.

```quiz
type: order
points: 4
```

1. Mercury
2. Venus
3. Earth
4. Mars
5. Jupiter
````

## Math questions

```markdown
## Q1 · Kinetic energy

An object of mass $m = 2\,\text{kg}$ moves at $v = 10\,\text{m·s}^{-1}$.
What is its kinetic energy $E_k$?

- [x] $E_k = 100\,\text{J}$
  > $E_k = \frac{1}{2}mv^2 = \frac{1}{2} \times 2 \times 100 = 100\,\text{J}$
- [ ] $E_k = 20\,\text{J}$
  > You computed $mv$, not $\frac{1}{2}mv^2$.

> Recall: $$E_k = \frac{1}{2}mv^2$$
```

## Composed quiz with imports

```markdown
---
title: History — Complete Course Exam
lang: en
domain: academic
passing_score: 0.6
reveal: sequential
feedback_mode: deferred
---

# History — Complete Course Exam

!import ./ancient-history.quiz.md
!import ./medieval-history.quiz.md
!import ./modern-history.quiz.md
```
