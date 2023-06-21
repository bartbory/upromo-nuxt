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
  width: 100vw;
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
.avatar {
  width: 24px;
  height: 24px;
  border: 1px solid var(--white-900);
  border-radius: 50%;
}
@media screen and (min-width: 740px) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    color: var(--white-900);
    width: 100vw;
    height: 64px;
    background: var(--gradient-purple);
  }

  .user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 16px;
    font-family: "Krona One";
    font-size: 12px;
  }
  .avatar {
    width: 48px;
    height: 48px;
    border: 1px solid var(--white-900);
    border-radius: 50%;
  }
}
</style>
