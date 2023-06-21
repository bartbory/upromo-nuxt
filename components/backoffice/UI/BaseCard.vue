<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  maxValue: { type: String, required: true },
});
</script>
<template>
  <div class="card">
    <h1>{{ props.title }}</h1>
    <div class="values">
      <p>
        {{ props.value }} <span v-if="props.maxValue"> of {{ props.maxValue }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  flex: 1 0 23%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 24px;
  flex-wrap: wrap;
  background-color: var(--gray-100);
  border-radius: var(--br-8);
  border: 1px solid var(--white-150);
}

.values p {
  font-size: 40px;
  color: var(--blue-900);
}

.values p span {
  font-size: 16px;
}
</style>
