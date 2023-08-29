<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<{ text: string; value: string }[]>,
    required: true,
  },
  label: { type: String, required: true },
  active: { type: String, required: true },
  display: {
    type: String as PropType<"column" | "row">,
    required: false,
    default: "row",
  },
});
const emits = defineEmits(["clickItem"]);
</script>

<template>
  <div>
    <label>{{ props.label }}</label>
    <div class="tab__container" :style="{flexDirection: props.display}">
      <div
        class="tab"
        :class="item.value === props.active ? 'active' : ''"
        v-for="item in list"
        :key="item.value"
        @click="emits('clickItem', item.value)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab__container {
  display: flex;
  padding: 2px;
  width: 100%;
  background: var(--gray-300);
  border-radius: var(--br-4);
}
.tab {
  flex: 1 1 25%;
  text-align: center;
  padding: 8px;
  transition: 0.3s;
  border-radius: var(--br-2);
  cursor: pointer;
  transition: 0.3s;
}

.tab:hover:not(.active) {
  background-color: var(--white-900);
}

.active {
  background-color: var(--blue-900);
  color: var(--white-900);
}
</style>
