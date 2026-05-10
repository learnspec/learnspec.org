# MediaMD — Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft.

## Core principle

MediaMD is the **visual resource catalogue format** of the LearnSpec suite. It centralises the metadata, sources, and licence information for each media asset, allowing other formats (LearnMD, QuizMD, FlashMD) to reference images by a symbolic identifier without managing licensing themselves.

MediaMD is a **leaf format**: it references and imports no other LearnSpec format. It is always consumed via a `!ref` directive, never included via `!import`.

MediaMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

| Principle | Description |
|---|---|
| **Markdown-first** | A `.media.md` file is valid Markdown readable in any editor |
| **File-native** | All metadata lives in the file — no database required |
| **Graceful degradation** | Each entry displays its thumbnail in any standard Markdown reader |
| **License-aware** | Each entry explicitly documents its licence, author, and source |
| **AI-native** | Generatable and consumable by an LLM without specific tooling |

## Format levels

| Level | Mechanism | Purpose |
|---|---|---|
| 0 | ` ```media ` fenced block with minimal fields | Minimal catalogue, readable everywhere |
| 1 | YAML frontmatter + full fields | File metadata, language, version |
| 2 | Optional enriched fields | Dimensions, MIME type, context URLs |

## File structure

### Frontmatter (Level 1)

```yaml
---
title: "Media — F-22 Raptor"
lang: en                               # REQUIRED — BCP-47 code
spec_version: "0.1"
author: Jane Smith                     # author of the file (not of the media assets)
tags: [aviation, military]
created: 2026-05-10
updated: 2026-05-10
---
```

### Media entry

Each entry consists of **two contiguous elements** in this order:

1. **A Markdown image line** — renders the thumbnail visibly in any standard reader.
2. **A `media` fenced block** — contains all structured metadata.

````markdown
![Alt text](thumb_url "media:slug")

```media id:slug
...metadata...
```
````

The `title` attribute of the image line (`"media:slug"`) links the rendered image to its metadata block. A LearnSpec player uses this attribute to resolve the reference; a standard reader simply displays the thumbnail with the slug as a tooltip.

**Rule:** if `thumb_url` is set, the Markdown image line is **mandatory**. If only `image_url` is available, the image line is recommended using `image_url` as the source.

## Complete example

````markdown
---
title: "Media — F-22 Raptor"
lang: en
spec_version: "0.1"
tags: [aviation, military, usaf]
---

# Media — F-22 Raptor

![An F-22 Raptor in flight over Japan](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/F-22_Raptor_edit1_%28cropped%29.jpg/500px-F-22_Raptor_edit1_%28cropped%29.jpg "media:f22-kadena")

```media id:f22-kadena
source: wikimedia
image_url: https://upload.wikimedia.org/wikipedia/commons/1/1e/F-22_Raptor_edit1_%28cropped%29.jpg
thumb_url: https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/F-22_Raptor_edit1_%28cropped%29.jpg/500px-F-22_Raptor_edit1_%28cropped%29.jpg
title: F-22 Raptor over Kadena
alt: An F-22 Raptor in flight over Japan
description: An F-22 Raptor flies over Kadena Air Base, Japan, on January 23, 2009, during a routine training mission.
license: "Public domain"
spdx: CC0-1.0
author: Master Sgt. Andy Dunaway
author_url: https://commons.wikimedia.org/wiki/File:F-22_Raptor.JPG
origin_url: https://commons.wikimedia.org/wiki/File:F-22_Raptor_edit1_(cropped).jpg
source_filename: File:F-22 Raptor edit1 (cropped).jpg
width: 1988
height: 1491
mime: image/jpeg
```
````

## Field reference

### Identification

| Field | Status | Description |
|---|---|---|
| `id` | **Required** | Unique slug within the file. Lowercase, hyphens, no spaces. Enables `media:slug` references from other formats. |
| `source` | Required | Source platform: `wikimedia`, `custom`, `unsplash`, etc. |

### Visual

| Field | Status | Description |
|---|---|---|
| `image_url` | **Required** | Full-resolution image URL |
| `thumb_url` | Recommended | Thumbnail URL (500px recommended). If present, the Markdown image line is mandatory. |

### Descriptive

| Field | Status | Description |
|---|---|---|
| `title` | **Required** | Display title of the media. Used in captions. |
| `alt` | Recommended | Accessibility alt text. Distinct from `title` — describes the visual content. |
| `description` | Optional | Long description of the image content and context |

### Licence

| Field | Status | Description |
|---|---|---|
| `license` | **Required** | Free-form — licence as provided by the source (`"Public domain"`, `"CC BY-SA 4.0"`, …) |
| `spdx` | Recommended | Normalised SPDX identifier (`CC0-1.0`, `CC-BY-4.0`, `CC-BY-SA-4.0`…). Enables automated licence checking. |
| `license_url` | Conditional | URL to the licence text. **Required** if `spdx` is absent or set to `custom`. |

#### Common SPDX identifiers

| Licence | SPDX |
|---|---|
| Creative Commons Zero (public domain waiver) | `CC0-1.0` |
| Creative Commons Attribution 4.0 | `CC-BY-4.0` |
| Creative Commons Attribution-ShareAlike 4.0 | `CC-BY-SA-4.0` |
| Creative Commons Attribution-ShareAlike 2.0 | `CC-BY-SA-2.0` |
| Creative Commons Attribution-NoDerivs 4.0 | `CC-BY-ND-4.0` |
| Public domain (US Government work, expired copyright…) | `LicenseRef-PublicDomain` |
| Licence not covered by SPDX | `custom` + `license_url` required |

> `"Public domain"` in Wikimedia metadata may refer either to `CC0-1.0` (explicit waiver) or `LicenseRef-PublicDomain` (public domain by expiry or law). The MediaMD file author selects the appropriate SPDX identifier for each case.

### Attribution

| Field | Status | Description |
|---|---|---|
| `author` | Recommended | Name of the author or creating organisation |
| `author_url` | Optional | Author's profile or portfolio page |

### Traceability

| Field | Status | Description |
|---|---|---|
| `origin_url` | Recommended | Media page on the source platform |
| `context_url` | Optional | Page where this media was found or used |
| `source_filename` | Optional | Original filename on the source platform |

### Technical

| Field | Status | Description |
|---|---|---|
| `width` | Optional | Full-resolution image width in pixels |
| `height` | Optional | Full-resolution image height in pixels |
| `mime` | Optional | MIME type (`image/jpeg`, `image/png`, `image/svg+xml`, …) |

## Referencing a MediaMD from another format

### Declaration

A MediaMD file is declared via the `!ref` directive at the top of the consuming document:

```markdown
!ref ./media-f22.media.md
!ref https://github.com/example/commons/blob/main/media/aviation.media.md
```

Multiple `!ref` directives may coexist in the same document. The slugs from all referenced files share the same namespace — `id` values must therefore be unique across all MediaMD files referenced in a given document.

### Usage in content

```markdown
![An F-22 Raptor in flight](media:f22-kadena "https://upload.wikimedia.org/.../500px-F-22.jpg")
```

- **`media:f22-kadena`**: slug resolved via the referenced MediaMD → full-resolution image + licence metadata.
- **`"https://..."`**: fallback URL (thumbnail) — displayed in standard readers that don't know LearnSpec.

A LearnSpec player may automatically display the caption, attribution, and licence below the image using the MediaMD metadata.

## Graceful degradation

| Element | Standard reader | LearnSpec player |
|---|---|---|
| Image line `![alt](thumb_url "media:slug")` | Thumbnail displayed, slug as tooltip | Ignored (replaced by full-resolution image) |
| ` ```media ` block | Readable YAML code block | Parsed and resolved |
| `media:slug` reference in another format | Image displayed via fallback URL | Resolved via MediaMD — full resolution + licence |

## Validation

### Lenient mode (default)

| Condition | Level |
|---|---|
| `lang` absent from frontmatter | Warning |
| `id` missing on a `media` block | Error |
| Duplicate `id` within the file | Error |
| `image_url` missing | Error |
| `title` missing | Warning |
| `alt` missing | Warning |
| `license` missing | Error |
| `spdx` absent and `license_url` absent | Warning |
| `spdx: custom` without `license_url` | Error |
| `thumb_url` present without a Markdown image line | Warning |
| Image line without a following `media` block | Warning |
| Image line `id` matching no `media` block | Warning |
| `id` conflict across multiple MediaMD files referenced in the same document | Warning |

### Strict mode (`--strict`)

All warnings are promoted to errors.
