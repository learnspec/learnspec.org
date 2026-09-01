# ListenMD: Format Specification v0.1

> Part of the [LearnSpec](/) suite. Draft, September 1, 2026.
> Rendition format: derived from a content format, typically [LearnMD](/learnmd/); never `!import`ed or `!ref`erenced by another format, it stands alone.

---

## Core Principle

ListenMD is the **speech-only rendition format** of the LearnSpec suite. A `.listen.md` script is an ordered sequence of spoken turns, grouped into optional chapters, each turn attributed to an abstract voice **role**.

A ListenMD script contains nothing a text-to-speech engine cannot read aloud: no images, no tables, no code blocks, no lists, no LaTeX, no markup meant to be looked at rather than heard. This constraint is what makes the format safe to synthesize blindly, whatever a producing pipeline puts in a `.listen.md` file, a renderer can hand straight to a TTS engine, turn by turn, without guessing what to skip.

| Principle | Description |
|---|---|
| **Markdown-first** | A ListenMD script is valid Markdown, readable in any editor: headings, `@role` turn markers, prose paragraphs |
| **Speech-only** | Everything outside frontmatter and blockquote asides is spoken verbatim. No visual content, no deixis to something the listener cannot see |
| **Role-abstract** | Turns name abstract voice roles (`@host`, `@signpost`, `@guest`…), never a provider, a voice id, or a style tag |
| **Provider-agnostic** | Which concrete voice renders a role, provider, voice id, style, speed, is a decision made outside the file, by the pipeline that renders it |
| **Graceful degradation** | A `.listen.md` file renders as a perfectly readable transcript in any standard Markdown reader |

ListenMD is not an authoring format for instruction, that role belongs to content formats like LearnMD. A ListenMD script is a **derived rendering target**, produced by editorially rewriting an existing piece of content for a listener who cannot see a diagram, a table, or a bullet list. Tables get re-linearized into flowing prose, visual references get replaced with narration of the mechanism itself, numbers get written the way they are spoken. A ListenMD file does not attempt to preserve everything its source contains, it attempts to sound good.

---

## File Structure

A ListenMD file follows the suite's universal structure: an optional YAML frontmatter block, followed by Markdown content. Following the charter's [Level system](/charter/#level-system):

| Level | What it adds |
|---|---|
| **0** | Turn markers and spoken paragraphs, no frontmatter, no chapters. Every `@role` turn is implicitly in one unnamed chapter |
| **1** | YAML frontmatter (`title`, `lang`) |
| **2** | Chapter headings (`## `), optionally anchored (`{#slug}`) into a source document for audio↔text sync |

Each level is a strict superset of the previous one, a Level 0 script is valid at Level 2.

### Frontmatter

```yaml
---
title: "El Niño: the ocean that reshapes the world"
lang: en
spec_version: "0.1"
---
```

| Key | Read by the parser | Description |
|---|---|---|
| `title` | Yes | The episode title |
| `lang` | Yes | BCP-47 language code (`en`, `fr`, `en-US`…), the language every spoken turn in the file is written in |

No other key is read by a conforming parser. The charter's other universal frontmatter fields, and any pipeline-specific key (a source reference, an estimated duration, a rendering profile), may be present, they are simply ignored. This is intentional: metadata about *how* to render the file (voice bindings, provider, mastering levels) belongs to the pipeline that renders it, never to the file. A file with no frontmatter at all is valid (Level 0); validators SHOULD warn.

---

## Chapters

A line starting with `## ` opens a **chapter**, a named group of consecutive turns. The `{#slug}` anchor form is optional:

```markdown
## The problem with noise {#the-problem-with-noise}
```

The anchor, when present, is stripped from the spoken/displayed title, it is never read aloud. Its meaning is normative: it is the heading id/slug of the corresponding section in the **source document** this chapter was rewritten from (typically a `##`/`###` heading in a LearnMD lesson). A player that shows the source text alongside the audio uses the anchor to scroll the two in sync as chapters change.

A chapter without an anchor is legitimate and common, an opening teaser, a closing recap, or any chapter that blends several source sections or introduces none. Anchors are opt-in per chapter, not all-or-nothing across a file. A chapter's anchor slug MUST match `[A-Za-z0-9][A-Za-z0-9_-]*` and MUST be copied character-for-character from the source document's own heading id, a producing pipeline must never invent, transliterate, or guess one.

A file needs no chapters at all: every turn before the first `## ` heading belongs to an implicit, unnamed chapter (`chapter: null`).

---

## Speech Turns

A line consisting of exactly `@` followed by a role name opens a **turn**, the unit of spoken text attributed to one voice:

```markdown
@host
Every bridge you've ever crossed is quietly losing a fight with gravity, and winning anyway.
```

A role name matches `[A-Za-z_][A-Za-z0-9_-]*` and is compared case-insensitively. Everything between one `@role` line and the next state change, another `@role` line, a `## ` chapter heading, or the end of the file, is that turn's spoken text: one or more paragraphs of plain prose, separated by a blank line. An empty or whitespace-only turn is silently dropped. Text appearing before the first `@role` line of the file has no turn to belong to and is silently discarded.

### Roles

The role vocabulary is **open**: any `@word` matching the syntax above is accepted. Three roles are conventional across the suite's reference producers:

| Role | Carries |
|---|---|
| `@host` | The narration, the voice that carries the knowledge, the argument, the throughline |
| `@signpost` | Short structural capsules, recaps, transitions, landmarks, used sparingly, never for the bulk of the content |
| `@guest` | A curious co-host in dialogue-style episodes, asks the questions a listener would ask |

A renderer that receives a role it does not recognize is expected to degrade gracefully (e.g. fall back to a default voice) rather than fail the whole episode. This specification does not fix the set of roles a script may use, nor how many: a single-voice trailer and a four-voice panel are both valid ListenMD.

---

## Spoken Text

Everything inside a turn is prose, meant to be read aloud exactly as written:

- **No markdown emphasis.** `*italic*` and `**bold**` are forbidden in authored ListenMD, a TTS engine reads the asterisks aloud as words. A conforming parser defensively strips well-formed emphasis pairs it encounters anyway, but a producing pipeline MUST NOT rely on that as a substitute for not emitting emphasis in the first place.
- **No visual reference.** Nothing in a turn should assume the listener can see anything, "the diagram below" and similar phrasing have no correct rendering in audio. A rewrite that would need one narrates the underlying mechanism instead.
- **Numbers, units, and dates are written as spoken.** `1.5 °C` becomes `one degree and a half`.
- **Prosody is punctuation only.** Pauses and emphasis come from `…` and `—`; no provider-specific markup (SSML tags, style brackets) belongs in the file.

Anything else found inside an open turn, a stray table row, an image, a list item, a fenced code block, is read as spoken prose exactly as written: ListenMD has no fenced-block or list syntax of its own. A single-hash `# Document title` heading and any `>` blockquote line are the two exceptions, both are skipped entirely rather than spoken, the blockquote is reserved for asides (shownotes, source links) that accompany the episode but are never synthesized.

---

## Provider-Agnostic Rendering

A ListenMD file never names a TTS provider, a concrete voice id, a speaking style, or a speed. That binding is a decision made entirely **outside the file**, by whatever pipeline renders it, and it may change between renders without touching the script at all, the same file can be read by a premium cloned voice today and a browser's built-in speech synthesis tomorrow.

A conforming renderer maintains its own role → voice mapping (a role absent from that mapping SHOULD fall back to a default, typically the mapping's `host` entry). An episode's "style", documentary narration, a two-voice dialogue, a short marketing trailer, shapes *how* a script is written but is never itself a field of the file.

---

## Graceful Degradation

| What the file contains | What a standard Markdown reader shows |
|---|---|
| YAML frontmatter | Hidden by most renderers, or shown as a raw metadata block |
| `## Chapter {#slug}` | A level-2 heading, most readers show `{#slug}` as literal trailing text |
| `@host` turn marker | A plain paragraph reading `@host` |
| A spoken paragraph | Ordinary prose |
| `> a shownote` | An ordinary blockquote |
| An unparseable or empty file | An empty (or near-empty) document, never an error, never broken markup |

The worst case is always a readable transcript, never a broken render, never hidden content.

---

## What ListenMD Does Not Do

- **No sound design.** No in-body directive for jingles, ambience beds, transition swells, gaps, or mastering levels. All of that is the renderer's responsibility, driven by the file's structure, never by markup inside it.
- **No voice binding.** Which provider, which voice id, which style or speed renders a role is configuration that lives with the pipeline rendering the file.
- **Nothing visual.** No images, no tables, no lists, no code blocks, no LaTeX.
- **No mechanical filtering.** A ListenMD script is an editorial rewrite (selection, re-linearization, translation), not a strip-the-markup pass over a content file, nothing guarantees a lossless mapping back to the source beyond the optional chapter anchors.

---

## Validation

Two modes, mirroring the rest of the suite:

**Lenient (default)**: blocking issues only:
- the file produces zero segments (no spoken text survives parsing)

**Warnings** (promoted to errors in strict mode):
- `lang` or `title` absent from frontmatter
- a chapter heading whose trailing `{#...}` does not match a valid anchor shape
- text found before the first `@role` line of the file
- markdown emphasis present anywhere in a turn's raw source
- a line inside an open turn that resembles a directive, a list item, a table row, or a fenced code block
- more than one role used for the great majority of a script's text with no `@signpost` role at all

With the source document available, validators SHOULD additionally check that every chapter anchor exists among that document's own heading ids.

---

## Version

| Version | Date | Changes |
|---|---|---|
| 0.1 | 2026-09-01 | Initial draft: frontmatter (`title`, `lang`), chapters with optional `{#anchor}`, open-vocabulary `@role` speech turns, spoken-paragraph rules, defensive emphasis stripping, provider-agnostic rendering principle, degradation and validation rules |
