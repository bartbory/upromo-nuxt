<script setup lang="ts">
import { PropType } from "vue";
import BaseButton from "../UI/BaseButton.vue";
import { IImage } from "../../../types";

const props = defineProps({
  show: { type: Boolean, required: true },
  image: {
    type: Object as PropType<IImage>,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const isLoading = ref(true);
</script>

<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <BaseButton
        msg="Zamknij"
        styleType="neutral"
        size="normal"
        @click="emits('close')"
      />

      <img
        class="modal-body"
        :src="image.path"
        :alt="image.description ? image.description : ''"
      />

      <div class="modal-footer" v-if="image.author || image.description">
        <p v-if="image.author">{{ image.author }}</p>
        <p v-if="image.description">{{ image.description }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-mask:deep(button) {
  position: absolute;
  right: 24px;
  top: 24px;
}

.modal-body {
  min-height: 80vh;
  max-height: 90vh;
  min-width: 80%;
  max-width: 90%;
  margin: auto;
  transition: all 0.3s ease;
}

img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
.modal-footer {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--white-150);
  padding: 4px 16px;
  border-radius: var(--br-4);
  font-size: 10px;
}
</style>
