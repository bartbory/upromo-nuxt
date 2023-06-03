<script setup lang="ts">
import { PropType } from "vue";
import { IConcert } from "../../types";
import ConcertBox from "./ConcertBox.vue";

const props = defineProps({
  concerts: { type: Array as PropType<IConcert[]>, required: true },
});
</script>

<template>
  <div class="concerts__list">
    <ConcertBox v-for="gig in props.concerts" :gig="gig" :key="gig.id" />
  </div>
</template>

<style scoped>
.concerts__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
