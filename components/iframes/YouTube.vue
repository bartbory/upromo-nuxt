<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
});
</script>
<template>
  <iframe
    height="360px"
    :src="'https://www.youtube.com/embed/' + props.src.trim()"
    title="YouTube video player"
    frameborder="0"
    allow="encrypted-media; web-share"
    allowfullscreen
  ></iframe>
</template>
