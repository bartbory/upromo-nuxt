<script setup lang="ts">
import { PropType } from "vue";
import BaseButton from "../UI/BaseButton.vue";
import { IImage } from "../../../types";
import ImageCard from "../card/ImageCard.vue";

const imagesData: IImage[] = [
  { path: "/img5.png", createdBy: "Jacob Nielse", alt: "" },
  { path: "/img6.png", createdBy: "Mark Twain", alt: "" },
  { path: "/img7.png", createdBy: "Tony Hawk", alt: "" },
  { path: "/img8.png", createdBy: "Rob Bob", alt: "" },
  { path: "/img9.png", createdBy: "Salma Hayek", alt: "" },
  { path: "/img1.png", createdBy: "Ed Sheeran", alt: "" },
  { path: "/img2.png", createdBy: "Mario Bros", alt: "" },
  { path: "/img3.png", createdBy: "Mario Bros", alt: "" },
  { path: "/img4.png", createdBy: "Mario Bros", alt: "" },
  { path: "/bg.jpeg", createdBy: "Mario Bros", alt: "" },
];

const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, required: true },
  selected: {
    type: Array as PropType<IImage[] | null>,
    required: false,
    default: null,
  },
});

const emits = defineEmits(["selectionHandler", "save"]);

function isActive(path: string) {
  if (props.selected && props.selected.find((i) => i.path === path)) {
    console.log(path);
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

        <div class="modal-body">
          <ImageCard
            v-for="image in imagesData"
            :key="image.path"
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

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 700px;
  max-width: 80%;
  margin: auto;
  padding: 24px;
  background-color: var(--white-900);
  border-radius: var(--br-8);
  box-shadow: var(--shadow-sc);
  transition: all 0.3s ease;
}

.modal-header h3 {
  color: var(--gray-900);
}

.modal-body {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 500px;
  overflow-y: scroll;
  margin: 24px 0;
}
button {
  float: right;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
