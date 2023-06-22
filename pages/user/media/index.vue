<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import ImageCard from "~/components/backoffice/card/ImageCard.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import FileUpload from "~/components/backoffice/UI/FileUpload.vue";
import { IImage } from "~/types";
import StorageCapacity from "~/components/backoffice/UI/StorageCapacity.vue";

definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});

const selectedImage = ref<IImage | null>(null);

const supabase = useSupabaseUser();
const bucket = useSupabaseClient();
const user = supabase.value;

const userMedia = ref<IImage[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const storageCapacity = ref(0);

// Max storage capacity declaration
const maxStorageCapacity = maxImagesStorageCapacity(user?.user_metadata.plan);

// Fetch data from bucket on mount
const { data, pending, error } = await useFetch<{ data: IImage[] }>(
  `/api/images/${user?.id}`
);
if (data.value) {
  isLoading.value = pending.value;
  userMedia.value = data.value ? data.value.data : [];
  updateStorageCapacity();
}

// Fetch data after send new file
async function fetchData() {
  isError.value = false;
  isLoading.value = true;
  const { data, pending } = await useFetch<{ data: IImage[] }>(
    `/api/images/${user?.id}`
  );
  isLoading.value = pending.value;
  userMedia.value = data.value ? data.value.data : [];
}

// Update image data
async function updateImageData() {
  isLoading.value = true;
  const { error } = await useFetch(
    `/api/images/update/${imageDetails.value?.id}`,
    {
      body: imageDetails.value,
      method: "put",
    }
  );
  if (!error.value) {
    await fetchData();
    isLoading.value = false;
  }
}

// Remove file from database and bucket
async function removeFile(file: IImage) {
  if (user) {
    const { data, error } = await bucket.storage
      .from(`public`)
      .remove([`${user.id}/images/${file.name}`]);
  }
  if (data.value) {
    const { error } = await useFetch(`/api/images/delete/${user?.id}`, {
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
  let totalSize = 0;
  for (let i = 0; i < userMedia.value.length; i++) {
    totalSize += userMedia.value[i].size;
  }
  storageCapacity.value = (getMbFromFile(totalSize) * 100) / maxStorageCapacity;
}

// Update storage after upload
watchEffect(() => updateStorageCapacity());
const imageDetails = computed(() => {
  if (userMedia.value.find((image) => image.path === selectedImage.value?.path))
    return userMedia.value.find(
      (image) => image.path === selectedImage.value?.path
    );
  else {
    return null;
  }
});
</script>

<template>
  <div class="head">
    <h1>Media</h1>
  </div>
  <StorageCapacity :storage-capacity="storageCapacity" />
  <FileUpload
    v-if="user && storageCapacity <= 100"
    :maxSize="3"
    accept="png,jpg,jpeg"
    :uid="user.id"
    type="images"
    @fetchData="fetchData"
  />
  <section>
    <article>
      <ImageCard
        v-for="image in userMedia"
        :imagePath="image.path"
        :key="image.path"
        :isActive="selectedImage === image"
        @click="selectedImage = image"
      />
    </article>
    <form
      v-if="imageDetails && selectedImage && !isLoading"
      @submit.prevent="updateImageData"
    >
      <BaseButton
        class="close"
        size="small"
        styleType="neutral"
        msg="Close"
        type="button"
        @click="selectedImage = null"
      />
      <img :src="imageDetails.path" />
      <BaseInput
        label="Artist / photographer"
        type="text"
        v-model="imageDetails.author"
      />
      <BaseInput
        label="Alternative text"
        type="text"
        v-model="imageDetails.description"
      />
      <div class="actions">
        <BaseButton
          msg="Save"
          size="normal"
          styleType="success"
          type="submit"
        /><BaseButton
          msg="Delete"
          size="normal"
          styleType="danger"
          type="button"
          @click="removeFile(selectedImage)"
        />
      </div>
    </form>
  </section>
</template>

<style scoped>
section {
  flex-direction: row;
}
article {
  flex: 1 1 50%;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

form {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 50%;
  padding: 24px;
  background-color: var(--gray-100);
  border-radius: var(--br-8);
}

.close {
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
}

form img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.range {
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: var(--gray-100);
  overflow: hidden;
}
.range__used {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 8px;
  background-color: var(--blue-900);
}
.warning {
  color: var(--red-900);
}
</style>
