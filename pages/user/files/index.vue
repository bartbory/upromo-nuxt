<script setup lang="ts">

import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import FileCard from "~/components/backoffice/card/FileCard.vue";
definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});


function colourOfSpace(v: number) {
  if (v >= 90) {
    return "warning";
  }
}
</script>

<template>
  <div class="head">
    <h1>My Files</h1>
    <BaseButton
    size="big"
      styleType="primary"
      msg="Upload"
    />
  </div>
  <div class="limit__container">
    <label
      >You are using
      <span style="font-weight: 700" :class="colourOfSpace(90)">90%</span> of
      your disk space</label
    >
    <div class="range"><div class="range__used"></div></div>
  </div>
  <article>
    <FileCard fileName="fileName.jpg" date="2023-05-21" />
    <FileCard fileName="fileName.jpg" date="2023-05-21" />
    <FileCard fileName="fileName.jpg" date="2023-05-21" />
    <FileCard fileName="fileName.jpg" date="2023-05-21" />
    <FileCard fileName="fileName.jpg" date="2023-05-21" />
    <FileCard fileName="fileName.jpg" date="2023-05-21" />
  </article>
</template>

<style scoped>
article {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
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
.warning {
  color: var(--red-900);
}
</style>
