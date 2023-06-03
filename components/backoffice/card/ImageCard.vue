<script setup lang="ts">
const props = defineProps({
  imagePath: { type: String, required: true },
  isActive: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <div class="media__container" :class="{ active: isActive }">
    <div class="media"><img :src="props.imagePath" /></div>
  </div>
</template>

<style scoped>
.media__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
  flex: 1 1 30%;
  max-width: 200px;
  padding: 16px;
  background-color: var(--gray-100);
  border-radius: var(--br-4);
  cursor: pointer;
  transition: 0.3s;
}

.media__container:hover {
  background: var(--purple-400);
}
.media {
  width: 100%;
  height: auto;
  max-height: 100%;
}
.media img {
  width: 100%;
}
.active {
  background-color: var(--purple-900);
}
</style>
