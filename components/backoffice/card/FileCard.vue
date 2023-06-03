<script setup lang="ts">
import BaseButton from "../UI/BaseButton.vue";

const props = defineProps({
  fileName: { type: String, required: true },
  date: { type: String, required: true },
});
</script>

<template>
  <div class="file__container">
    <div class="file__cover">ICO</div>
    <div class="file__name">
      <h4>{{ props.fileName }}</h4>
    </div>
    <div class="file__uploaded">
      <h4 class="label">Uploaded</h4>
      <h4>{{ props.date }}</h4>
    </div>
    <div class="file__options">
      <BaseButton size="small" styleType="primary" msg="Rename" />
      <BaseButton size="small" styleType="danger" msg="Delete" />
    </div>
  </div>
</template>

<style scoped>
.file__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
  min-height: 62px;
  padding: 8px;
  background-color: var(--gray-100);
  border-radius: var(--br-2);
}
.file__cover {
  width: 24px;
  height: 24px;
}

.file__name {
  flex: 1 1 40%;
}

.file__uploaded {
  display: none;
  flex: 0 0 15%;
}
.file__status {
  flex: 0 1 15%;
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 16px;
    height: 96px;
    padding: 8px;
    background-color: var(--gray-100);
    border-radius: var(--br-2);
  }
  .file__name {
    flex: 1 1 40%;
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
}
@media screen and (min-width: 1440px) {
  .file__uploaded {
    display: block;
    flex: 2 1 15%;
  }
}
</style>
