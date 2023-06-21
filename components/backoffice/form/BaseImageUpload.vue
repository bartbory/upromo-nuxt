<script setup lang="ts">
import BaseButton from "../UI/BaseButton.vue";
import { IImage } from "../../../types";
import { PropType, ref } from "vue";
import ModalImage from "../modal/ModalImage.vue";

const props = defineProps({
  label: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String as PropType<"button" | "submit">, default: "button" },
  imageSelected: { type: String, required: true },
  images: { type: Array as PropType<IImage[]>, required: true },
  isReq: { type: Boolean, required: false, default: false },
});

const emits = defineEmits(["deleteItem", "changeItem", "selectionHandler"]);
const showModal = ref(false);
</script>

<template>
  <Teleport to="body">
    <modal-image
      :show="showModal"
      @close="showModal = false"
      title="Select image"
      :imageSelected="props.imageSelected ? props.imageSelected : null"
      :images="props.images"
      @selectionHandler="(image: IImage) => emits('selectionHandler', image)"
    >
    </modal-image>
  </Teleport>

  <div class="form__row">
    <label>{{ props.label }} {{ isReq ? "*" : "" }}</label>
    <BaseButton
      size="big"
      styleType="primary"
      type="button"
      :msg="props.text"
      v-if="!props.imageSelected"
      @click="showModal = true"
    />
    <div class="image__container" v-else>
      <img :src="props.imageSelected" />
      <div class="on__hover">
        <BaseButton
          msg="Change"
          size="small"
          styleType="primary"
          @click="showModal = true"
        />
        <BaseButton
          msg="Delete"
          size="small"
          styleType="danger"
          @click="emits('deleteItem')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.form__row {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
}

.image__container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--gray-300);
  padding: 4px;
  border-radius: var(--br-4);
  max-height: 500px;
  object-fit: cover;
}

img {
  max-width: 100%;
  max-height: 100%;
}

.on__hover {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: 0.5s;
}

.image__container:hover > .on__hover {
  opacity: 1;
}
</style>
