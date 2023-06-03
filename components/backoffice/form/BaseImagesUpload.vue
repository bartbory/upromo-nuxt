<script setup lang="ts">
import { PropType, ref } from "vue";
import ModalImages from "../modal/ModalImages.vue";
import BaseButton from "../UI/BaseButton.vue";
import { IImage } from "../../../types";

const props = defineProps({
  label: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: Array as PropType<IImage[]>, required: true },
});

const emits = defineEmits(["selectionHandler", "deleteSelectedImage"]);

const imagesArray = ref(props.images);

function selectionHandler(image: IImage) {
  if (imagesArray.value.find((i) => i.path === image.path)) {
    const idx = imagesArray.value.indexOf(image);
    imagesArray.value.splice(idx, 1);
  } else {
    imagesArray.value.push(image);
  }
}

const showModal = ref(false);
</script>

<template>
  <Teleport to="body">
    <modal-images
      :show="showModal"
      @close="showModal = false"
      title="Select images"
      :selected="props.images"
      @selectionHandler="(image: IImage) => selectionHandler(image)"
      @save="emits('selectionHandler', imagesArray)"
    >
    </modal-images>
  </Teleport>
  <div class="form__row">
    <label>{{ label }}</label>
    <div class="images__container" v-if="props.images.length > 0">
      <div class="images" v-for="image in props.images" :key="image.path">
        <img :src="image.path" />
        <div class="on__hover">
          <BaseButton
            size="small"
            styleType="danger"
            msg="Delete"
            @click="emits('deleteSelectedImage', image)"
          />
        </div>
      </div>
    </div>
    <BaseButton
      styleType="primary"
      size="big"
      msg="Add media"
      @click="showModal = true"
    />
  </div>
</template>

<style scoped>
.form__row {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
}

.images__container {
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--gray-300);
  border-radius: var(--br-4);
  padding: 4px;
}

.images {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 30%;
  overflow: hidden;
}

.on__hover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.images:hover > .on__hover {
  opacity: 1;
}

.add {
  flex: 1 0 30%;
  height: 40px;
  background-color: var(--gray-100);
  color: var(--gray-900);
}

img {
  width: 100%;
}

button {
  border: none;
  font-size: 16px;
  font-family: "Lato";
}
</style>
