<script setup lang="ts">
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import { IUser } from "~/types";
definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});

const isLoading = ref(true);

const supabase = useSupabaseUser();
const user = supabase.value;
let userData = reactive<IUser>({
  id: "",
  name: "",
  email: "",
  plan: "LITE",
});
if (user) {
  const { data } = await useFetch<{ data: IUser }>(`/api/users/${user?.id}`);
  if (data.value) {
    userData = data.value.data;
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="head">
    <h1>Profile</h1>
  </div>
  <LoadingScreen v-if="isLoading" />
  <article v-else>
    <h2>
        You have active <span>{{ userData.plan }}</span> plan
    </h2>
    <form @submit.prevent="">
      <BaseInput
        label="Name"
        inputType="text"
        v-model.trim="userData.name"
      ></BaseInput>
    </form>
  </article>
</template>
