<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import TabSelect from "~/components/backoffice/UI/TabSelect.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { PlanTypes } from "~/types";
import { IRegister, IUser } from "~/types";
import Notification from "~/components/backoffice/UI/Notification.vue";

definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseAuthClient();

const router = useRouter();

let formData: IRegister = reactive({
  id: "",
  name: "",
  email: "",
  password: "",
  avatar: "",
  plan: "LITE",
});
const isLoading = ref(false);
const isSuccess = ref(false);
const formIsValid = ref(true);

async function registerUser() {
  isLoading.value = true;
  const response = await useFetch("/api/create_user", {
    method: "POST",
    body: formData,
  });
  if (response) {
    isLoading.value = false;
  }
}

async function handleRegister() {
  isLoading.value = true;
  let { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        plan: formData.plan,
      },
    },
  });
  if (data.user) {
    formData.id = data.user?.id;
    await registerUser();
    isLoading.value = false;
    isSuccess.value = true;
  } else {
  }
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
    <p v-if="isSuccess && !isLoading">Check your inbox to verify your e-mail</p>
    <LoadingScreen v-if="isLoading" />
    <form @submit.prevent="submitForm" v-if="!isLoading && !isSuccess">
      <BaseInput label="Name" inputType="text" v-model.trim="formData.name" />
      <BaseInput
        label="E-mail"
        inputType="e-mail"
        v-model.trim="formData.email"
      />
      <BaseInput
        label="Password"
        inputType="password"
        v-model="formData.password"
      />
      <TabSelect
        :list="['LITE', 'BASIC', 'PRO']"
        label="Select your plan"
        :active="formData.plan"
        @click-item="(item: PlanTypes) => (formData.plan = item)"
      />
      <BaseButton
        type="submit"
        styleType="primary"
        msg="Create account"
        size="big"
      />
    </form>
    <div class="bottom">
      Already have account?
      <NuxtLink to="/auth/login">Go to login page</NuxtLink>
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

form,
p {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 40px;
  min-width: 60%;
  background: var(--white-900);
  border-radius: var(--br-16);
}

p {
  text-align: center;
}
.bottom {
  text-align: center;
  padding: 16px 40px;
  min-width: 60%;
  background: var(--white-900);
  border-radius: var(--br-16);
}
</style>
