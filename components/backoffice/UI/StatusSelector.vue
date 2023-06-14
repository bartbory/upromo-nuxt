<script setup lang="ts">
import { PropType } from "vue";
import { StatusTypes } from "../../../types";

const props = defineProps({
  active: {
    type: String as PropType<StatusTypes>,
    required: true,
    default: "UNPUBLISHED",
  },
});

const emit = defineEmits(["setStatus"]);
</script>

<template>
  <div>
    <label>Status</label>
    <button
      class="normal"
      :class="props.active === 'PUBLISHED' ? 'active' : 'inactive'"
      @click="emit('setStatus', 'published')"
    >
      <span class="dot published"></span>
      <p>Published</p>
    </button>
    <button
      class="normal"
      :class="props.active === 'DRAFT' ? 'active' : 'inactive'"
      @click="emit('setStatus', 'draft')"
    >
      <span class="dot draft"></span>
      <p>Draft</p>
    </button>
    <button
      class="normal"
      :class="props.active === 'UNPUBLISHED' ? 'active' : 'inactive'"
      @click="emit('setStatus', 'unpublished')"
    >
      <span class="dot unpublished"></span>
      <p>Unpublished</p>
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: 100%;
}

button {
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border: 1px solid var(--white-900);
  border-radius: var(--br-8);
}
.normal {
  font-size: 12px;
  padding: 12px 16px;
  border-radius: var(--br-4);
}

.active {
  background-color: var(--blue-900);
  color: var(--white-900);
  border: 1px solid var(--white-150);
}
.inactive {
  background-color: var(--white-900);
  color: var(--grey-900);
  border: 1px solid var(--gray-300);
  transition: 0.3s;
}

.inactive:hover {
  background-color: var(--blue-100);
}

.unpublished {
  background-color: var(--red-900);
}
.draft {
  background-color: var(--yellow-900);
}
.published {
  background-color: var(--green-900);
}
</style>
