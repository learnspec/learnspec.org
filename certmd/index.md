# CertMD

**The macro-credential format of the [LearnSpec](/) suite.**

CertMD defines a digital certification — its description, SVG image, issuer, award requirements, grade levels, and accreditation conditions. Fields map to **Open Badges 3.0** for interoperability with existing platforms.

A certification attests mastery of a **complete domain**, as opposed to a [BadgeMD](/badgemd/) which attests a targeted skill. It may require completing multiple [TrackMD](/trackmd/) learning paths, passing a formal examination, and holding prerequisite badges.

CertMD is a **leaf format**: it is referenced from a TrackMD via `on_completion.certificate`.

## How it differs from BadgeMD

| Dimension | BadgeMD | CertMD |
|---|---|---|
| Scope | Targeted skill | Complete domain |
| Requirements | 1 track or 1 checkpoint | 1 or N tracks + badges + formal exam |
| Grades | Binary (earned / not earned) | Pass / Merit / Distinction |
| Formal exam | No | Yes (optional in v0.1) |
| Credits | No | Yes (CPD, hours, ECTS…) |
| Accreditation | No | Yes (external body) |
| Renewal | Simple expiry | Explicit renewal conditions |

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | A `.cert.md` file is valid Markdown readable in any editor |
| **File-native** | All metadata lives in the file — no database required |
| **SVG-native** | The certification is represented by a bakeable SVG file |
| **Graceful degradation** | The SVG image and description are visible in any standard reader |
| **Open Badges compatible** | Fields map to Open Badges 3.0 for interoperability |

CertMD inherits its frontmatter and validation rules from the shared [Architecture Charter](/charter/).

## Status

CertMD is a **draft v0.1**, designed alongside [BadgeMD](/badgemd/) and [TrackMD](/trackmd/).

## Next steps

- Read the full [Specification](/certmd/spec).
