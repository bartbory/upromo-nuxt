<script setup lang="ts">
import { IPerson } from "~/types";
import BaseInput from "./BaseInput.vue";
import BaseButton from "../UI/BaseButton.vue";

const props = defineProps({
  mode: { type: String as PropType<"new" | "edit">, required: true },
  selectedContact: {
    type: Object as PropType<IPerson | null>,
    required: false,
  },
});
const emits = defineEmits(["close", "refetch"]);

const supabase = useSupabaseUser();
const user = supabase.value?.id;

let contact = reactive<IPerson>({
  id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
});
let isLoading = ref(false);

if (props.mode === "edit" && props.selectedContact) {
  contact = {
    id: props.selectedContact.id,
    name: props.selectedContact.name,
    email: props.selectedContact.email,
    phone: props.selectedContact.phone,
    role: props.selectedContact.role,
  };
}

async function submitFormHandler() {
  isLoading.value = true;
  if (props.mode === "new") {
    const dataToSend = { ...contact, uid: user };
    const { data, pending } = await useFetch("/api/contacts/create", {
      method: "POST",
      body: { ...dataToSend },
    });
    if (data.value) {
      emits("close");
      emits("refetch");
    }
    isLoading.value = pending.value;
  }

  if (props.mode === "edit") {
    const dataToSend = { ...contact, uid: user };
    const { data, pending } = await useFetch(
      `/api/contacts/contact/${contact.id}`,
      {
        method: "PUT",
        body: { ...dataToSend },
      }
    );
    if (data.value) {
      emits("close");
      emits("refetch");
    }
    isLoading.value = pending.value;
  }
}
</script>

<template>
  <form v-if="!isLoading" @submit.prevent="submitFormHandler">
    <BaseInput
      label="Name"
      type="text"
      v-model.trim="contact.name"
      :isReq="true"
    />
    <BaseInput
      label="Role"
      type="text"
      v-model.trim="contact.role"
      :isReq="true"
    />
    <BaseInput label="Phone" type="number" v-model.trim="contact.phone" />
    <BaseInput label="E-mail" type="email" v-model.trim="contact.email" />
    <div class="actions">
      <BaseButton msg="Save" size="small" styleType="success" type="submit" />
      <BaseButton
        msg="Cancel"
        size="small"
        styleType="neutral"
        type="button"
        @click="emits('close')"
      />
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 50%;
  padding: 24px;
  background-color: var(--gray-100);
  border-radius: var(--br-8);
}
</style>
