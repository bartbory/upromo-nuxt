<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";

useHead({
  title: "UPS, Wrong way...",
  meta: [
    { name: "author", content: "Bartosz Borycki" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  htmlAttrs: {
    lang: "EN",
  },
});

const router = useRouter();
</script>
<template>
  <div>
    <h1>You don't have permission</h1>
    <BaseButton
      msg="Back to home page"
      styleType="primary"
      size="big"
      type="button"
      @click="router.push('/')"
    />
  </div>
</template>
<style scoped>
div {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 32px 0;
  background: var(--gradient-purple);
  color: var(--white-900);
  font-family: "Krona One";
  font-size: 12px;
}
</style>
