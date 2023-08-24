<script setup lang="ts">
import BaseCard from "~/components/backoffice/UI/BaseCard.vue";
import { IAlbumList } from "~/types";

definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});

const supabase = useSupabaseUser();
const bucket = useSupabaseClient();
const user = supabase.value;

let albumCount = ref(0);
let filesStorageCapacity = ref(0);
let imagesStorageCapacity = ref(0);

const filesMaxStorageCapacity = maxFilesStorageCapacity(
  user?.user_metadata.plan
);
const imagesMaxStorageCapacity = maxImagesStorageCapacity(
  user?.user_metadata.plan
);
const albumMaxCount = maxAlbumCount(user?.user_metadata.plan);

async function getFilesStorageCapacity() {
  const { data, error } = await bucket.storage
    .from("public")
    .list(`${supabase.value?.id}/files`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  if (data) {
    for (let i = 0; i < data.length; i++) {
      filesStorageCapacity.value += data[i].metadata.size;
    }
    // storageCapacity.value =
    //   (getMbFromFile(totalSize.value) * 100) / maxStorageCapacity;
    // }
  }
}

async function getImagesStorageCapacity() {
  const { data, error } = await bucket.storage
    .from("public")
    .list(`${supabase.value?.id}/images`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (data) {
    for (let i = 0; i < data.length; i++) {
      imagesStorageCapacity.value += data[i].metadata.size;
    }
  }
}
async function getAlbumsCount() {
  const { data } = await useFetch<{ data: IAlbumList[] }>(
    `api/albums/${supabase.value?.id}`
  );
  albumCount.value = data.value ? data.value?.data.length : 0;
}

await getFilesStorageCapacity();
await getImagesStorageCapacity();
await getAlbumsCount();
</script>

<template>
  <div class="head">
    <h1>Dashboard</h1>
  </div>
  <section class="capacity__container">
    <BaseCard
      title="Albums"
      :value="albumCount.toString()"
      :max-value="albumMaxCount.toString()"
    />
    <BaseCard
      title="Images"
      :value="getMbFromFile(imagesStorageCapacity).toString()"
      :max-value="imagesMaxStorageCapacity + ' mb'"
    />
    <BaseCard
      title="Files"
      :value="getMbFromFile(filesStorageCapacity).toString()"
      :max-value="filesMaxStorageCapacity + ' mb'"
    />
    <BaseCard title="Plan" :value="user?.user_metadata.plan" :max-value="''" />
  </section>
</template>

<style scoped>
.capacity__container {
  display: flex;
  flex-direction: row;
  gap: 24px;
}
</style>
