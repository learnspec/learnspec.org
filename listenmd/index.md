# ListenMD

**The speech-only rendition format of the [LearnSpec](/) suite.**

A ListenMD script is what a piece of content becomes when it is rendered for
ears instead of eyes: an ordered sequence of spoken turns, each attributed to
an abstract voice role, grouped into optional chapters. It is the suite's
first **[rendition format](/charter/#interoperability-matrix)**, not an
authoring format for instruction, but a rendering target derived from an
existing content format, typically a [LearnMD](/learnmd/) lesson, rewritten
for a listener who cannot see a diagram, a table, or a list.

Its contribution is not writing but **rewriting**: the script says what the
listener hears next, in prose meant to be read aloud, and nothing else.

## Nothing to see, only to hear

A ListenMD script contains nothing a text-to-speech engine cannot read aloud.
No images, no tables, no code blocks, no lists, no LaTeX, no markdown
emphasis. This constraint is what makes the format safe to synthesize
blindly: whatever a producing pipeline puts in a `.listen.md` file, a
renderer can hand straight to a TTS engine, turn by turn, without guessing
what to skip.

| Line | Spoken? |
|---|---|
| A paragraph inside an open `@role` turn | **Yes**, verbatim |
| `@role` marker, `## Chapter {#anchor}` heading | No, structure only |
| `> a blockquote aside` | No, reserved for shownotes and source links |

The worst case is always a readable transcript, never a broken render, never
hidden content.

## Key principles

| Principle | Description |
|---|---|
| **Speech-only** | Everything outside frontmatter and blockquote asides is spoken verbatim, no visual content, no deixis to something the listener cannot see |
| **Role-abstract** | Turns name abstract voice roles (`@host`, `@signpost`, `@guest`…), never a provider, a voice id, or a style tag |
| **Provider-agnostic** | Which concrete voice renders a role is a decision made outside the file, by whatever pipeline renders it |
| **Traceable to source** | Chapter anchors reuse the source document's own heading slugs, so a rendition can be resynchronised when the source changes |

## A taste

```markdown
---
title: "Why the sky is blue"
lang: en
---

## Scattering the light

@host
Look up on a clear day and you'll see one thing: blue, not violet, though
violet scatters even more.

@guest
Wait, so why isn't the sky violet, then?

@host
Because our eyes are far more sensitive to blue, and part of the violet gets
absorbed high in the atmosphere before it ever reaches you.
```

## Read more

- **[Full specification →](/listenmd/spec)**
- Repository: [learnspec/listenmd](https://github.com/learnspec/listenmd), includes worked examples (a documentary-style episode, a two-voice dialogue, a short trailer) and a companion compiler
