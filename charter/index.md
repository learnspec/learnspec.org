# Architecture Charter

> Version 0.1 — working document shared by every format in the LearnSpec suite.

The charter defines the principles, conventions, and mechanisms common to every LearnSpec format. Each format spec inherits from this document and only documents what is specific to it.

## Overview {#overview}

LearnSpec is an open-source specification suite for creating, storing, and exchanging educational content. Every format in the suite is:

- a **valid Markdown file** readable in any editor without specific tooling;
- **file-native** — all content lives in flat files, no database or proprietary tool required;
- **versionable via Git** — diffable, mergeable, branchable;
- **AI-native** — generatable and consumable by LLMs without proprietary APIs;
- **interoperable** — composes with the other formats through standardised mechanisms;
- **gracefully degradable** — a LearnSpec file renders as readably as possible in any standard Markdown reader, with no prior knowledge of LearnSpec.

## Suite formats {#suite-formats}

| Format | Extension | Role | Status |
|---|---|---|---|
| **TrackMD** | `.track.md` | Sequenced learning paths | Draft v0.1 |
| **LearnMD** | `.learn.md` | Structured educational content | Stable v0.3, drafting v0.4 |
| **QuizMD** | `.quiz.md` | Quizzes, assessments, questionnaires | Stable, drafting v0.3 |
| **FlashMD** | `.flash.md` | Flashcards and spaced repetition | Draft v0.1 |
| **DiagramMD** | `.diagram.md` | Diagram syntax + reusable diagram blocks referenced via `!ref` | Draft v0.2 |
| **MediaMD** | `.media.md` | Media catalogue with metadata and licences | Draft v0.1 |
| **GlossaryMD** | `.glossary.md` | Term definitions for a corpus | Draft v0.1 |
| **BadgeMD** | `.badge.md` | Micro-credentials tied to a module or quiz | Draft v0.1 |
| **CertMD** | `.cert.md` | Macro-credentials tied to a learning track | Draft v0.1 |

See the [Suite overview](/suite/) for a higher-level summary of each format.

## Founding principles {#founding-principles}

### Graceful degradation

> A LearnSpec file must never be unreadable in a standard Markdown environment — only less rich.

This principle governs every syntax decision in the suite. Whenever a new mechanism is introduced, the question to ask is: *what does a GitHub, Obsidian, or VS Code reader see if they don't know LearnSpec?*

| Mechanism | Render in a standard reader | Acceptable? |
|---|---|---|
| Fenced block ` ```quiz ` | Raw code block, readable | ✅ |
| Directive `!import ./file.learn.md` | Plain text, visible | ✅ |
| Directive `!ref ./media.media.md` | Plain text, visible | ✅ |
| `![alt](media:slug)` without fallback | Broken image | ❌ — forbidden |
| `![alt](media:slug "https://fallback.url/img.jpg")` | Image displayed via fallback URL | ✅ |

**Design rule:** any LearnSpec syntax that would produce a broken render (broken image, dead link, unreadable content) in a standard reader is forbidden without an explicit fallback mechanism.

**Direct implication for MediaMD:** the symbolic media reference syntax must always include a fallback URL, using Markdown's native `title` field:

```markdown
![Cross-section of the heart](media:heart "https://commons.wikimedia.org/img/heart.svg")
```

A standard reader displays the image via the fallback URL. A LearnSpec player resolves `media:heart` through the referenced MediaMD file and uses the canonical URL with its licence metadata.

### File-native

> All LearnSpec content lives in flat files. No database, no server, no proprietary tool is required to create, read, or version content.

Concrete implications:

- metadata lives in the file's YAML frontmatter, not in an external database;
- relationships between files are expressed as relative paths or URLs, not database identifiers;
- a complete corpus can be cloned, archived, audited, or migrated by copying a folder;
- tooling (player, validator, MCP server) is a layer on top of the files, never a prerequisite for reading them.

**Git corollary:** file-native makes every LearnSpec corpus naturally versionable, diffable, and collaborative via standard Git tools, with no adaptation required.

### Universal file structure

All LearnSpec formats share the same base structure:

```
[Optional YAML frontmatter between --- delimiters]
[Markdown content with format-specific fenced blocks]
```

A file without frontmatter is always valid (Level 0). Richness is progressive.

## Level system {#level-system}

Each format defines its own Level 0/1/2 content, but all follow the same logic:

| Level | Principle |
|---|---|
| **0** | Pure Markdown — no tooling required, readable everywhere |
| **1** | YAML frontmatter — metadata and global behaviour |
| **2** | Special fenced blocks and directives — rich content, composition |

**Fundamental rule:** each level is a **strict superset** of the previous one. A Level 0 file is valid at Level 1 and Level 2.

## Universal frontmatter {#universal-frontmatter}

These fields have the **same semantics across every format** in the suite:

```yaml
---
title: "Content title"            # optional — inferred from the first # H1
lang: en                          # REQUIRED — BCP-47 code (en, fr, en-US…)
spec_version: "0.1"               # optional — targeted spec version
author:                           # optional — string or object
  name: Jane Smith
  email: jane@example.com
  url: https://janesmith.com
tags: [python, variables]         # optional — list of free strings
created: 2026-05-10               # optional — ISO 8601 date
updated: 2026-05-10               # optional — ISO 8601 date
license: CC-BY-4.0                # optional — SPDX identifier
                                  #            or "custom" for licences not covered by SPDX
---
```

**`lang` is the only universally required field** across all formats. Each format may define additional fields in its own spec.

### File naming conventions

| Format | Recommended convention |
|---|---|
| LearnMD | `{slug}.learn.md` |
| QuizMD | `{slug}.quiz.md` |
| FlashMD | `{slug}.flash.md` |
| DiagramMD | `{slug}.diagram.md` |
| MediaMD | `{slug}.media.md` |
| TrackMD | `{slug}.track.md` |
| GlossaryMD | `{slug}.glossary.md` |
| BadgeMD | `{slug}.badge.md` |
| CertMD | `{slug}.cert.md` |

The `slug` is lowercase, hyphen-separated, no special characters — e.g. `intro-python.learn.md`.

## Cross-format directives {#cross-format-directives}

All LearnSpec directives that accept a file path (`!import`, `!ref`) accept either a local path or an external URL interchangeably. This rests on three shared principles:

**Player-side URL normalisation.** The spec prescribes no particular URL form. A GitHub `blob`, `raw`, or other link is accepted as-is; it is the player's responsibility to normalise to the fetchable URL. This insulates source files from changes in hosting platforms.

**Optional version pinning.** By default, an external URL points to the main branch of its repository. A commit hash in the URL pins to a precise version:

```
!import https://github.com/org/repo/blob/main/module.learn.md        ← follows main
!import https://github.com/org/repo/blob/a3f8c21/module.learn.md     ← pinned
```

**Non-blocking offline behaviour.** If an external resource is unreachable at render time, the player emits a localised warning at the impacted locations and continues rendering. Caching strategy is left to the player.

### `!import` — composition

Includes the content of another LearnSpec file at the current position.

```
!import ./module-2.learn.md
!import ./quiz-module-1.quiz.md
!import https://github.com/org/repo/blob/main/module.learn.md
```

- The extension determines the rendering behaviour.
- Imports are recursive: an imported file may itself contain `!import` directives.
- Circular imports are silently skipped.

### `!ref` — contextual reference

Declares a dependency without including content inline. Produces no visible render — it establishes a context the player uses in the background (media resolution, glossary term highlighting, …).

```
!ref ./anatomy.media.md
!ref https://github.com/example/commons/blob/main/media/anatomy.media.md
```

### `!checkpoint` — progress point

Marks a named progress point. Available in LearnMD and TrackMD.

```
!checkpoint id:module-1-done label:"Module 1 complete" [type:milestone|read|exercise-complete]
```

- `id`: required, unique within the document.
- `label`: optional, text displayed to the learner.
- `type`: optional, `milestone` by default.

## Interoperability matrix {#interoperability-matrix}

| Source format | Can import (`!import`) | Can reference (`!ref`) |
|---|---|---|
| **TrackMD** | LearnMD, QuizMD, FlashMD | MediaMD, GlossaryMD |
| **LearnMD** | LearnMD, QuizMD, DiagramMD | MediaMD, GlossaryMD |
| **QuizMD** | DiagramMD | MediaMD, GlossaryMD |
| **FlashMD** | DiagramMD | MediaMD, GlossaryMD |
| **DiagramMD** | — | — |
| **GlossaryMD** | — | — |
| **MediaMD** | — | — |
| **BadgeMD** | — | — |
| **CertMD** | — | — |

DiagramMD, GlossaryMD, MediaMD, BadgeMD and CertMD are **pure leaf formats**: zero dependencies, always consumed, never producers. TrackMD does not import DiagramMD directly — standalone diagrams are embedded in the content formats (LearnMD, QuizMD, FlashMD) it orchestrates.

### Media resolution

When a content format includes an image, two mechanisms coexist:

1. **Inline** — standard Markdown link `![alt](url)` pointing to a direct URL.
2. **Via MediaMD** — symbolic reference `![alt](media:slug)` resolved from the `.media.md` file declared by `!ref`.

The `media:slug` mechanism centralises licence and source management in a single MediaMD file without polluting content files.

### Glossary term resolution

A player compatible with GlossaryMD can automatically highlight and make interactive any term defined in the referenced glossary, with no modification to the source content.

## Validation {#validation}

All formats support two modes:

| Mode | Behaviour |
|---|---|
| **Lenient** (default) | Warnings for missing non-critical fields, errors for invalid content |
| **Strict** (`--strict`) | All warnings become errors — recommended for CI/CD pipelines |

### Universal errors (all formats)

| Condition | Level |
|---|---|
| `lang` absent from frontmatter | Warning (Lenient) / Error (Strict) |
| Title absent (no H1 and no `title` in frontmatter) | Warning (Lenient) / Error (Strict) |
| Unclosed fenced block | Error |
| `!import` pointing to a missing file | Warning (Lenient) / Error (Strict) |
| `!checkpoint` missing required `id` attribute | Error |
| Duplicate `!checkpoint` `id` within a document | Error |

Each format additionally defines its own format-specific validation rules.

## Versioning {#versioning}

The `spec_version` frontmatter field allows a parser to validate a file against the correct version of the spec. If absent, the parser uses the most recent supported version.

Version format: `MAJOR.MINOR` (e.g. `"0.3"`).

Each file is validated independently against its own declared `spec_version`. The player emits a non-blocking warning if files targeting incompatible versions coexist in the same corpus or TrackMD.

## AI-nativeness {#ai-nativeness}

All formats are designed to be **generated and consumed by LLMs**:

- plain-text syntax, no XML or JSON embedded in the body;
- predictable structure: YAML frontmatter then Markdown content;
- fenced blocks named explicitly (`quiz`, `flash`, `card`, `track`, …);
- no loops, conditions, or programming logic in the files.

**Corollary:** an LLM instructed on the LearnSpec specs must be able to generate valid content without intermediate tooling, and an MCP server exposing the specs must enable compliant generation.

---

*This document is the shared working foundation for every LearnSpec spec. It is updated as decisions are made on each format.*
