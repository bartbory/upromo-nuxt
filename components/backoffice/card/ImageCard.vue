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
  position: relative;
  flex: 1 1 24%;
  max-height: 200px;
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
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  margin: auto auto;
}
.media img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.active {
  background-color: var(--purple-900);
}
</style>
