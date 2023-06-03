<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  to: { type: String, required: true },
});

const iconDisplay: Ref<string | null> = ref(null);

onMounted(() => {
  switch (props.name) {
    case "Dashboard":
      return (iconDisplay.value = "fa-regular fa-heart");
    case "Albums":
      return (iconDisplay.value = "fa-regular fa-circle-play");
    case "Files":
      return (iconDisplay.value = "fa-regular fa-file");
    case "Media":
      return (iconDisplay.value = "fa-regular fa-image");
    case "Profile":
      return (iconDisplay.value = "fa-regular fa-user");
    default:
      return (iconDisplay.value = "fa-regular fa-file");
  }
});
</script>

<template>
  <NuxtLink :to="to">
    <font-awesome-icon :icon="iconDisplay" size="sm" v-if="iconDisplay" />
    {{ props.name }}
  </NuxtLink>
</template>

<style scoped>
a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  padding: 0 4px;
  gap: 16px;
  background-color: var(--gray-900);
  color: var(--white-900);
}

a > p {
  display: none;
}

a > svg {
  flex: 0 0 24px;
}

.router-link-active {
  background-color: var(--purple-900);
  color: var(--white-900);
}

@media screen and (min-width: 740px) {
  a {
    justify-content: flex-start;
    width: 100%;
    padding: 0 24px;
  }
  a > p {
    display: block;
  }
}
</style>
