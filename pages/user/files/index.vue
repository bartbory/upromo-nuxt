<script setup lang="ts">
import FileCard from "~/components/backoffice/card/FileCard.vue";
import FileUpload from "~/components/backoffice/UI/FileUpload.vue";
import StorageCapacity from "~/components/backoffice/UI/StorageCapacity.vue";
import { IFiles } from "~/types";

definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});

const supabase = useSupabaseUser();
const bucket = useSupabaseClient();
const user = supabase.value;

const userFiles = ref<IFiles[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const totalSize = ref(0);
const storageCapacity = ref(0);

// Max storage capacity declaration
const maxStorageCapacity = maxFilesStorageCapacity(user?.user_metadata.plan);

// Fetch data from bucket on mount
const { data, pending, error } = await useFetch<{ data: IFiles[] }>(
  `/api/files/${user?.id}`
);
if (data.value) {
  isLoading.value = pending.value;
  userFiles.value = data.value ? data.value.data : [];
  updateStorageCapacity();
}

// Fetch data after send new file
async function fetchData() {
  isError.value = false;
  isLoading.value = true;
  const { data, pending } = await useFetch<{ data: IFiles[] }>(
    `/api/files/${user?.id}`
  );
  isLoading.value = pending.value;
  userFiles.value = data.value ? data.value.data : [];
}

// Remove file from database and bucket
async function removeFile(file: IFiles) {
  if (user) {
    const { data, error } = await bucket.storage
      .from(`public`)
      .remove([`${user.id}/files/${file.name}`]);
  }
  if (data.value) {
    const { error } = await useFetch(`/api/files/delete/${user?.id}`, {
      body: file,
      method: "delete",
    });
    if (!error.value) {
      await fetchData();
      isLoading.value = false;
    }
  }
}

// Update storage capacity
function updateStorageCapacity() {
  totalSize.value = 0;
  for (let i = 0; i < userFiles.value.length; i++) {
    totalSize.value += userFiles.value[i].size;
  }
  storageCapacity.value =
    (getMbFromFile(totalSize.value) * 100) / maxStorageCapacity;
}

// Update storage after upload
watchEffect(() => updateStorageCapacity());
</script>

<template>
  <div class="head">
    <h1>Files</h1>
  </div>
  <LoadingScreen v-if="isLoading" />
  <StorageCapacity :storage-capacity="storageCapacity" />
  <FileUpload
    v-if="user && !isLoading && storageCapacity <= 100"
    :maxSize="50"
    accept="ai,psd,pdf,doc,docx,zip,rar,7z"
    :uid="user.id"
    type="files"
    @fetchData="fetchData"
  />
  <article v-if="!isLoading">
    <FileCard
      v-for="file in userFiles"
      :key="file.id"
      :file="file"
      @removeFile="(file) => removeFile(file)"
    />
  </article>
</template>

<style scoped>
article {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
