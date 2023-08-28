<script setup lang="ts">
import { PropType, computed } from "vue";
import { SocialTypes } from "../../../types";
import Icon from "~/components/global/Icon.vue";

const props = defineProps({
  link: { type: String, required: true },
  baselink: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String as PropType<SocialTypes>, required: true },
});

const iconDisplay = computed(() => {
  switch (props.icon) {
    case "facebook":
      return "facebook";
    case "instagram":
      return "instagram";
    case "twitter":
      return "twitter";
    case "tiktok":
      return "tiktok";
    case "spotify":
      return "spotify";
    case "tidal":
      return "tidal";
    case "soundcloud":
      return "soundcloud";
    case "youtube":
      return "youtube";
    default:
      return "tidal";
  }
});
</script>
<template>
  <NuxtLink :to="`${props.baselink}${props.link}`">
    <!-- <font-awesome-icon :icon="iconDisplay" size="xl" v-if="iconDisplay" /> -->
    <Icon :name="iconDisplay" :size="16" />
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
