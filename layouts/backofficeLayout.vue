<script setup lang="ts">
import TopBar from "~/components/backoffice/TopBar.vue";
import SideNav from "~/components/backoffice/SideNav.vue";
</script>

<template>
  <div>
    <TopBar />
    <main>
      <SideNav />
      <section>
        <slot />
      </section>
    </main>
  </div>
</template>

<style scoped>
main {
  display: flex;
}
</style>
