<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  IAlbum,
  PlayerTypes,
  DisplayTypes,
  IImage,
  IFiles,
  IPerson,
} from "~/types";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import BaseTextarea from "~/components/backoffice/form/BaseTextarea.vue";
import BaseImageUpload from "~/components/backoffice/form/BaseImageUpload.vue";
import BaseImagesUpload from "~/components/backoffice/form/BaseImagesUpload.vue";
import BaseFilesUpload from "~/components/backoffice/form/BaseFilesUpload.vue";
import TabSelect from "~/components/backoffice/UI/TabSelect.vue";
import ContactCardSelection from "~/components/backoffice/card/ContactCardSelection.vue";
import ModalContact from "~/components/backoffice/modal/ModalContact.vue";

definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});

const userMedia = ref<IImage[]>([]);
const userFiles = ref<IFiles[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const userContacts = ref<IPerson[]>([]);
const showContactAddModal = ref(false);

const supabase = useSupabaseUser();
const user = supabase.value?.id;

const title = ref(`RELEASLAND - Create new album`);

useHead({
  title,
  meta: [
    { name: "author", content: "Bartosz Borycki" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
});

if (user) {
  isError.value = false;
  isLoading.value = true;
  const imagesData = await $fetch<{ data: IImage[] }>(`/api/images/${user}`);
  const filesData = await $fetch<{ data: IFiles[] }>(`/api/files/${user}`);
  const contactsData = await $fetch<{ data: IPerson[] }>(
    `/api/contacts/${user}`
  );
  userMedia.value = imagesData ? imagesData.data : [];
  userFiles.value = filesData ? filesData.data : [];
  userContacts.value = contactsData ? contactsData.data : [];
  isLoading.value = false;
}

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
  player: "SPOTIFY",
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
    hero: "",
    cover: "",
    promo: [],
    logo: null,
    background: null,
  },
  files: [],
  tour: null,
  displayMode: "LIGHT",
});

async function fetchContactData() {
  isLoading.value = true;
  const contactsData = await $fetch<{ data: IPerson[] }>(
    `/api/contacts/${user}`
  );
  if (contactsData) {
    userContacts.value = contactsData.data;
    isLoading.value = false;
  }
}

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
  const idx = formData.images.promo.indexOf(image);
  formData.images.promo?.splice(+idx!, 1);
}

function deleteSelectedFileHandler(file: IFiles) {
  const idx = formData.files.indexOf(file);
  formData.files.splice(+idx!, 1);
}

async function submitFormHandler() {
  isError.value = false;
  isLoading.value = true;
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
    isLoading.value = false;
    return;
  }

  const dataToSend = { ...formData, uid: user };
  const { data, pending } = await useFetch("/api/albums/create", {
    method: "POST",
    body: { ...dataToSend },
  });
  if (data.value) {
    navigateTo("/user/albums");
  } else {
    isError.value = true;
  }
  isLoading.value = pending.value;
}

function contactClickHandler(contact: IPerson) {
  if (formData.contact.indexOf(contact) >= 0) {
    const contactArray = formData.contact.filter((c) => c.id !== contact.id);
    formData.contact = contactArray;
  } else {
    formData.contact.push(contact);
  }
}

function isActive(id: string) {
  if (userContacts.value && formData.contact.find((i) => i.id === id)) {
    return true;
  }
}
</script>

<template>
  <Teleport to="body">
    <ModalContact
      :show="showContactAddModal"
      @close="showContactAddModal = false"
      title="Add new contact"
      @refetch="fetchContactData"
    >
    </ModalContact>
  </Teleport>
  <div class="head">
    <h1>Add new album</h1>
    <BaseButton
      size="big"
      styleType="success"
      msg="Save"
      @click.prevent="submitFormHandler"
    />
  </div>
  <LoadingScreen v-if="isLoading" />
  <article v-if="!isLoading">
    <form @submit.prevent="submitFormHandler">
      <div class="form--left">
        <BaseInput
          label="Artist / band"
          inputType="text"
          v-model.trim="formData.artistName"
          :isReq="true"
        ></BaseInput>
        <BaseInput
          label="Album name"
          inputType="text"
          v-model.trim="formData.albumName"
          :isReq="true"
        ></BaseInput>
        <BaseInput
          label="Release date"
          inputType="date"
          v-model="formData.releaseDate"
          :isReq="true"
        ></BaseInput>
        <BaseInput
          label="Music label"
          inputType="text"
          v-model.trim="formData.label"
          :isReq="true"
        ></BaseInput>
        <BaseInput
          label="Genre"
          inputType="text"
          v-model.trim="formData.genre"
          :isReq="true"
        ></BaseInput>
        <BaseTextarea
          label="Description"
          inputType="html"
          v-model.trim="formData.description"
          :isReq="true"
          description="You can use html tags in description like <b> <h1> <h2> <i>"
        ></BaseTextarea>
        <BaseInput
          label="Youtube videos"
          inputType="text"
          description="Coma separated youtube videos ID (ex. https://www.youtube.com/watch?v={videoID})"
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
          description="Select playlist/album from soundcloud then click 'share', select 'Embed' tab and paste code here"
          v-if="formData.player === 'SOUNDCLOUD'"
        ></BaseInput>
        <BaseInput
          label="Spotify playlist"
          inputType="text"
          v-model.trim="formData.playerSpotify"
          description="Paste spotify link to album/artist/playlist"
          v-if="formData.player === 'SPOTIFY'"
        ></BaseInput>
        <hr />
        <h1>Tour information</h1>
        <BaseButton
          styleType="secondary"
          size="normal"
          msg="Add tour info"
          type="button"
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
            inputType="html"
            v-model.trim="formData.tour.description"
            description="You can use html tags in description like <b> <h1> <h2> <i>"
          ></BaseTextarea>
          <BaseInput
            label="External link"
            inputType="text"
            v-model.trim="formData.tour.link"
          ></BaseInput>
          <BaseImageUpload
            label="Tour image"
            text="Choose media"
            :imageSelected="formData.tour.image ? formData.tour.image : ''"
            :images="userMedia"
            @deleteItem="formData.tour.image = null"
            @selectionHandler="(image: IImage) => (formData.tour!.image = image.path)"
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
        <div v-if="userContacts && !isLoading" class="contacts__list">
          <ContactCardSelection
            v-for="contact in userContacts"
            :key="contact.id"
            :contact="contact"
            :isActive="isActive(contact.id)"
            @click="contactClickHandler(contact)"
          />
        </div>
        <BaseButton
          size="normal"
          styleType="secondary"
          msg="Add contact"
          type="button"
          @click="showContactAddModal = true"
        />
        <hr />
        <h1>Artist links</h1>
        <div class="form--section">
          <BaseInput
            label="Spotify"
            inputType="text"
            v-model.trim="formData.links.spotify"
            description="Just give us your spotify ID"
          ></BaseInput>
          <BaseInput
            label="Soundcloud"
            inputType="text"
            v-model.trim="formData.links.soundcloud"
            description="Just give us your soundcloud ID"
          ></BaseInput>
          <BaseInput
            label="Youtube"
            inputType="text"
            v-model.trim="formData.links.youtube"
            description="Just give us your youtube ID"
          ></BaseInput>
          <BaseInput
            label="Facebook"
            inputType="text"
            v-model.trim="formData.links.facebook"
            description="Just give us your facebook fanpage name"
          ></BaseInput>
          <BaseInput
            label="Instagram"
            inputType="text"
            v-model.trim="formData.links.instagram"
            description="Just give us your instagram name"
          ></BaseInput>
          <BaseInput
            label="Tiktok"
            inputType="text"
            v-model.trim="formData.links.tiktok"
            description="Just give us your tiktok name"
          ></BaseInput>
          <BaseInput
            label="Twitter"
            inputType="text"
            v-model.trim="formData.links.twitter"
            description="Just give us your twitter name"
          ></BaseInput>
        </div>
      </div>

      <div class="form--divider"></div>

      <div class="form--right">
        <BaseImageUpload
          type="button"
          label="Hero image"
          text="Choose media"
          :imageSelected="formData.images.hero"
          :images="userMedia"
          @deleteItem="formData.images.hero = ''"
          @selectionHandler="(image: IImage) => (formData.images.hero = image.path)"
        />
        <hr />
        <BaseImageUpload
          label="Album cover"
          text="Choose media"
          :imageSelected="formData.images.cover"
          :images="userMedia"
          @deleteItem="formData.images.cover = ''"
          @selectionHandler="(image: IImage) => (formData.images.cover = image.path)"
        />
        <hr />
        <BaseImagesUpload
          label="Promo images"
          text="Choose media"
          :imagesSelected="formData.images.promo"
          :images="userMedia"
          @selectionHandler="(images: IImage[]) => (formData.images.promo = images)"
          @deleteSelectedImage="(image: IImage) => (deleteSelectedImageHandler(image))"
        />
        <hr />
        <BaseFilesUpload
          label="Promo files"
          text="Choose files"
          :files="userFiles"
          :filesSelected="formData.files"
          @selectionHandler="(files: IFiles[]) => (formData.files = files)"
          @deleteSelectedFile="(file: IFiles) => (deleteSelectedFileHandler(file))"
        />
        <hr />
        <BaseImageUpload
          label="Custom background image"
          text="Choose media"
          :imageSelected="
            formData.images.background ? formData.images.background : ''
          "
          :images="userMedia"
          @deleteItem="formData.images.background = null"
          @selectionHandler="(image: IImage) => (formData.images.background = image.path)"
        />
        <hr />
        <TabSelect
          label="Light / Dark mode"
          :list="['Light', 'Dark']"
          :active="formData.displayMode"
          @clickItem="(item: DisplayTypes) => (formData.displayMode = item)"
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

.contacts__list {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  max-height: 300px;
  overflow-y: scroll;
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
