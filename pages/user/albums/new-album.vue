<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  IAlbum,
  StatusTypes,
  PlayerTypes,
  DisplayTypes,
  IImage,
} from "~/types";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import BaseTextarea from "~/components/backoffice/form/BaseTextarea.vue";
import StatusSelector from "~/components/backoffice/UI/StatusSelector.vue";
import BaseImageUpload from "~/components/backoffice/form/BaseImageUpload.vue";
import BaseImagesUpload from "~/components/backoffice/form/BaseImagesUpload.vue";
import BaseFilesUpload from "~/components/backoffice/form/BaseFilesUpload.vue";
import TabSelect from "~/components/backoffice/UI/TabSelect.vue";
import createSecret from "~/helpers/createSecret";
// import createAlbum from "~/api/createAlbum";

definePageMeta({
  layout: "backoffice-layout",
});

const formData: IAlbum = reactive({
  id: "",
  secret: "",
  artistName: "",
  albumName: "",
  albumSlug: "",
  artistSlug: "",
  releaseDate: "",
  label: "",
  genre: "",
  description: "",
  player: "soundcloud",
  playerSoundcloud: "",
  playerSpotify: "",
  youtubeVideos: "",
  contact: [],
  links: {
    facebook: null,
    twitter: null,
    spotify: null,
    tiktok: null,
    instagram: null,
    soundcloud: null,
    youtube: null,
  },
  images: {
    hero: null,
    cover: null,
    promo: [],
    logo: null,
    background: null,
  },
  files: [],
  tour: null,
  status: "unpublished",
  displayMode: "light",
});

const addContactHandler = () => {
  formData.contact.push({
    id: createSecret(),
    name: "",
    role: "",
    phone: "",
    email: "",
  });
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
    image: null,
    concerts: null,
    link: null,
  };
};

function deleteSelectedImageHandler(image: IImage) {
  const idx = formData.images.promo!.indexOf(image);
  formData.images.promo?.splice(+idx!, 1);
}

async function submitFormHandler() {
  isError.value = false;
  if (
    !formData.albumName ||
    !formData.artistName ||
    !formData.description ||
    !formData.genre ||
    !formData.label ||
    !formData.releaseDate ||
    !formData.images.cover ||
    !formData.images.hero
  ) {
    isError.value = true;
    console.log("brak wypelnionych pól");
    return;
  }
  const uid = localStorage.getItem("uid");
  if (uid) {
    console.log("wysyłam: ", uid, formData);
    // await createAlbum(formData, uid!);
  }
}
const isError = ref(false);
const numberOfContacts = ref(0);
</script>

<template>
  <div class="head">
    <h1>Add new album</h1>
    <BaseButton
      size="big"
      styleType="success"
      msg="Save"
      @click="submitFormHandler"
    />
  </div>
  <article>
    <form @submit="submitFormHandler">
      <div class="form--left">
        <BaseInput
          label="Artist / band"
          inputType="text"
          :isReq="true"
          v-model.trim="formData.artistName"
        ></BaseInput>
        <BaseInput
          label="Album name"
          inputType="text"
          :isReq="true"
          v-model.trim="formData.albumName"
        ></BaseInput>
        <BaseInput
          label="Release date"
          inputType="date"
          :isReq="true"
          v-model="formData.releaseDate"
        ></BaseInput>
        <BaseInput
          label="Music label"
          inputType="text"
          :isReq="true"
          v-model.trim="formData.label"
        ></BaseInput>
        <BaseInput
          label="Genre"
          inputType="text"
          :isReq="true"
          v-model.trim="formData.genre"
        ></BaseInput>
        <BaseTextarea
          label="Description"
          inputType="text"
          :isReq="true"
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
          :isReq="true"
          @deleteItem="formData.images.hero = null"
          @selectionHandler="(image: IImage) => (formData.images.hero = image)"
        />
        <hr />
        <BaseImageUpload
          label="Album cover"
          text="Choose media"
          :image="formData.images.cover"
          :isReq="true"
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
