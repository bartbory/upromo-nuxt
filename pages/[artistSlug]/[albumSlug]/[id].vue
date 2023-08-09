<script setup lang="ts">
import SocialButton from "~/components/backoffice/UI/SocialButton.vue";
import YouTube from "~/components/iframes/YouTube.vue";
import { IAlbum } from "~/types";
import ConcertsList from "~/components/frontend/ConcertsList.vue";
import Soundcloud from "~/components/iframes/Soundcloud.vue";
import SpotifyPlayer from "~/components/iframes/SpotifyPlayer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import FileButton from "~/components/backoffice/UI/FileButton.vue";

const route = useRoute();
const albumId = route.params.id;

let album: IAlbum;

const isLoading = ref(true);
const isError = reactive({
  status: false,
  msg: "",
});
const isDark = ref("LIGHT");

const { data, error, pending } = await useFetch<{ data: IAlbum }>(
  `/api/secret/${albumId.toString()}`
);

if (!error.value && data.value && !pending.value) {
  album = data.value.data;
  if (
    route.params.artistSlug !== data.value.data.artistSlug ||
    route.params.albumSlug !== data.value.data.albumSlug ||
    route.query.secret !== data.value.data.secret
  ) {
    isError.status = true;
    isLoading.value = false;
    navigateTo("/youdont/havepermisson/404");
  }
  isDark.value = album.displayMode;
  isLoading.value = false;
}

const youtubeVideos = computed(() => {
  if (album.youtubeVideos) {
    return album.youtubeVideos.split(",");
  } else return "";
});

const background = computed(() => {
  if (album.images.background) {
    return `url(${album.images.background}?width=1920&height=500)`;
  } else {
    return "";
  }
});
</script>

<template>
  <LoadingScreen v-if="isLoading && !isError.status" />
  <main
    v-else-if="!isLoading && !isError.status"
    :style="{ backgroundImage: background }"
    :class="{ dark: isDark === 'LIGHT' ? false : true }"
  >
    <header
      :style="{
        backgroundImage: `url(${album.images.hero}?width=1920&height=500)`,
      }"
    >
      <p class="logo">UPROMO</p>
      <div class="header__album">
        <div class="header__album__image" v-if="album.images?.cover">
          <img :src="album.images.cover" />
        </div>
        <div class="header__album__details">
          <h1>{{ album.artistName }}</h1>
          <h2>{{ album.albumName }}</h2>
        </div>
      </div>
    </header>
    <section
      class="player"
      v-if="album.playerSoundcloud || album.playerSpotify"
    >
      <Soundcloud
        v-if="album.player === 'SOUNDCLOUD' && album.playerSoundcloud"
        :src="album.playerSoundcloud"
      />
      <SpotifyPlayer
        v-if="album.player === 'SPOTIFY' && album.playerSpotify"
        :src="album.playerSpotify"
      />
      <div class="blue"></div>
    </section>
    <section class="informations container">
      <div class="information__container__1">
        <div class="information__container__2">
          <div class="information">
            <label>Artist / band</label>
            <h3>{{ album.artistName }}</h3>
          </div>
          <div class="information">
            <label>Album name</label>
            <h3>{{ album.albumName }}</h3>
          </div>
          <div class="information">
            <label>Realease date</label>
            <h3>{{ album.releaseDate }}</h3>
          </div>
          <div class="information">
            <label>Label</label>
            <h3>{{ album.label }}</h3>
          </div>
        </div>
        <div class="information" v-if="album.images.cover">
          <label>Cover</label>
          <img :src="album.images.cover" :alt="`${album.albumName} - Cover`" />
        </div>
      </div>
      <div class="information">
        <label>Description</label>
        <div class="description__block" v-html="album.description"></div>
      </div>
    </section>
    <section class="video" v-if="youtubeVideos.length > 0">
      <YouTube v-for="media in youtubeVideos" :key="media" :src="media" />
    </section>
    <div
      v-if="album.tour?.image"
      class="tour__parallax"
      :style="{ backgroundImage: `url(${album.tour.image})` }"
    ></div>
    <section class="tour container" v-if="album.tour">
      <h1>Tour "{{ album.tour.name }}"</h1>
      <div class="description__block" v-html="album.tour.description"></div>
      <a v-if="album.tour.link" :href="album.tour.link">External link</a>
      <ConcertsList
        v-if="album.tour.concerts"
        :concerts="album.tour.concerts"
      />
    </section>
    <section class="promo">
      <div class="gallery__container" v-if="album.images.promo.length > 0">
        <div
          class="gallery__item"
          v-for="image in album.images.promo"
          @click="navigateTo(`${image.path}`)"
          :key="image.id"
        >
          <img
            :src="image.path"
            :alt="
              (image.description ? image.description : '') +
              (image.author ? ' / Created by: ' + image.author : '')
            "
            @click="navigateTo(image.path, { external: true })"
          />
        </div>
      </div>
      <div class="purple"></div>
      <div class="materials container" v-if="album.files.length > 0">
        <h1>Promo materials</h1>
        <div class="materials__list">
          <FileButton
            v-for="file in album.files"
            :key="file.id"
            :name="file.name"
            :link="file.path"
          />
        </div>
      </div>
    </section>

    <section class="booking container" v-if="album.contact.length > 0">
      <h1>Booking contact</h1>
      <div class="booking__contact" v-for="contact in album.contact">
        <h2>{{ contact.name }}</h2>
        <label>{{ contact.role }}</label>
        <p>{{ contact.phone }}</p>
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </div>
    </section>
  </main>
  <footer>
    <section
      class="social__links"
      v-if="
        album.links.facebook ||
        album.links.instagram ||
        album.links.soundcloud ||
        album.links.spotify ||
        album.links.tiktok ||
        album.links.twitter ||
        album.links.youtube
      "
    >
      <SocialButton
        icon="facebook"
        :link="album.links.facebook"
        baselink="https://www.facebook.com/"
        name="Facebook"
        v-if="album.links.facebook"
      />
      <SocialButton
        icon="instagram"
        :link="album.links.instagram"
        baselink="https://www.instagram.com/"
        name="Instagram"
        v-if="album.links.instagram"
      />
      <SocialButton
        icon="spotify"
        :link="album.links.spotify"
        baselink="https://open.spotify.com/artist/"
        name="Spotify"
        v-if="album.links.spotify"
      />
      <SocialButton
        icon="soundcloud"
        :link="album.links.soundcloud"
        baselink="https://www.soundcloud.com/"
        name="SoundCloud"
        v-if="album.links.soundcloud"
      />
      <SocialButton
        icon="youtube"
        :link="album.links.youtube"
        baselink="https://www.youtube.com/channel/"
        name="YouTube"
        v-if="album.links.youtube"
      />
      <SocialButton
        icon="tiktok"
        :link="album.links.tiktok"
        baselink="https://www.tiktok.com/"
        name="Tik-Tok"
        v-if="album.links.tiktok"
      />
    </section>

    <p>powered by <span class="logo--footer">UPROMO</span></p>
  </footer>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  font-size: 16px;
  font-family: "Mukta";
  line-height: 28px;
  flex-direction: column;
}

.dark {
  color: var(--white-900);
  background-color: rgb(10, 10, 10);
}
main {
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  z-index: 1;
  background-color: var(--white-900);
}

section {
  z-index: 2;
}
h1 {
  font-size: 24px;
  font-family: "Mukta";
}
h2 {
  font-size: 20px;
  font-family: "Mukta";
}
h3 {
  font-size: 20px;
  font-family: "Mukta";
}

header {
  background-position: center;
  background-size: cover;
  height: 50vh;
  width: 100%;
  position: relative;
}

label {
  font-size: 16px;
  opacity: 0.3;
}

.dark:deep(label) {
  color: var(--white-900);
}

.header__album {
  width: 100%;
  background: var(--gradient-blackout);
  color: var(--white-900);
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0px;
}

.header__album__image {
  display: none;
  padding: 8px;
}

.header__album__details {
  padding: 16px 24px;
}
.logo {
  position: absolute;
  top: 24px;
  left: 24px;
}

.player {
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  position: relative;
}

.description__block {
  display: flex;
  gap: 24px;
  flex-direction: column;
}
.blue {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background-color: var(--blue-900);
  z-index: -1;
}

.dark:deep(.blue) {
  filter: brightness(0.3);
}

.container {
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}
.information {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.information > img {
  width: 100%;
}

.information__container__2 {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.social__links {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 8px;
  width: 80%;
  margin: 0 auto;
}

.video {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 40px;
}

.video > iframe {
  flex: 1 0 100%;
}

.tour__parallax {
  position: relative;
  height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 40px 0;
}

.promo {
  margin-top: 40px;
  position: relative;
}
.dark > .promo:deep(button) {
  background-color: var(--gray-900);
  color: var(--white-900);
}

.gallery__container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.gallery__item {
  flex: 1 1 30%;
  max-width: 30%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: var(--shadow-file);
}
.gallery__item img {
  width: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s ease-in-out;
}
.gallery__item:hover img {
  width: 105%;
}
.purple {
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: var(--purple-900);
  z-index: -1;
}

.dark:deep(.purple) {
  filter: brightness(1);
}

.materials__list {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
}
.booking {
  margin-bottom: 40px;
}
.booking__contact {
  padding: 24px 16px;
  background-color: var(--gray-100);
}

.dark:deep(.booking__contact) {
  background-color: var(--gray-900);
}

footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 32px 0;
  background: var(--gradient-purple);
  color: var(--white-900);
  font-family: "Krona One";
  font-size: 12px;
}

footer span {
  font-size: 24px;
}

@media screen and (min-width: 744px) {
  .container {
    padding: 44px;
    width: 100%;
    max-width: 1136px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    row-gap: 24px;
  }
  h1 {
    font-size: 32px;
    font-family: "Mukta";
  }
  h2 {
    font-size: 24px;
    font-family: "Mukta";
  }
  header {
    height: 70vh;
  }
  .header__album {
    width: calc(100% - 88px);
    margin: 0 44px;
    max-width: 1136px;
    background: var(--gradient-blackout);
    color: var(--white-900);
    position: absolute;
    bottom: 0;
    left: 44px;
    display: flex;
    margin: 0 auto;
    align-items: center;
  }

  .header__album__image {
    display: block;
    max-width: 164px;
    max-height: 164px;
    overflow: hidden;
  }
  .header__album__image img {
    object-fit: cover;
    height: 100%;
  }
  .player {
    padding: 44px;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    position: relative;
  }

  .information__container__1 {
    display: flex;
    column-gap: 40px;
  }
  .information__container__1 > div {
    flex: 1 1 50%;
  }
  .tour__parallax {
    height: 400px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 40px 0;
  }
  .social__links {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    width: 80%;
    margin: 0 auto;
  }
  .gallery__item {
    flex: 1 1 23%;
  }
  .video > iframe {
    flex: 1 0 45%;
  }
  .materials,
  .booking {
    padding: 40px 80px;
  }

  .materials__list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
  }

  .materials__list > button {
    flex: 1 0 30%;
  }
}

@media screen and (min-width: 1440px) {
  .container {
    padding: 0px;
    width: 100%;
    max-width: 1136px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    row-gap: 24px;
  }
  h1 {
    font-size: 48px;
    font-family: "Mukta";
  }
  h2 {
    font-size: 32px;
    font-family: "Mukta";
  }
  header {
    height: 90vh;
  }
  .header__album {
    width: 1136px;
    background: var(--gradient-blackout);
    color: var(--white-900);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
  }

  .header__album__image {
    display: block;
  }
  .header__album__image img {
    width: 100%;
  }

  .video > iframe {
    flex: 1 0 30%;
  }
  .information__container__1 {
    display: flex;
    column-gap: 40px;
  }
  .information__container__1 > div {
    flex: 1 1 50%;
  }
  .tour__parallax {
    height: 700px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 40px 0;
  }
  .social__links {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    width: 80%;
    margin: 0 auto;
  }
  .gallery__item {
    flex: 1 1 23%;
  }
  .materials,
  .booking {
    padding: 40px 80px;
  }

  .materials__list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
  }

  .materials__list > button {
    flex: 1 0 30%;
  }
}
</style>
