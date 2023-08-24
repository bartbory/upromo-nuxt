<script setup lang="ts">
import { PropType, computed } from "vue";
import { SocialTypes } from "../../../types";

const props = defineProps({
  link: { type: String, required: true },
  baselink: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String as PropType<SocialTypes>, required: true },
});

const iconDisplay: Ref<string | null> = ref(null);

onMounted(() => {
  switch (props.icon) {
    case "facebook":
      return (iconDisplay.value = "fa-brands fa-facebook");
    case "instagram":
      return (iconDisplay.value = "fa-brands fa-instagram");
    case "twitter":
      return (iconDisplay.value = "fa-brands fa-twitter");
    case "tiktok":
      return (iconDisplay.value = "fa-brands fa-tiktok");
    case "spotify":
      return (iconDisplay.value = "fa-brands fa-spotify");
    case "soundcloud":
      return (iconDisplay.value = "fa-brands fa-soundcloud");
    case "youtube":
      return (iconDisplay.value = "fa-brands fa-youtube");
    default:
      return (iconDisplay.value = "fa-regular fa-file");
  }
});
</script>
<template>
  <NuxtLink :to="`${props.baselink}${props.link}`">
    <font-awesome-icon :icon="iconDisplay" size="xl" v-if="iconDisplay" />
    <p>{{ props.name }}</p>
  </NuxtLink>
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
  border: 1px solid var(--white-150);
  color: var(--purple-900);
  border-radius: var(--br-8);
  cursor: pointer;
  transition: 0.3s;
}

a:hover {
  background-color: var(--white-900);
  color: var(--blue-900);
}

a p {
  font-family: "Mukta";
  font-size: 16px;
}
</style>
