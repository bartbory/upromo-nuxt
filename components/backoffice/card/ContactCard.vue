<script setup lang="ts">
import BaseButton from "../UI/BaseButton.vue";
import { PropType } from "nuxt/dist/app/compat/capi";
import { IPerson } from "~/types";

const props = defineProps({
  contact: { type: Object as PropType<IPerson>, required: true },
});
const emits = defineEmits(["refetch", "editContact"]);

async function deleteContact(id: string) {
  const { data } = await useFetch(`/api/contacts/contact/${id}`, {
    method: "DELETE",
  });
  if (data.value) {
    emits("refetch");
  }
}
</script>

<template>
  <div class="contact__container">
    <div class="contact__name">
      <h4 class="label">Name</h4>
      <h4>{{ props.contact.name }}</h4>
    </div>
    <div class="contact__detail no__mobile">
      <h4 class="label">Role</h4>
      <h4>{{ props.contact.role }}</h4>
    </div>
    <div class="contact__detail">
      <h4 class="label">E-mail</h4>
      <h4>{{ props.contact.email }}</h4>
    </div>
    <div class="contact__detail no__mobile">
      <h4 class="label">Phone</h4>
      <h4>{{ props.contact.phone }}</h4>
    </div>
    <div class="contact__options">
      <BaseButton
        size="small"
        styleType="secondary"
        msg="Edit"
        @click="emits('editContact', props.contact)"
      />
      <BaseButton
        size="small"
        styleType="danger"
        msg="Delete"
        type="button"
        @click="deleteContact(props.contact.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.contact__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
  min-height: 64px;
  padding: 8px;
  background-color: var(--gray-100);
  border-radius: var(--br-2);
  border: 1px solid transparent;
  transition: all 0.3s;
}

.contact__container:hover {
  border: 1px solid var(--purple-900);
  box-shadow: var(--shadow-sc);
}

.contact__name {
  flex: 1 1 40%;
}

.contact__detail {
  flex: 0 0 15%;
}

.no__mobile {
  display: none;
}
.contact__options {
  flex: 1 0 10%;
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
}
.label {
  color: var(--blue-900);
  opacity: 0.6;
}

@media screen and (min-width: 860px) {
  .contact__container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 16px;
    height: 96px;
    padding: 8px;
    background-color: var(--gray-100);
    border-radius: var(--br-2);
  }
  .contact__name {
    flex: 1 1 40%;
  }

  .no__mobile {
    display: block;
  }

  .contact__options {
    flex: 1 0 10%;
    display: flex;
    justify-content: flex-end;
    column-gap: 8px;
  }
  .label {
    color: var(--blue-900);
    opacity: 0.6;
  }
}
@media screen and (min-width: 1440px) {
  .contact__detail {
    display: block;
    flex: 2 1 15%;
  }
}
</style>
