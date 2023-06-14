<script setup lang="ts">
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});

const supabase = useSupabaseUser();
const { data } = await useFetch(`/api/users/${supabase.value!.id}`);

// console.log(data.value?.data);

const loading = ref(true);
const name = ref(data.value?.data?.name);
const email = ref(data.value?.data?.email);
const avatar = ref(data.value?.data?.avatar);
</script>

<template>
  <div class="head">
    <h1>Profile</h1>
  </div>

  <article>
    <form @submit.prevent="">
      <BaseInput label="Name" inputType="text" v-model.trim="name"></BaseInput>
      <BaseInput
        label="E-mail"
        inputType="text"
        v-model.trim="email"
      ></BaseInput>
      <BaseInput label="Avatar" inputType="text" v-model="avatar"></BaseInput>
    </form>
  </article>
</template>
