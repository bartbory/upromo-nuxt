<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import LoadingScreen from "~/components/loading/LoadingScreen.vue";

definePageMeta({
  middleware: ["auth"],
});
const supabase = useSupabaseAuthClient();
const router = useRouter();
const loading = ref(false);
const email = ref("");
const password = ref("");
const msg = ref("");

const handleLogin = async () => {
  loading.value = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    loading.value = false;
  }
  if (data) {
    navigateTo("/user");
  }
};
</script>

<template>
  <section>
    <h1 class="logo">UPROMO</h1>
    <form @submit="handleLogin" v-if="!loading">
      <BaseInput label="Login" inputType="email" v-model="email" v-if="!msg" />
      <BaseInput
        label="Password"
        inputType="password"
        v-model="password"
        v-if="!msg"
      />
      <BaseButton
        type="submit"
        styleType="primary"
        msg="Login"
        size="normal"
        v-if="!msg"
      />
      <p>{{ msg }}</p>
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
