<script setup lang="ts">
import BaseButton from "./UI/BaseButton.vue";
const props = defineProps({
  userName: { type: String, required: true },
});
const emits = defineEmits(["signOut"]);
</script>

<template>
  <header>
    <h1 class="logo">UPROMO</h1>
    <div class="user">
      {{ userName }}
      <BaseButton
        msg="Logout"
        styleType="secondary"
        type="button"
        size="small"
        @click="emits('signOut')"
      />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  color: var(--white-900);
  width: 100%;
  height: 48px;
  background: var(--gradient-purple);
}

.user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 8px;
  font-family: "Krona One";
  font-size: 12px;
}
@media screen and (min-width: 740px) {
  header {
    padding: 0 24px;
  }

  .user {
    column-gap: 16px;
  }
}
</style>
