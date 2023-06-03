<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  IAlbum,
  StatusTypes,
  PlayerTypes,
  IImage,
  DisplayTypes,
} from "~/types";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import BaseTextarea from "~/components/backoffice/form/BaseTextarea.vue";
import StatusSelector from "~/components/backoffice/UI/StatusSelector.vue";
import BaseImageUpload from "~/components/backoffice/form/BaseImageUpload.vue";
import BaseImagesUpload from "~/components/backoffice/form/BaseImagesUpload.vue";
import BaseFilesUpload from "~/components/backoffice/form/BaseFilesUpload.vue";
import createSecret from "~/helpers/createSecret";
import TabSelect from "~/components/backoffice/UI/TabSelect.vue";
definePageMeta({
  layout: "backoffice-layout",
});

const formData: IAlbum = reactive({
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
  playerSpotify: `artist/12Zk1DFhCbHY6v3xep2ZjI"`,
  youtubeVideos: "-km8p6rb_EY, 4VU7peQRSMs, 67Pylw3Kukc",
  contact: [
    {
      id: "kjrn2sfdfw",
      name: "Mark Bordow",
      phone: "22 555 333 222",
      email: "mark.bordow@musiclabel.com",
      role: "Manager",
    },
    {
      id: "kjrn213jkrnfw",
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
    hero: { path: "/img4.png", createdBy: "", alt: "" },
    logo: null,
    cover: { path: "/cover2.png", createdBy: "", alt: "" },
    promo: [{ path: "/img5.png", createdBy: "Jacob Nielse", alt: "" }],
    background: { path: "/bg.jpeg", createdBy: "Mario Bros", alt: "" },
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
    image: { path: "/img10.png", alt: "", createdBy: "" },
    concerts: [
      {
        id: "2kj3rn",
        location: "Hamburg",
        date: "2023-09-25",
        link: "link",
      },
      {
        id: "2kj3rnqw",
        location: "Berlin",
        date: "2023-09-26",
        link: null,
      },
      {
        id: "asd3fef",
        location: "Dusseldorf",
        date: "2023-09-27",
        link: "link",
      },
    ],
  },
  status: "published",
  displayMode: "dark",
});

const linkToPage = `/${formData.artistSlug}/album/${formData.albumSlug}/${formData.secret}`;

const addContactHandler = () => {
  formData.contact.push({ id: "", name: "", role: "", phone: "", email: "" });
  numberOfContacts.value++;
};

const removeContactHandler = (i: number) => {
  formData.contact.splice(i, 1);
  numberOfContacts.value--;
};

const addTourHandler = () => {
  formData.tour = {
    name: "",
    description: null,
    concerts: null,
    image: null,
    link: null,
  };
};

function deleteSelectedImageHandler(image: IImage) {
  const idx = formData.images.promo!.indexOf(image);
  formData.images.promo?.splice(+idx!, 1);
}

const numberOfContacts = ref(formData.contact.length);
</script>

<template>
  <div class="head">
    <h1>{{ formData.albumName }}</h1>
    <div>
      <BaseButton size="big" styleType="success" msg="Save" type="submit" />
      <BaseButton
        size="big"
        styleType="primary"
        @click="$router.push(linkToPage)"
        msg="Preview"
      />
    </div>
  </div>
  <div class="secret__link__container">
    <div class="secret__link">
      <label class="label">Secret token</label>
      <code>
        {{ formData.secret }}
      </code>
    </div>
    <BaseButton
      styleType="danger"
      size="normal"
      msg="Reset"
      @click="formData.secret = createSecret()"
    />
  </div>
  <article>
    <form @submit.prevent="">
      <div class="form--left">
        <BaseInput
          label="Artist / band"
          inputType="text"
          v-model.trim="formData.artistName"
        ></BaseInput>
        <BaseInput
          label="Album name"
          inputType="text"
          v-model.trim="formData.albumName"
        ></BaseInput>
        <BaseInput
          label="Release date"
          inputType="date"
          v-model="formData.releaseDate"
        ></BaseInput>
        <BaseInput
          label="Music label"
          inputType="text"
          v-model.trim="formData.label"
        ></BaseInput>
        <BaseInput
          label="Genre"
          inputType="text"
          v-model.trim="formData.genre"
        ></BaseInput>
        <BaseTextarea
          label="Description"
          inputType="text"
          v-model.trim="formData.description"
        ></BaseTextarea>
        <BaseInput
          label="Youtube videos"
          inputType="text"
          v-model.trim="formData.youtubeVideos"
        />
        <hr />
        <h1>Player</h1>
        <TabSelect
          label="Select player"
          :list="['Soundcloud', 'Spotify']"
          :active="formData.player"
          @clickItem="(item: PlayerTypes) => (formData.player = item)"
        />
        <BaseInput
          label="Soundcloud playlist"
          inputType="text"
          v-model.trim="formData.playerSoundcloud"
          v-if="formData.player === 'soundcloud'"
        ></BaseInput>
        <BaseInput
          label="Spotify playlist"
          inputType="text"
          v-model.trim="formData.playerSpotify"
          v-if="formData.player === 'spotify'"
        ></BaseInput>
        <hr />
        <h1>Tour information</h1>
        <BaseButton
          styleType="secondary"
          size="normal"
          msg="Add tour info"
          @click="addTourHandler"
          v-if="!formData.tour"
        />

        <div class="form--section" v-if="formData.tour">
          <BaseInput
            label="Tour name"
            inputType="text"
            v-model.trim="formData.tour.name"
          ></BaseInput>
          <BaseTextarea
            label="Tour description"
            inputType="text"
            v-model.trim="formData.tour.description"
          ></BaseTextarea>
          <BaseInput
            label="External link"
            inputType="text"
            v-model.trim="formData.tour.link"
          ></BaseInput>
          <BaseImageUpload
            label="Tour image"
            text="Choose media"
            :image="formData.tour.image"
            @deleteItem="formData.tour.image = null"
            @selectionHandler="(image: IImage) => (formData.tour!.image = image)"
          />
          <BaseButton
            styleType="danger"
            msg="Delete tour"
            size="small"
            @click="formData.tour = null"
          />
        </div>
        <hr />
        <h1>Booking contact</h1>
        <div v-for="i in numberOfContacts" :key="i" class="form--section">
          <BaseInput
            label="Manager name"
            inputType="text"
            v-model.trim="formData.contact[i - 1].name"
          ></BaseInput>
          <BaseInput
            label="Role"
            inputType="text"
            v-model.trim="formData.contact[i - 1].role"
          ></BaseInput>
          <BaseInput
            label="Phone number"
            inputType="tel"
            v-model.trim="formData.contact[i - 1].phone"
          ></BaseInput>
          <BaseInput
            label="E-mail"
            inputType="email"
            v-model.trim="formData.contact[i - 1].email"
          />
          <BaseButton
            styleType="danger"
            msg="Delete contact"
            size="small"
            @click="removeContactHandler(i - 1)"
          />
          <hr />
        </div>
        <BaseButton
          size="normal"
          styleType="secondary"
          msg="Add contact"
          @click="addContactHandler"
        />
        <hr />
        <h1>Artist links</h1>
        <div class="form--section">
          <BaseInput
            label="Spotify"
            inputType="text"
            v-model.trim="formData.links.spotify"
          ></BaseInput>
          <BaseInput
            label="Soundcloud"
            inputType="text"
            v-model.trim="formData.links.soundcloud"
          ></BaseInput>
          <BaseInput
            label="Youtube"
            inputType="text"
            v-model.trim="formData.links.youtube"
          ></BaseInput>
          <BaseInput
            label="Facebook"
            inputType="text"
            v-model.trim="formData.links.facebook"
          ></BaseInput>
          <BaseInput
            label="Instagram"
            inputType="text"
            v-model.trim="formData.links.instagram"
          ></BaseInput>
          <BaseInput
            label="Tiktok"
            inputType="text"
            v-model.trim="formData.links.tiktok"
          ></BaseInput>
          <BaseInput
            label="Twitter"
            inputType="text"
            v-model.trim="formData.links.twitter"
          ></BaseInput>
        </div>
      </div>

      <div class="form--divider"></div>

      <div class="form--right">
        <BaseImageUpload
          label="Hero image"
          text="Choose media"
          :image="formData.images.hero"
          @deleteItem="formData.images.hero = null"
          @selectionHandler="(image: IImage) => (formData.images.hero = image)"
        />
        <hr />
        <BaseImageUpload
          label="Album cover"
          text="Choose media"
          :image="formData.images.cover"
          @deleteItem="formData.images.cover = null"
          @selectionHandler="(image: IImage) => (formData.images.cover = image)"
        />
        <hr />
        <BaseImagesUpload
          label="Promo images"
          text="Choose media"
          :images="formData.images.promo"
          @selectionHandler="(images: IImage[]) => (formData.images.promo = images)"
          @deleteSelectedImage="(image: IImage) => (deleteSelectedImageHandler(image))"
        />
        <hr />
        <BaseFilesUpload
          label="Promo files"
          text="Choose files"
          :files="formData.files"
        />

        <hr />
        <BaseImageUpload
          label="Custom background image"
          text="Choose media"
          :image="formData.images.background"
          @deleteItem="formData.images.background = null"
          @selectionHandler="(image: IImage) => (formData.images.background = image)"
        />
        <hr />
        <TabSelect
          label="Light / Dark mode"
          :list="['Light', 'Dark']"
          :active="formData.displayMode"
          @clickItem="(item: DisplayTypes) => (formData.displayMode = item)"
        />
        <hr />
        <StatusSelector
          :active="formData.status"
          @setStatus="(status: StatusTypes) => formData.status = status"
        />
        <hr />
        <BaseButton size="big" styleType="success" msg="Save" type="submit" />
      </div>
    </form>
  </article>
</template>

<style scoped>
.secret__link__container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  background-color: var(--gray-100);
  padding: 8px;
}
.secret__link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  max-width: 100%;
}

.secret__link code {
  max-width: 100%;
  border: 1px solid var(--white-150);
  background-color: var(--white-900);
  padding: 8px;
}
article {
  width: 100%;
  background-color: var(--gray-100);
  padding: 8px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form--left {
  flex: 0 1 80%;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.form--divider {
  width: 1px;
  border-right: 1px solid var(--gray-300);
  margin: 0 40px;
}
.form--right {
  flex: 1 1 20%;
  min-width: 184px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  margin-top: 40px;
}
.form--section {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

@media screen and (min-width: 740px) {
  article {
    padding: 24px;
  }
  form {
    flex-direction: row;
    width: 100%;
  }
  .form--right {
    margin-top: 0px;
  }
}
</style>
