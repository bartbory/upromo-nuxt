<script setup lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";
import { IPerson } from "~/types";

const props = defineProps({
  contact: { type: Object as PropType<IPerson>, required: true },
  isActive: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <div class="contact__container" :class="{ active: isActive }">
    <div class="contact__name">
      <h4>{{ props.contact.name }}</h4>
    </div>
    <div class="contact__detail">
      <div>
        <p><span class="label">Role: </span>{{ props.contact.role }}</p>
      </div>
      <div>
        <p><span class="label">E-mail: </span>{{ props.contact.email }}</p>
      </div>
      <div>
        <p><span class="label">Phone: </span>{{ props.contact.phone }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact__container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  column-gap: 8px;
  min-height: 64px;
  padding: 8px;
  background-color: var(--white-900);
  border-radius: var(--br-2);
  border: 1px solid transparent;
  transition: all 0.3s;
}

.contact__container:hover {
  border: 1px solid var(--purple-900);
  box-shadow: var(--shadow-sc);
}

.contact__detail {
  flex: 0 0 60%;
  display: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  column-gap: 24px;
  font-size: 12px;
}
.label {
  color: var(--blue-900);
  opacity: 0.6;
  font-size: 12px;
}

.active {
  background-color: var(--purple-900);
  color: var(--white-900);
}

.active::deep(.label) {
  color: var(--white-900);
}
@media screen and (min-width: 860px) {
  .contact__detail {
    display: flex;
  }
}
</style>
