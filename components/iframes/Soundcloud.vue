<script setup lang="ts">
import { computed } from "vue";
import getPlaylistId from "../../helpers/getPlaylistId";
import getPlaylistSecretToken from "../../helpers/getPlaylistSecretToken";

const props = defineProps({
  src: { type: String, required: true },
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
</script>

<template>
  <iframe
    width="80%"
    height="640"
    scrolling="no"
    frameborder="no"
    allow="autoplay"
    :src="
      'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/' +
      playlistId +
      secretToken +
      '&color=%23ba2dff&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false'
    "
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
