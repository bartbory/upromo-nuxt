<script setup lang="ts">
const props = defineProps({
  src: { type: String, required: true },
});
</script>
<template>
  <iframe
    height="300px"
    :src="'https://www.youtube.com/embed/' + props.src"
    title="YouTube video player"
    frameborder="0"
    allow="encrypted-media; web-share"
    allowfullscreen
  ></iframe>
</template>
