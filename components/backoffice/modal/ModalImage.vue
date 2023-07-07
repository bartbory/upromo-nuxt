<script setup lang="ts">
import { PropType } from "vue";
import BaseButton from "../UI/BaseButton.vue";
import { IImage } from "../../../types";
import ImageCard from "../card/ImageCard.vue";
import FileUpload from "../UI/FileUpload.vue";
import StorageCapacity from "../UI/StorageCapacity.vue";

const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, required: true },
  imageSelected: {
    type: String as PropType<string | null>,
    required: false,
    default: null,
  },
  images: {
    type: Array as PropType<IImage[]>,
    required: true,
  },
});

const emits = defineEmits(["selectionHandler", "close"]);

const supabase = useSupabaseUser();
const user = supabase.value;

const userMedia = ref<IImage[]>([]);
const isLoading = ref(true);
const isError = ref(false);
const storageCapacity = ref(0);

// Max storage capacity declaration
const maxStorageCapacity = maxImagesStorageCapacity(user?.user_metadata.plan);

// Fetch data from bucket on mount
onMounted(async () => {
  // const { data, pending, error } = await useFetch<{ data: IImage[] }>(
  //   `/api/images/${user?.id}`
  // );
  // if (data.value) {
  //   isLoading.value = pending.value;
  //   userMedia.value = data.value ? data.value.data : [];
  //   updateStorageCapacity();
  // }
  await fetchData();
});

// Fetch data after send new file
async function fetchData() {
  isError.value = false;
  isLoading.value = true;
  const { data, pending } = await useFetch<{ data: IImage[] }>(
    `/api/images/${user?.id}`
  );
  isLoading.value = pending.value;
  userMedia.value = data.value ? data.value.data : [];
  updateStorageCapacity();
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

function isActive(path: string) {
  if (props.imageSelected && props.imageSelected === path) {
    return true;
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h1>{{ props.title }}</h1>
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
        <div class="modal-body">
          <ImageCard
            v-if="!isLoading"
            v-for="image in userMedia"
            :key="image.id"
            :imagePath="image.path"
            :isActive="isActive(image.path)"
            @click="emits('selectionHandler', image)"
          />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <BaseButton
              msg="Close"
              styleType="neutral"
              size="normal"
              @click="$emit('close')"
            />
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
