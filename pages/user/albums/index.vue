<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import AlbumCard from "~/components/backoffice/card/AlbumCard.vue";
import { useRouter } from "nuxt/app";
import { IAlbumList } from "~/types";
import Notification from "~/components/backoffice/UI/Notification.vue";
definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});
const router = useRouter();

let albums: IAlbumList[];
const isLoading = ref(true);
const user = useSupabaseUser();

if (!user.value) {
  navigateTo("/auth/login");
} else {
  try {
    const { data, pending } = await useFetch<{ data: IAlbumList[] }>(
      `/api/albums/${user.value.id}`
    );
    if (data.value) {
      albums = data.value.data;
      isLoading.value = pending.value;
    }
  } catch (error) {
    throw new Error();
  }
}
const albumMaxCount = maxAlbumCount(user.value?.user_metadata.plan);
</script>

<template>
  <div class="head">
    <h1>Albums</h1>
    <BaseButton
      v-if="albums.length < albumMaxCount"
      size="big"
      styleType="primary"
      msg="Add new album"
      @click="router.push({ path: 'albums/new-album' })"
    />
  </div>
  <LoadingScreen v-if="isLoading" />
  <article v-else-if="albums.length > 0">
    <AlbumCard v-for="album in albums" :key="album.id" :album="album" />
  </article>
  <p v-else>No data</p>
</template>

<style scoped>
article {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
