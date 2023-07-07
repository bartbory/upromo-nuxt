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