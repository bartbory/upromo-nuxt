<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import { useRouter } from "nuxt/app";
import { IPerson } from "~/types";
import ContactCard from "~/components/backoffice/card/ContactCard.vue";
import FormContact from "~/components/backoffice/form/FormContact.vue";

definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});

let contacts: Ref<IPerson[]> = ref([]);
const isLoading = ref(true);
const showForm = ref(false);
const supabase = useSupabaseUser();
const user = supabase.value;
let selectedContact: Ref<IPerson | null> = ref(null);
let mode: Ref<"new" | "edit"> = ref("new");

const { data, pending } = await useFetch<{ data: IPerson[] }>(
  `/api/contacts/${user?.id}`
);
if (data.value) {
  contacts.value = data.value.data;
  isLoading.value = pending.value;
}

async function fetchData() {
  isLoading.value = true;
  const { data, pending } = await useFetch<{ data: IPerson[] }>(
    `/api/contacts/${user?.id}`
  );
  if (data.value) {
    contacts.value = data.value.data;
    isLoading.value = pending.value;
  }
}

function showNewContactForm() {
  showForm.value = true;
  mode.value = "new";
  selectedContact.value = null;
}

function showEditContactForm(contact: IPerson) {
  showForm.value = true;
  mode.value = "edit";
  selectedContact.value = contact;
}

async function deleteContact(id: string) {
  showForm.value = false;
  selectedContact.value = null;
}
</script>

<template>
  <div class="head">
    <h1>Contacts</h1>
    <BaseButton
      size="big"
      type="button"
      :styleType="showForm ? 'disable' : 'primary'"
      msg="Add new contact"
      @click="showNewContactForm"
    />
  </div>
  <LoadingScreen v-if="isLoading" />
  <div v-else>
    <FormContact
      v-if="showForm"
      :mode="mode"
      :selectedContact="selectedContact ? selectedContact : null"
      @close="showForm = false"
      @refetch="fetchData"
    />
    <article v-if="contacts.length > 0">
      <ContactCard
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @delete="(id: string) => deleteContact(id)"
        @edit-contact="(contact: IPerson) => showEditContactForm(contact)"
        @refetch="fetchData"
      />
    </article>
    <p v-else>No data</p>
  </div>
</template>

<style scoped>
article {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-bottom: 40px;
}
</style>
