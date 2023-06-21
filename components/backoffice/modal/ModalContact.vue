<script setup lang="ts">
import BaseButton from "../UI/BaseButton.vue";
import BaseInput from "../form/BaseInput.vue";
import { IPerson } from "../../../types";
import FormContact from "../form/FormContact.vue";
const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, required: true },
});

const emits = defineEmits(["close", "refetch"]);
</script>

<template>
  <Transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <h1>{{ props.title }}</h1>
        </div>
        <div class="modal-body">
          <FormContact
            mode="new"
            @refetch="emits('refetch')"
            @close="emits('close')"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 700px;
  max-width: 80%;
  margin: auto;
  padding: 24px;
  background-color: var(--white-900);
  border-radius: var(--br-8);
  box-shadow: var(--shadow-sc);
  transition: all 0.3s ease;
}

.modal-header h3 {
  color: var(--gray-900);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 500px;
  overflow-y: scroll;
  margin: 24px 0;
}
button {
  float: right;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
