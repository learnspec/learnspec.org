# MediaMD

**The media catalogue format of the [LearnSpec](/) suite.**

MediaMD centralises the metadata, sources, and licence information for each media asset, so that other formats ([LearnMD](/learnmd/), [QuizMD](/quizmd/), [FlashMD](/flashmd/)) can reference images by a symbolic identifier without managing licensing themselves.

MediaMD is a **leaf format**: it references and imports no other LearnSpec format. It is always consumed via `!ref`, never via `!import`.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.media.md` file is valid Markdown readable in any editor |
| **File-native** | All metadata lives in the file — no database required |
| **Graceful degradation** | Each entry displays its thumbnail in any standard Markdown reader |
| **License-aware** | Each entry explicitly documents its licence, author, and source |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

MediaMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## How a MediaMD entry looks

Each entry consists of two contiguous elements: a Markdown image line (renders the thumbnail in any reader) and a ` ```media ` fenced block with all structured metadata.

````markdown
![An F-22 Raptor in flight over Japan](https://.../500px-F-22.jpg "media:f22-kadena")

```media id:f22-kadena
source: wikimedia
image_url: https://.../F-22_Raptor.jpg
thumb_url: https://.../500px-F-22.jpg
title: F-22 Raptor over Kadena
alt: An F-22 Raptor in flight over Japan
license: "Public domain"
spdx: CC0-1.0
author: Master Sgt. Andy Dunaway
origin_url: https://commons.wikimedia.org/wiki/File:F-22_Raptor.jpg
```
````

A complete MediaMD file is therefore a **visually navigable image catalogue** in GitHub, Obsidian, or VS Code.

## Status

MediaMD is a **draft v0.1**.

## Next steps

- Read the full [Specification](/mediamd/spec).
