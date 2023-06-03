<script setup lang="ts">
defineProps(["modelValue", "label", "inputType", "isReq"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form__row">
    <label>{{ label }} {{ isReq ? "*" : "" }}</label>
    <textarea
      :value="modelValue"
      :type="inputType"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
      rows="12"
    ></textarea>
  </div>
</template>

<style scoped>
textarea {
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
</style>
