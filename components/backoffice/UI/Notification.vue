<script setup lang="ts">
import { StyleTypes } from "~/types";

const props = defineProps({
  type: {
    type: String as PropType<StyleTypes>,
    required: false,
    default: "neutral",
  },
});
</script>
<template>
  <div class="notification" :class="props.type">
    <slot />
  </div>
</template>

<style scoped>
.notification {
  min-width: 100%;
  padding: 16px;
  border-radius: var(--br-4);
  margin: 0 auto;
}
.primary {
  background-color: var(--blue-900);
  color: var(--white-900);
}
.secondary {
  background-color: var(--purple-900);
  color: var(--white-900);
}
.neutral {
  background-color: var(--gray-300);
  color: var(--gray-900);
}
.disable {
  background-color: var(--blue-100);
  color: var(--gray-400);
  border: 1px solid var(--gray-300);
}
.danger {
  background-color: var(--red-900);
  color: var(--white-900);
}
.success {
  background-color: var(--green-900);
  color: var(--white-900);
}
</style>
