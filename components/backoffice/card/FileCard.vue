<script setup lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";
import BaseButton from "../UI/BaseButton.vue";
import { IFiles } from "~/types";

const props = defineProps({
  file: { type: Object as PropType<IFiles>, required: true },
  showOptions: { type: Boolean, required: false, default: true },
});
const emits = defineEmits(["removeFile"]);
</script>

<template>
  <div class="file__container">
    <div class="file__name">
      <h4 class="label">File name</h4>
      <h4>{{ props.file.name }}</h4>
    </div>
    <div class="file__size">
      <h4 class="label">Size</h4>
      <h4>{{ getMbFromFile(props.file.size) }} mb</h4>
    </div>
    <div class="file__options" v-if="showOptions">
      <BaseButton
        size="small"
        styleType="danger"
        msg="Delete"
        @click="emits('removeFile', file)"
      />
    </div>
  </div>
</template>

<style scoped>
.file__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
  padding: 8px;
  background-color: var(--gray-100);
  border-radius: var(--br-2);
}

.file__name {
  flex: 1 1 40%;
}

.file__size {
  display: none;
  flex: 0 0 15%;
}

.file__options {
  flex: 1 0 10%;
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
}
.label {
  color: var(--blue-900);
  opacity: 0.6;
}

@media screen and (min-width: 740px) {
  .file__container {
    column-gap: 16px;
    padding: 8px 16px;
  }
  .file__size {
    display: block;
    flex: 0 1 15%;
  }
}
</style>
