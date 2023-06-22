<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import Notification from "~/components/backoffice/UI/Notification.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import LoadingScreen from "~/components/loading/LoadingScreen.vue";

definePageMeta({
  middleware: ["auth"],
});
const supabase = useSupabaseAuthClient();
const errorMessage = ref("");
const loading = ref(false);
const email = ref("");
const password = ref("");
const isError = ref(false);

const handleLogin = async () => {
  isError.value = false;
  loading.value = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.log(error);
    loading.value = false;
    isError.value = true;
    errorMessage.value = "Incorrect login credentials";
  }
  if (data.user) {
    navigateTo("/user");
  }
};
</script>

<template>
  <section>
    <h1 class="logo">UPROMO</h1>
    <form @submit.prevent="handleLogin" v-if="!loading">
      <BaseInput label="Login" inputType="email" v-model="email" />
      <BaseInput label="Password" inputType="password" v-model="password" />
      <BaseButton type="submit" styleType="primary" msg="Login" size="normal" />
      <Notification v-if="isError" type="danger">{{
        errorMessage
      }}</Notification>
    </form>
    <LoadingScreen v-else />
    <div class="bottom">
      Don't have account yet?
      <NuxtLink to="/auth/register">Go to register page</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  width: 100vw;
  height: 100vh;
  background: var(--gradient-purple);
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 40px;
  min-width: 60%;
  background: var(--white-900);
  border-radius: var(--br-16);
}

.bottom {
  text-align: center;
  padding: 16px 40px;
  min-width: 60%;
  background: var(--white-900);
  border-radius: var(--br-16);
}
</style>
