<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
});
</script>

<template>
  <iframe
    style="border-radius: 12px"
    :src="
      'https://open.spotify.com/embed/' +
      props.src +
      '?utm_source=generator&theme=0'
    "
    width="80%"
    height="352"
    frameBorder="0"
    :allowfullscreen="false"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>
</template>

<style scoped>
iframe {
  width: 100%;
  box-shadow: var(--shadow-sc);
}
@media screen and (min-width: 744px) {
  iframe {
    max-width: 1136px;
  }
}
</style>
