<script setup lang="ts">
import { IUser } from "~/types";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import TabSelect from "~/components/backoffice/UI/TabSelect.vue";

definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseClient();
const isLoading = ref(false);
const error = reactive({ status: false, msg: "" });

let formData: IUser = reactive({
  id: "",
  name: "",
  email: "",
  avatar: "",
  plan: "lite",
});

const user = await supabase.auth.getUser();
if (user.data.user) {
  isLoading.value = true;
  formData.id = user.data.user.id;
  formData.name = user.data.user.user_metadata.name;
  formData.email = user.data.user.email!;
  isLoading.value = false;
} else {
  isLoading.value = false;
  error.status = true;
  error.msg = "Something went wrong";
}

async function handleSubmitForm() {
  const response = await useFetch("/api/create_user", {
    method: "POST",
    body: formData,
  });
  if (!response) {
    console.log("walek");
  }
}
</script>

<template>
  <section>
    <h1 class="logo">UPROMO - Personalize your account</h1>
    <form @submit.prevent="handleSubmitForm" v-if="!isLoading && !error.status">
      <BaseInput label="Name" inputType="text" v-model.lazy="formData.name" />
      <BaseInput
        label="Avatar"
        inputType="text"
        v-model.lazy="formData.avatar"
      />
      <TabSelect
        :list="['Lite', 'Basic', 'Pro']"
        label="Select your plan"
        :active="formData.plan"
        @click-item="(item) => (formData.plan = item)"
      />
      <BaseButton type="submit" styleType="success" msg="Save" size="normal" />
    </form>

    <LoadingScreen v-else />
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
