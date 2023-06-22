<script setup lang="ts">
const props = defineProps({
  storageCapacity: { type: Number, required: true },
});

// Change color of storage capacity
function colourOfSpace(v: number) {
  if (v >= 90) {
    return "var(--red-900)";
  } else if (v >= 75) {
    return "var(--yellow-900)";
  } else {
    return "var(--green-900)";
  }
}
</script>

<template>
  <div class="limit__container">
    <label
      >You are using
      <span
        style="font-weight: 700"
        :style="{ color: colourOfSpace(props.storageCapacity) }"
        >{{
          props.storageCapacity > 100
            ? "100"
            : props.storageCapacity.toFixed(0)
        }}%</span
      >
      of your disk space</label
    >
    <div class="range">
      <div
        class="range__used"
        :style="{
          width: props.storageCapacity + '%',
          backgroundColor: colourOfSpace(props.storageCapacity),
        }"
      ></div>
    </div>
  </div>
</template>
<style scoped>
.range {
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: var(--gray-100);
  overflow: hidden;
}
.range__used {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 8px;
  background-color: var(--blue-900);
}
</style>
