# DiagramMD

**The diagram format of the [LearnSpec](/) suite — and the canonical syntax reference for diagrams across the suite.**

DiagramMD plays a dual role:

- **Syntax specification** — every diagram block type usable in [LearnMD](/learnmd/), [QuizMD](/quizmd/) and [FlashMD](/flashmd/) is defined here. A diagram block valid in DiagramMD is valid everywhere in the suite.
- **Standalone file format** — `.diagram.md` files can hold reusable diagrams, importable via `!import` from any content format.

DiagramMD is a **pure leaf format**: it imports and references no other LearnSpec format. How diagrams are rendered (server-side, client-side, hybrid) is left entirely to the player implementation.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.diagram.md` file is valid Markdown readable in any editor |
| **File-native** | All diagrams live in files — no database required |
| **Graceful degradation** | In any standard reader, each block displays as readable plain-text code |
| **Player-agnostic** | The spec defines syntax, not render implementation |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

DiagramMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Supported diagram types

`mermaid` · `tikz` · `graphviz` · `plantuml` · `blockdiag` · `seqdiag` · `chess` · `abc` · `smiles` · `vega-lite`

All blocks accept the same set of common attributes: `id`, `caption`, `width`, `alt`.

## Quick example

````markdown
```mermaid caption:"System architecture" width:80%
flowchart LR
    A[Client] --> B[API]
    B --> C[(Database)]
    B --> D[Cache]
```
````

## Status

DiagramMD is a **draft v0.1**. It absorbs and replaces the diagram documentation previously found in LearnMD v0.3.

## Next steps

- Read the full [Specification](/diagrammd/spec).
