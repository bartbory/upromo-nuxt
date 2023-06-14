<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  list: { type: Array as PropType<string[]>, required: true },
  label: { type: String, required: true },
  active: { type: String, required: true },
});
const emits = defineEmits(["clickItem"]);
</script>

<template>
  <div>
    <label>{{ props.label }}</label>
    <div class="tab__container">
      <div
        class="tab"
        :class="item.toLowerCase() === props.active.toLowerCase() ? 'active' : ''"
        v-for="item in list"
        :key="item"
        @click="emits('clickItem', item.toUpperCase())"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab__container {
  display: flex;
  flex-direction: row;
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
