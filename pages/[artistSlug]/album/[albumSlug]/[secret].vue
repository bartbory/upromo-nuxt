<script setup lang="ts">
import SocialButton from "~/components/backoffice/UI/SocialButton.vue";
import YouTube from "~/components/iframes/YouTube.vue";
import { IAlbum } from "~/types";
import ConcertsList from "~/components/frontend/ConcertsList.vue";
import Soundcloud from "~/components/iframes/Soundcloud.vue";
import SpotifyPlayer from "~/components/iframes/SpotifyPlayer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const formData1: IAlbum = {
  id: "a1",
  secret: "jkhb4qjrghsakjh4bagkhb5khalvkjdn",
  albumName: "Millennials vibes",
  albumSlug: "millennials-vibes",
  artistName: "Mysterious",
  artistSlug: "mysterious",
  releaseDate: "22/09/2023",
  label: "Music Label",
  genre: "Rock",
  description: `"The Eagles of Shadow" is a rock band hailing from Los Angeles, California. Their latest album, "Lucy Perk got new tattoo," released on May 11th, 2023, features 13 tracks that delve into themes of fighting fears and the system.

The album showcases the band's signature heavy guitar riffs, explosive drum beats, and powerful vocals that convey a sense of urgency and rebellion. The lyrics explore the idea of taking control of one's own life and standing up against oppression or limitations, inspiring listeners to overcome their own struggles and fears.

Standout tracks on the album include the hard-hitting "Revolt," which features a catchy chorus and a driving rhythm section, and the emotional ballad "Breaking Chains," which showcases the band's softer side with its poignant lyrics and haunting melody.
Overall, "Lucy Perk got new tattoo" is a powerful and cathartic album that solidifies The Eagles of Shadow's place as one of the most dynamic and exciting rock bands of the modern era.`,
  player: "spotify",
  playerSoundcloud: `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1627019092%3Fsecret_token%3Ds-SSv6xaWAxAo&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-141038077" title="User 141038077" target="_blank" style="color: #cccccc; text-decoration: none;">User 141038077</a> · <a href="https://soundcloud.com/user-141038077/sets/mixed-for-user-141038077/s-SSv6xaWAxAo" title="Mixed for User 141038077" target="_blank" style="color: #cccccc; text-decoration: none;">Mixed for User 141038077</a></div>`,
  playerSpotify: `album/6KQa2rAuOS2rX18xyA9eru`,
  youtubeVideos: "-km8p6rb_EY, 4VU7peQRSMs, 67Pylw3Kukc",
  contact: [
    {
      id: "j2heasdadkl",
      name: "Mark Bordow",
      phone: "22 555 333 222",
      email: "mark.bordow@musiclabel.com",
      role: "Manager",
    },
    {
      id: "j2henfsdkl",
      name: "Yosef Hadachi",
      phone: "22 666 555 444",
      email: "yosef.hadachi@musiclabel.com",
      role: "Tour manager",
    },
  ],
  links: {
    spotify: null,
    soundcloud: "aaa",
    youtube: "aaa",
    facebook: null,
    instagram: "aaa",
    tiktok: "aaa",
    twitter: null,
  },
  images: {
    hero: { path: "img4.png", createdBy: "", alt: "" },
    logo: null,
    cover: { path: "cover2.png", createdBy: "", alt: "" },
    promo: [
      { path: "img5.png", createdBy: "Jacob Nielse", alt: "" },
      { path: "img6.png", createdBy: "Mark Twain", alt: "" },
      { path: "img7.png", createdBy: "Tony Hawk", alt: "" },
      { path: "img8.png", createdBy: "Rob Bob", alt: "" },
      { path: "img9.png", createdBy: "Salma Hayek", alt: "" },
      { path: "img1.png", createdBy: "Ed Sheeran", alt: "" },
      { path: "img2.png", createdBy: "Mario Bros", alt: "" },
    ],
    background: { path: "bg3.webp", createdBy: "Mario Bros", alt: "" },
  },
  files: [
    {
      name: "Photopack",
      path: "samplePath/ToFile/photopack.zip",
      type: "zip",
    },
    { name: "Bio", path: "samplePath/ToFile/bio.doc", type: "doc" },
    {
      name: "Poster",
      path: "samplePath/ToFile/poster.ai",
      type: "ai",
    },
  ],
  tour: {
    name: "Tour de hell",
    description:
      'Join the enigmatic "Mysterious" band on their electrifying concert tour, "Tour de Hell." Experience an otherworldly journey through the depths of their haunting melodies and captivating stage presence. With mind-bending visuals, intricate costumes, and a fusion of genres, each performance will transport you to a realm of mysticism and intrigue. Get ready for a spellbinding musical odyssey that will leave you mesmerized and craving more. Embark on the Tour de Hell and unlock the secrets of the unknown with "Mysterious"!',
    link: "link",
    image: { path: "img10.png", alt: "", createdBy: "" },
    concerts: null,
  },
  status: "published",
  displayMode: "dark",
};
const formData2: IAlbum = {
  id: "a1",
  secret: "jkhb4qjrghsakjh4bagkhb5khalvkjdn",
  albumName: "Millennials vibes",
  albumSlug: "millennials-vibes",
  artistName: "Mysterious",
  artistSlug: "mysterious",
  releaseDate: "22/09/2023",
  label: "Music Label",
  genre: "Rock",
  description: `"The Eagles of Shadow" is a rock band hailing from Los Angeles, California. Their latest album, "Lucy Perk got new tattoo," released on May 11th, 2023, features 13 tracks that delve into themes of fighting fears and the system.

The album showcases the band's signature heavy guitar riffs, explosive drum beats, and powerful vocals that convey a sense of urgency and rebellion. The lyrics explore the idea of taking control of one's own life and standing up against oppression or limitations, inspiring listeners to overcome their own struggles and fears.

Standout tracks on the album include the hard-hitting "Revolt," which features a catchy chorus and a driving rhythm section, and the emotional ballad "Breaking Chains," which showcases the band's softer side with its poignant lyrics and haunting melody.
Overall, "Lucy Perk got new tattoo" is a powerful and cathartic album that solidifies The Eagles of Shadow's place as one of the most dynamic and exciting rock bands of the modern era.`,
  player: "soundcloud",
  playerSoundcloud: `<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1627019092%3Fsecret_token%3Ds-SSv6xaWAxAo&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-141038077" title="User 141038077" target="_blank" style="color: #cccccc; text-decoration: none;">User 141038077</a> · <a href="https://soundcloud.com/user-141038077/sets/mixed-for-user-141038077/s-SSv6xaWAxAo" title="Mixed for User 141038077" target="_blank" style="color: #cccccc; text-decoration: none;">Mixed for User 141038077</a></div>`,
  playerSpotify: `album/6KQa2rAuOS2rX18xyA9eru`,
  youtubeVideos: "-km8p6rb_EY, 4VU7peQRSMs, 67Pylw3Kukc",
  contact: [
    {
      id: "j2heasdadkl",
      name: "Mark Bordow",
      phone: "22 555 333 222",
      email: "mark.bordow@musiclabel.com",
      role: "Manager",
    },
    {
      id: "j2henfsdkl",
      name: "Yosef Hadachi",
      phone: "22 666 555 444",
      email: "yosef.hadachi@musiclabel.com",
      role: "Tour manager",
    },
  ],
  links: {
    spotify: null,
    soundcloud: "aaa",
    youtube: "aaa",
    facebook: null,
    instagram: "aaa",
    tiktok: "aaa",
    twitter: null,
  },
  images: {
    hero: { path: "img4.png", createdBy: "", alt: "" },
    logo: null,
    cover: { path: "cover2.png", createdBy: "", alt: "" },
    promo: [
      { path: "img5.png", createdBy: "Jacob Nielse", alt: "" },
      { path: "img6.png", createdBy: "Mark Twain", alt: "" },
      { path: "img7.png", createdBy: "Tony Hawk", alt: "" },
      { path: "img8.png", createdBy: "Rob Bob", alt: "" },
      { path: "img9.png", createdBy: "Salma Hayek", alt: "" },
      { path: "img1.png", createdBy: "Ed Sheeran", alt: "" },
      { path: "img2.png", createdBy: "Mario Bros", alt: "" },
    ],
    background: { path: "bg2.jpeg", createdBy: "Mario Bros", alt: "" },
  },
  files: [
    {
      name: "Photopack",
      path: "samplePath/ToFile/photopack.zip",
      type: "zip",
    },
    { name: "Bio", path: "samplePath/ToFile/bio.doc", type: "doc" },
    {
      name: "Poster",
      path: "samplePath/ToFile/poster.ai",
      type: "ai",
    },
  ],
  tour: {
    name: "Tour de hell",
    description:
      'Join the enigmatic "Mysterious" band on their electrifying concert tour, "Tour de Hell." Experience an otherworldly journey through the depths of their haunting melodies and captivating stage presence. With mind-bending visuals, intricate costumes, and a fusion of genres, each performance will transport you to a realm of mysticism and intrigue. Get ready for a spellbinding musical odyssey that will leave you mesmerized and craving more. Embark on the Tour de Hell and unlock the secrets of the unknown with "Mysterious"!',
    link: "link",
    image: null,
    concerts: null,
  },
  status: "published",
  displayMode: "light",
};

const router = useRoute();

const formData = computed(() => {
  if (router.query.mode === "1") {
    return formData1;
  } else {
    return formData2;
  }
});

const youtubeVideos = computed(() => {
  return formData.value.youtubeVideos?.split(",");
});

const background = computed(() => {
  if (formData.value.images.background) {
    return `url(${formData.value.images.background.path})`;
  } else {
    return "";
  }
});
// const isDark = computed(() => {
//   if (formData.value.displayMode === "light") {
//     return "false";
//   } else {
//     return "true";
//   }
// });
</script>

<template>
  <main
    :style="{ backgroundImage: background }"
    :class="{ dark: router.query.mode === '1' }"
  >
    <header :style="{ backgroundImage: `url(${formData.images.hero?.path})` }">
      <p class="logo">UPROMO</p>
      <div class="header__album">
        <div class="header__album__image" v-if="formData.images?.cover">
          <img :src="formData.images.cover.path" />
        </div>
        <div class="header__album__details">
          <h1>{{ formData.artistName }}</h1>
          <h2>{{ formData.albumName }}</h2>
        </div>
      </div>
    </header>
    <section
      class="player"
      v-if="formData.playerSoundcloud || formData.playerSpotify"
    >
      <Soundcloud
        v-if="formData.player === 'soundcloud' && formData.playerSoundcloud"
        :src="formData.playerSoundcloud"
      />
      <SpotifyPlayer
        v-if="formData.player === 'spotify' && formData.playerSpotify"
        :src="formData.playerSpotify"
      />
      <div class="blue"></div>
    </section>
    <section class="informations container">
      <div class="information__container__1">
        <div class="information__container__2">
          <div class="information">
            <label>Artist / band</label>
            <h3>{{ formData.artistName }}</h3>
          </div>
          <div class="information">
            <label>Album name</label>
            <h3>{{ formData.albumName }}</h3>
          </div>
          <div class="information">
            <label>Realease date</label>
            <h3>{{ formData.releaseDate }}</h3>
          </div>
          <div class="information">
            <label>Label</label>
            <h3>{{ formData.label }}</h3>
          </div>
        </div>
        <div class="information" v-if="formData.images.cover">
          <label>Cover</label>
          <img :src="formData.images.cover.path" />
        </div>
      </div>
      <div class="information">
        <label>Description</label>
        <p>{{ formData.description }}</p>
      </div>
    </section>
    <section class="video">
      <YouTube
        v-for="media in youtubeVideos"
        :key="media"
        :src="media"
      />
    </section>
    <div
      v-if="formData.tour?.image"
      class="tour__parallax"
      :style="{ backgroundImage: `url(${formData.tour.image.path})` }"
    ></div>
    <section class="tour container" v-if="formData.tour">
      <h1>Tour "{{ formData.tour.name }}"</h1>
      <p>{{ formData.tour.description }}</p>
      <a v-if="formData.tour.link" :href="formData.tour.link">External link</a>
      <ConcertsList
        v-if="formData.tour.concerts"
        :concerts="formData.tour.concerts"
      />
    </section>
    <section class="promo">
      <div class="gallery__container" v-if="formData.images.promo">
        <div class="gallery__item" v-for="image in formData.images.promo">
          <img :src="image.path" />
        </div>
      </div>
      <div class="purple"></div>
      <div class="materials container" v-if="formData.files">
        <h1>Promo materials</h1>
        <div class="materials__list">
          <SocialButton
            v-for="file in formData.files"
            icon="file"
            :text="file.name + '.' + file.type"
          />
        </div>
      </div>
    </section>

    <section class="booking container">
      <h1>Booking contact</h1>
      <div class="booking__contact" v-for="contact in formData.contact">
        <h2>{{ contact.name }}</h2>
        <label>{{ contact.role }}</label>
        <p>{{ contact.phone }}</p>
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </div>
    </section>
  </main>
  <footer>
    <section class="social__links" v-if="formData.links">
      <SocialButton
        icon="facebook"
        :text="formData.links.facebook"
        v-if="formData.links.facebook"
      />
      <SocialButton
        icon="instagram"
        :text="formData.links.instagram"
        v-if="formData.links.instagram"
      />
      <SocialButton
        icon="spotify"
        :text="formData.links.spotify"
        v-if="formData.links.spotify"
      />
      <SocialButton
        icon="soundcloud"
        :text="formData.links.soundcloud"
        v-if="formData.links.soundcloud"
      />
      <SocialButton
        icon="youtube"
        :text="formData.links.youtube"
        v-if="formData.links.youtube"
      />
      <SocialButton
        icon="tiktok"
        :text="formData.links.tiktok"
        v-if="formData.links.tiktok"
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
}

.header__album__image {
  display: none;
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
  flex: 0 0 100%;
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
  max-width: 100%;
  flex: 1 1 30%;
}

.gallery__item img {
  width: 100%;
}
.purple {
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: var(--purple-900);
  z-index: -1;
}

.dark:deep(.purple) {
  filter: brightness(0.3);
}

.materials__list {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
}
.booking__contact {
  padding: 24px 16px;
  background-color: var(--gray-100);
  margin-bottom: 40px;
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
    width: 146px;
    height: 146px;
  }
  .header__album__image img {
    width: 100%;
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
    flex: 0 1 23%;
  }
  .video > iframe {
    flex: 0 0 45%;
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
    width: 146px;
    height: 146px;
  }
  .header__album__image img {
    width: 100%;
  }

  .video > iframe {
    flex: 0 0 30%;
  }
  .information__container__1 {
    display: flex;
    column-gap: 40px;
  }
  .information__container__1 > div {
    flex: 1 1 50%;
  }
  .tour__parallax {
    height: 800px;
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
    flex: 0 1 23%;
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
