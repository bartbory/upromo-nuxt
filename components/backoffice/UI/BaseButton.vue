<script setup lang="ts">
import { PropType } from "vue";
import { IButton, StyleTypes } from "../../../types";

const props: IButton = defineProps({
  size: {
    type: String as PropType<"big" | "normal" | "small">,
    required: true,
  },
  styleType: {
    type: String as PropType<StyleTypes>,
    required: true,
  },
  msg: { type: String, required: false },
});
</script>

<template>
  <button :class="[props.size, props.styleType]">
    <p v-if="props.msg">{{ props.msg }}</p>
  </button>
</template>

<style scoped>
button {
  border: none;
  cursor: pointer;
}
.big {
  font-size: 16px;
  padding: 16px;
  border-radius: var(--br-8);
}
.normal {
  font-size: 16px;
  padding: 8px 16px;
  border-radius: var(--br-4);
}
.small {
  font-size: 12px;
  padding: 8px;
  border-radius: var(--br-4);
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
