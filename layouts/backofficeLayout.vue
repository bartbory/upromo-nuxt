<script setup lang="ts">
import TopBar from "~/components/backoffice/TopBar.vue";
import SideNav from "~/components/backoffice/SideNav.vue";
import { useRouter } from "nuxt/app";

const isLoading = ref(true);

const router = useRouter();
const user = useSupabaseUser();
const userName = user.value?.user_metadata.name;
const plan = user.value?.user_metadata.plan;

if (!user.value) {
  router.push("/auth/login");
} else {
  isLoading.value = false;
}
const signOutHandle = () => {
  const supabase = useSupabaseClient();
  supabase.auth.signOut();
  navigateTo("/");
};
</script>

<template>
  <LoadingScreen v-if="isLoading" />
  <div v-else>
    <TopBar @sign-out="signOutHandle" :userName="userName" :plan="plan" />
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
