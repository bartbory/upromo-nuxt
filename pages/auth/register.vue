<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseAuthClient();

const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
  name: "",
});
const isLoading = ref(false);
const formIsValid = ref(true);

async function handleRegister() {
  let { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
      },
    },
  });
  console.log(data);
  console.log(error);
}

async function submitForm() {
  formIsValid.value = true;
  if (
    formData.email === "" ||
    !formData.email.includes("@") ||
    formData.password.length < 6
  ) {
    formIsValid.value = false;
    return;
  } else {
    isLoading.value = true;
    await handleRegister();
    isLoading.value = false;
  }
}
</script>
<template>
  <section>
    <h1 class="logo">UPROMO</h1>
    <form @submit.prevent="submitForm">
      <BaseInput
        label="E-mail"
        inputType="e-mail"
        v-model.trim="formData.email"
      />
      <BaseInput label="Name" inputType="text" v-model.trim="formData.name" />
      <BaseInput
        label="Password"
        inputType="password"
        v-model="formData.password"
      />
      <BaseButton
        type="submit"
        styleType="primary"
        msg="Create account"
        size="normal"
      />
    </form>
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
</style>
