# AnimMD

**The step-reveal animation format of the [LearnSpec](/) suite.**

An AnimMD script narrates an *existing* vector scene, a diagram from a
[DiagramMD](/diagrammd/) catalogue, an SVG asset from a [MediaMD](/mediamd/)
catalogue, by revealing its elements step by step, each step paired with a
caption. Read all at once, a cycle is four boxes and four arrows; revealed in
the direction the process actually runs, the same figure carries the mechanism.

Its contribution is not drawing but **order**: the script chooses what the
reader sees next, and why.

**[▶ Try the live demo](https://learnspec.org/play/?url=https%3A%2F%2Flearnspec.org%2Fplay%2Fsamples%2Fanim-demo%2Fwater-cycle.learn.md)**: the water cycle, animated and static side by side in the [player](https://learnspec.org/play/).

## Not a video, not a timeline

AnimMD deliberately contains no keyframes, no easing curves, and no
coordinates. A timeline fails *badly* under LLM authoring, a misjudged offset
still runs, silently wrong. A step list fails *well*:

| What goes wrong | What the reader sees |
|---|---|
| Unknown name in a directive | That directive is skipped, the rest of the step plays |
| Malformed directive line | It is read as caption prose |
| Unparseable script | The scene renders statically, all at once |

The worst case is always the static scene the host already displays.

## Key principles

| Principle | Description |
|---|---|
| **Markdown-first** | One `##` heading per step, directive lines, prose captions |
| **Scene-agnostic** | The script addresses *names*; a per-generator adapter resolves them, never a renderer id |
| **Learner-paced** | Steps advance on the reader's gesture: tap, key, or scroll. No autoplay |
| **Companion format** | It attaches to a scene declared by a host format; it never stands alone |

## A taste

```markdown
---
bind:
  oceans: {node: O}
  evaporation: {edge: [O, V]}
---

## Where it starts
show: oceans
focus: oceans

Most of Earth's water sits in the oceans.

## Evaporation
draw: evaporation

Solar energy turns liquid water into vapour.
```

## Read more

- **[Full specification →](/animmd/spec)**
- **[Live demo in the player](https://learnspec.org/play/?url=https%3A%2F%2Flearnspec.org%2Fplay%2Fsamples%2Fanim-demo%2Fwater-cycle.learn.md)**: the same stock entry referenced twice, animated and static
- Repository: [learnspec/animmd](https://github.com/learnspec/animmd): includes a complete worked example (the water cycle)
