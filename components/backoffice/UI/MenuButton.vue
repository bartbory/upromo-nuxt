<script setup lang="ts">
import { onMounted } from "vue";
import Icon from "../../global/Icon.vue";

const props = defineProps({
  name: { type: String, required: true },
  to: { type: String, required: true },
});

// const iconDisplay: Ref<string> = ref('');
const iconDisplay = computed(() => {
  switch (props.name) {
    case "Dashboard":
      return "dashboard";
    case "Albums":
      return "albums";
    case "Files":
      return "files";
    case "Media":
      return "media";
    case "Contacts":
      return "contacts";
    case "Profile":
      return "profile";
    default:
      return "dashboard";
  }
});

// onMounted(() => {
//   switch (props.name) {
//     case "Dashboard":
//       return (iconDisplay.value = "fa-regular fa-heart");
//     case "Albums":
//       return (iconDisplay.value = "fa-regular fa-circle-play");
//     case "Files":
//       return (iconDisplay.value = "fa-regular fa-file");
//     case "Media":
//       return (iconDisplay.value = "fa-regular fa-image");
//     case "Profile":
//       return (iconDisplay.value = "fa-regular fa-user");
//     default:
//       return (iconDisplay.value = "fa-regular fa-file");
//   }
// });
</script>

<template>
  <NuxtLink :to="to">
    <!-- <font-awesome-icon :icon="iconDisplay" size="sm" v-if="iconDisplay" /> -->
    <Icon :name="iconDisplay" :size="16" color="#fff" />
    <p>{{ props.name }}</p>
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
  transition: 0.3s;
}

a:hover:not(.router-link-active) {
  background-color: var(--white-150);
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
