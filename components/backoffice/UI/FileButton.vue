<script setup lang="ts">
import Icon from "~/components/global/Icon.vue";
const props = defineProps({
  link: { type: String, required: true },
  name: { type: String, required: true },
});
</script>

<template>
  <NuxtLink :to="props.link">
    <Icon name="download" :size="16" />
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
  background-color: var(--gray-100);
  border-radius: var(--br-2);
  height: 40px;
  border: 1px solid var(--purple-900);
  color: var(--purple-900);
  border-radius: var(--br-8);
  cursor: pointer;
  transition: 0.3s;
}

a:hover {
  background-color: var(--purple-900);
  color: var(--white-900);
}

a p {
  font-family: "Mukta";
  font-size: 16px;
}
</style>
