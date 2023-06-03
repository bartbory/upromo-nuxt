<script setup lang="ts">
import { PropType } from "vue";
import { IConcert } from "../../types";

const props = defineProps({
  gig: { type: Object as PropType<IConcert>, required: true },
});
</script>

<template>
  <div class="concert">
    <h3>{{ props.gig.date }}</h3>
    <h2>{{ props.gig.location }}</h2>
    <a v-if="props.gig.link" :href="props.gig.link">Buy tickets</a>
  </div>
</template>

<style scoped>
.concert {
  background-color: var(--gray-100);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex: 1 0 30%;
  border-radius: var(--br-8);
}
</style>
