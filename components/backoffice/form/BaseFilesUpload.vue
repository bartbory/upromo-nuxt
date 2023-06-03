<script setup lang="ts">
import { PropType } from "vue";
import BaseButton from "../UI/BaseButton.vue";
import { IFiles } from "../../../types";

const props = defineProps({
  label: { type: String, required: true },
  text: { type: String, required: true },
  files: {
    type: Array as PropType<IFiles[]>,
    required: true,
  },
});
</script>

<template>
  <div class="form__row">
    <label>{{ label }}</label>
    <BaseButton
      size="big"
      styleType="primary"
      :msg="props.text"
      v-if="!props.files"
    />
    <div class="files__container" v-else>
      <div class="file" v-for="file in props.files" :key="file.name">
        <p>{{ file.name }}</p>
        <p>{{ file.type }}</p>
      </div>
      <button class="file add">Add</button>
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

.files__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  width: 100%;
  background-color: var(--gray-300);
  border-radius: var(--br-4);
  padding: 4px;
}

.file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: var(--br-4);
  padding: 8px;
  background-color: var(--white-900);
}

.add {
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
