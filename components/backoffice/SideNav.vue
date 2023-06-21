<script setup lang="ts">
import MenuButton from "./UI/MenuButton.vue";
</script>

<template>
  <nav>
    <MenuButton name="Dashboard" to="/user" />
    <MenuButton name="Media" to="/user/media" />
    <MenuButton name="Files" to="/user/files" />
    <MenuButton name="Albums" to="/user/albums" />
    <MenuButton name="Contacts" to="/user/contacts" />
    <MenuButton name="Profile" to="/user/profile" />
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  width: 48px;
  background-color: var(--gray-900);
  min-height: calc(100vh - 48px);
  padding-top: 24px;
  color: var(--white-900);
}

@media screen and (min-width: 740px) {
  nav {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
    width: 272px;
    background-color: var(--gray-900);
    min-height: calc(100vh - 64px);
    padding-top: 24px;
    color: var(--white-900);
  }
}
</style>
