<script setup lang="ts">
// Links a documentation page to the static player at /play/, loading one of
// the official samples from github.com/learnspec/samples-learnspec.
//
// `target="_blank"` is required, not cosmetic: /play/ is a separate static app
// folded into the Pages artifact at deploy time, so it is not a VitePress
// route. Without it the SPA router would intercept the click and 404.

const SAMPLES_RAW =
  'https://raw.githubusercontent.com/learnspec/samples-learnspec/main/'

const props = defineProps<{
  /** Path of the sample within the samples repository. */
  file: string
  /** Link text. Defaults to a generic call to action. */
  label?: string
}>()

const href = `/play/?url=${encodeURIComponent(SAMPLES_RAW + props.file)}`
</script>

<template>
  <a class="try-it" :href="href" target="_blank" rel="noopener">
    <span class="try-it-icon" aria-hidden="true">▶</span>
    {{ label ?? 'Try it in the player' }}
  </a>
</template>

<style scoped>
.try-it {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  margin: 0.35rem 0.5rem 0.35rem 0;
  padding: 0.45rem 0.95rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.try-it:hover {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.try-it-icon {
  font-size: 0.75em;
}
</style>
