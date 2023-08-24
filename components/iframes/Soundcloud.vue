<script setup lang="ts">
import { computed } from "vue";
import getPlaylistId from "../../composables/getPlaylistId";
import getPlaylistSecretToken from "../../composables/getPlaylistSecretToken";

const props = defineProps({
  src: { type: String, required: true },
  color: { type: String, required: false },
});

const playlistId = computed(() => {
  if (props.src) {
    const id = getPlaylistId(props.src);
    return id;
  } else {
    return null;
  }
});

const secretToken = computed(() => {
  if (props.src) {
    const secret = getPlaylistSecretToken(props.src);
    return secret;
  } else return null;
});

const color = computed(() => {
  if (props.color) {
    return props.color.replace("#", "%23");
  } else {
    return "ba2dff";
  }
});
</script>

<template>
  <iframe
    width="auto"
    height="400"
    scrolling="no"
    frameborder="no"
    allow="autoplay"
    :src="
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' +
      playlistId +
      secretToken +
      `&color=${color}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`
    "
  ></iframe>
</template>

<style scoped>
iframe {
  width: 100%;
  box-shadow: var(--shadow-sc);
  flex-grow: 1;
  flex-shrink: 1;
}
@media screen and (min-width: 744px) {
  iframe {
    max-width: 1136px;
  }
}
</style>
