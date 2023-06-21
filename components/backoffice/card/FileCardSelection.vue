<script setup lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";
import BaseButton from "../UI/BaseButton.vue";
import { IFiles } from "~/types";

const props = defineProps({
  file: { type: Object as PropType<IFiles>, required: true },
  isActive: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <div class="file__container" :class="{ active: isActive }">
    <div class="file__name">
      <h4>{{ props.file.name }}</h4>
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

.file__container:hover {
  background: var(--purple-400);
}

.active {
  background-color: var(--purple-900);
  color: var(--white-900);
}
</style>
