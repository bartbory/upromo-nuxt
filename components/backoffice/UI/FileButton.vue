<script setup lang="ts">
const props = defineProps({
  link: { type: String, required: true },
  name: { type: String, required: true },
});
</script>

<template>
  <NuxtLink :to="props.link">
    <p>{{ props.name }}</p></NuxtLink
  >
</template>

<style scoped>
a {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;
  background: var(--gray-100);
  border-radius: var(--br-2);
  height: 40px;
  border: 1px solid var(--white-150);
  color: var(--purple-900);
  border-radius: var(--br-8);
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  color: var(--blue-900);
}

button p {
  font-family: "Mukta";
  font-size: 16px;
}
</style>
