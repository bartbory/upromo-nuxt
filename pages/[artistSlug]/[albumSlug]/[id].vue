<script setup lang="ts">
import SocialButton from "~/components/backoffice/UI/SocialButton.vue";
import YouTube from "~/components/iframes/YouTube.vue";
import { IAlbum, IImage } from "~/types";
import ConcertsList from "~/components/frontend/ConcertsList.vue";
import Soundcloud from "~/components/iframes/Soundcloud.vue";
import SpotifyPlayer from "~/components/iframes/SpotifyPlayer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import FileButton from "~/components/backoffice/UI/FileButton.vue";
import ModalImagePreview from "~/components/backoffice/modal/ModalImagePreview.vue";

const route = useRoute();
const albumId = route.params.id;

let album: IAlbum;

const isLoading = ref(true);
const isError = reactive({
  status: false,
  msg: "",
});
const showModal = ref(false);
const selectedImage = ref<IImage>({
  id: "",
  name: "",
  path: "",
  size: 0,
  author: null,
  description: null,
});

const isDark = ref("LIGHT");

const { data, error, pending } = await useFetch<{ data: IAlbum }>(
  `/api/secret/${albumId.toString()}`
);

let title = ref(``);
let ogDescription = ref(``);
let ogGraphic = ref(``);
if (!error.value && data.value && !pending.value) {
  album = data.value.data;
  title.value = `${album.artistName} / ${album.albumName}`;
  ogDescription.value = `Releasland presents media page of upcoming release - ${album.albumName}`;
  ogGraphic.value = album.images.cover;
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

useHead({
  title,
  meta: [
    { name: "author", content: "Bartosz Borycki" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  htmlAttrs: {
    lang: "pl",
  },
});

useSeoMeta({
  ogTitle: title,
  description: ogDescription,
  ogDescription: ogDescription,
  ogImage: ogGraphic,
});

// const customBackgroundColor = "#336ffe";
const shadow = computed(() => {
  if (album.customColor) {
    return {
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 8px ${album.customColor}`,
    };
  } else {
    return "";
  }
});

function imageClickHandler(image: IImage) {
  showModal.value = true;
  selectedImage.value = image;
}
</script>

<template>
  <LoadingScreen v-if="isLoading && !isError.status" />
  <main
    v-else-if="!isLoading && !isError.status"
    :style="{ backgroundImage: background }"
    :class="{ dark: isDark === 'LIGHT' ? false : true }"
  >
    <Teleport to="body">
      <ModalImagePreview
        :show="showModal"
        @close="showModal = false"
        :image="selectedImage"
      />
    </Teleport>
    <header
      :style="{
        backgroundImage: `url(${album.images.hero}?width=1920&height=500)`,
      }"
    >
      <p class="logo">RELEASLAND</p>
      <div class="header__album">
        <div class="header__album__image" v-if="album.images?.cover">
          <img
            :src="album.images.cover"
            :alt="`${album.albumName} - Cover`"
            loading="lazy"
          />
        </div>
        <div class="header__album__details">
          <h1>{{ album.artistName }}</h1>
          <h2>{{ album.albumName }}</h2>
        </div>
      </div>
    </header>
    <div class="cover on-sm" v-if="album.images.cover">
      <img
        :src="album.images.cover"
        :alt="`${album.albumName} - Cover`"
        loading="lazy"
      />
    </div>
    <section class="player__container">
      <div class="player">
        <div class="cover on-md" v-if="album.images.cover">
          <img
            :src="album.images.cover"
            :alt="`${album.albumName} - Cover`"
            loading="lazy"
          />
        </div>
        <Soundcloud
          v-if="album.player === 'SOUNDCLOUD' && album.playerSoundcloud"
          :src="album.playerSoundcloud"
        />
        <SpotifyPlayer
          v-if="album.player === 'SPOTIFY' && album.playerSpotify"
          :src="album.playerSpotify"
        />
        <div
          class="blue"
          :style="{
            backgroundColor: album.customColor ? album.customColor : '',
          }"
        ></div>
      </div>
    </section>
    <section class="informations container">
      <div class="information__box">
        <div class="information__details">
          <div class="information">
            <label>Artysta</label>
            <p>{{ album.artistName }}</p>
          </div>
          <div class="information">
            <label>Album</label>
            <p>{{ album.albumName }}</p>
          </div>
          <div class="information">
            <label>Premiera</label>
            <p>{{ album.releaseDate }}</p>
          </div>
          <div class="information">
            <label>Wydawnictwo</label>
            <p>{{ album.label }}</p>
          </div>
        </div>
      </div>
      <div class="information">
        <label>Informacja prasowa</label>
        <div class="description__block" v-html="album.description"></div>
      </div>
    </section>
    <section class="video" v-if="youtubeVideos.length > 0">
      <YouTube v-for="media in youtubeVideos" :key="media" :src="media" />
    </section>
    <section class="tour container" v-if="album.tour">
      <h1>Trasa koncertowa "{{ album.tour.name }}"</h1>
      <div class="album cover" v-if="album.tour.image">
        <img
          :src="album.tour.image"
          :alt="`${album.tour.name} - Promotional image`"
          loading="lazy"
        />
      </div>
      <div
        v-if="album.tour.description"
        class="description__block"
        v-html="album.tour.description"
      ></div>
      <a v-if="album.tour.link" :href="album.tour.link" target="_blank">{{
        album.tour.displayName
      }}</a>
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
          :style="shadow"
          :key="image.id"
        >
          <img
            :src="image.path"
            :alt="
              (image.description ? image.description : '') +
              (image.author ? ' / Created by: ' + image.author : '')
            "
            loading="lazy"
            @click="imageClickHandler(image)"
          />
          <p
            class="image__description"
            v-if="image.description || image.author"
          >
            {{ image.description ? image.description : "" }}
            {{ image.author ? `Autor: ${image.author}` : "" }}
          </p>
        </div>
      </div>
      <div
        class="purple"
        :style="{
          backgroundColor: album.customColor ? album.customColor : '',
        }"
      ></div>
      <div
        class="materials container"
        v-if="album.files.length > 0 || album.additionalLink"
      >
        <h1>Materiały promocyjne</h1>
        <div class="materials__list">
          <FileButton
            v-for="file in album.files"
            :key="file.id"
            :name="file.name"
            :link="file.path"
          />
          <FileButton
            v-if="album.additionalLink && album.additionalLinkName"
            :link="album.additionalLink"
            :name="album.additionalLinkName"
          />
        </div>
      </div>
    </section>

    <section class="booking container" v-if="album.contact.length > 0">
      <h1>Opieka nad artystą</h1>
      <div class="booking__contact" v-for="contact in album.contact">
        <h2>{{ contact.name }}</h2>
        <label>{{ contact.role }}</label>
        <a :href="`tel:${contact.phone?.replaceAll(' ', '')}`">{{
          contact.phone
        }}</a>
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
        album.links.tidal ||
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
        icon="file"
        :link="album.links.tidal"
        baselink="https://tidal.com/browse/artist/"
        name="Tidal"
        v-if="album.links.tidal"
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

    <p>powered by <span class="logo--footer">RELEASLAND</span></p>
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

.on-sm {
  padding: 24px;
  display: block;
}

.on-md {
  display: none;
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

.player__container {
  padding: 24px;
  position: relative;
}

.player {
  margin: 0 auto;
  width: 100%;
  max-width: 1136px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
.player > .cover {
  flex-grow: 0;
  border-radius: var(--br-8);
  overflow: hidden;
  min-height: 300px;
  height: 300px;
  max-height: 300px;
  min-width: 300px;
  aspect-ratio: 1;
  box-shadow: var(--shadow-sc);
}
.description__block {
  display: flex;
  gap: 24px;
  flex-direction: column;
}

.description__block:deep(li) {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.description__block:deep(li > span) {
  font-size: 0.7rem;
  font-style: italic;
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
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
  row-gap: 0px;
}

.cover > img {
  width: 100%;
  border-radius: var(--br-8);
  overflow: hidden;
  box-shadow: var(--shadow-sc);
}

.information__details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.tour > a {
  padding: 8px 16px;
  background-color: var(--white-900);
  color: var(--purple-900);
  border: 1px solid var(--purple-900);
  border-radius: var(--br-8);
  cursor: pointer;
  font-size: 1.6rem;
  align-self: flex-start;
  transition: all 0.3s ease-in-out;
}

.tour > a:hover {
  background-color: var(--purple-900);
  color: var(--white-900);
  border: 1px solid var(--purple-900);
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
  max-width: 1136px;
  gap: 24px;
  padding: 40px;
  margin: 0 auto;
}

.video > iframe {
  flex: 1 0 30%;
  max-width: 100%;
  aspect-ratio: 1.8;
  object-fit: cover;
}

.tour__parallax {
  position: relative;
  height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  background-size: contain;
  top: 0;
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
  position: relative;
  flex: 1 1 29%;
  max-width: 29%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: var(--shadow-file);
}
.gallery__item img {
  flex-shrink: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: relative;
  transform: scale(1);
  transition: transform 0.5s ease-in-out;
}

.image__description {
  position: absolute;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  bottom: 0px;
  padding: 4px;
  opacity: 0;
  text-align: center;
  transition: all 0.5s ease-in-out;
  font-size: 10px;
}
.gallery__item:hover img {
  transform: scale(1.2);
}

.gallery__item:hover .image__description {
  opacity: 1;
  bottom: 8px;
}
.purple {
  position: absolute;
  width: 100%;
  height: 35%;
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
  border: 1px solid var(--purple-900);
  border-radius: var(--br-8);
  transition: 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}
.booking__contact:hover {
  background-color: var(--white-900);
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
  .on-sm {
    display: none;
  }

  .on-md {
    display: block;
  }
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
    max-height: 100%;
    width: 100%;
  }
  .player__container {
    padding: 44px;
    flex-direction: row;
    gap: 24px;
    position: relative;
  }

  .player > .cover {
    min-height: 360px;
    height: 360px;
    max-height: 360px;
    min-width: 360px;
  }

  .information__box {
    display: flex;
    column-gap: 40px;
  }
  .information__box > div {
    flex: 1 1 50%;
  }
  .tour__parallax {
    height: 400px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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

@media screen and (min-width: 1200px) {
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
    object-fit: cover;
    max-height: 100%;
    width: 100%;
  }

  .player > .cover {
    min-height: 400px;
    height: 400px;
    max-height: 400px;
    min-width: 400px;
  }

  .video > iframe {
    flex: 1 0 30%;
    max-width: 75%;
    aspect-ratio: 1.8;
  }
  .information__box {
    display: flex;
    column-gap: 40px;
  }
  .information__box > div {
    flex: 1 1 50%;
  }
  .tour__parallax {
    height: 700px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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
