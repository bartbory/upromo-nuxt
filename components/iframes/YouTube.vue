<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
});
</script>
<template>
  <iframe
    title="Youtube player"
    height="auto"
    :src="'https://www.youtube.com/embed/' + props.src.trim()"
    frameborder="0"
    allow="encrypted-media; web-share"
    allowfullscreen
  ></iframe>
</template>
