# GlossaryMD

**The glossary format of the [LearnSpec](/) suite.**

GlossaryMD centralises the definitions of key terms in a learning corpus, enabling other formats to resolve them automatically — term highlighting in text, tooltip definitions, navigation between related terms.

GlossaryMD is a **pure leaf format**: it imports and references no other LearnSpec format. It is always consumed via a `!ref` directive.

It is the format whose graceful degradation is the most natural: a Level 0 file is a perfectly readable glossary in any standard Markdown reader, with no specific syntax whatsoever.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.glossary.md` Level 0 file is a pure Markdown glossary |
| **File-native** | All definitions live in the file — no database required |
| **Graceful degradation** | Headings + paragraphs — readable everywhere without tooling |
| **LaTeX from Level 0** | Mathematical formulas are available in definitions without frontmatter |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

GlossaryMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Quick example

```markdown
# Cell biology glossary

## Photosynthesis

The process by which plants convert sunlight into **chemical energy**,
using $CO_2$ and $H_2O$.

## Mitosis

Cell division producing two daughter cells genetically identical to the parent cell.

## Chloroplast

Organelle in plant cells where **photosynthesis** takes place.
```

## Status

GlossaryMD is a **draft v0.1**.

## Next steps

- Read the full [Specification](/glossarymd/spec).
