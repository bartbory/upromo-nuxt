<script setup lang="ts">
import { InputHTMLAttributes } from "nuxt/dist/app/compat/capi";

defineProps([
  "modelValue",
  "label",
  "inputType",
  "date",
  "isReq",
  "description",
]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form__row">
    <label
      >{{ `${label} ${isReq ? "*" : ""}` }}
      <p v-if="description" class="tooltip__indicator">?</p>
      <p v-if="description" class="description">
        {{ description }}
      </p></label
    >
    <input
      :value="modelValue"
      :type="inputType"
      :required="isReq"
      @change="
        $emit('update:modelValue', ($event.target as InputHTMLAttributes).value)
      "
    />
  </div>
</template>

<style scoped>
input {
  background-color: var(--white-900);
  border: 1px solid var(--gray-300);
  color: var(--gray-900);
  min-height: 40px;
  padding: 8px 16px;
  min-width: 100%;
  border-radius: var(--br-4);
  font-family: "Lato";
}
.form__row {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
}

label {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}
.description {
  position: absolute;
  left: 100px;
  top: -50%;
  min-width: 300px;
  width: 75%;
  padding: 8px;
  color: var(--gray-100);
  font-size: 14px;
  background-color: var(--gray-900);
  border-radius: var(--br-4);
  border: 1px solid var(--white-150);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}
label:hover > .description {
  opacity: 1;
}

.tooltip__indicator {
  width: 16px;
  height: 16px;
  background-color: var(--blue-900);
  color: var(--white-900);
  font-size: 12px;
  text-align: center;
  border-radius: var(--br-16);
}
</style>
