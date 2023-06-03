<script setup lang="ts">
import { useRouter } from "nuxt/app";
import Status from "../UI/Status.vue";
import BaseButton from "../UI/BaseButton.vue";

const props = defineProps({
  id: { type: String, required: true },
  album: { type: String, required: true },
  band: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  cover: { type: String, required: true },
});

const router = useRouter();
</script>

<template>
  <div class="album__container">
    <div class="album__cover"><img :src="props.cover" /></div>
    <div class="album__name">
      <h4 class="label">{{ props.band }}</h4>
      <h4>{{ props.album }}</h4>
    </div>
    <div class="album__release">
      <h4 class="label">Release date</h4>
      <h4>{{ props.date }}</h4>
    </div>
    <div class="album__status">
      <h4 class="label">Status</h4>
      <Status :statusType="status" :isSmall="true" />
    </div>
    <div class="album__options">
      <BaseButton
        size="small"
        styleType="primary"
        msg="Edit"
        @click="router.push(`albums/edit/${props.id}`)"
      />
      <BaseButton size="small" styleType="danger" msg="Delete" />
    </div>
  </div>
</template>

<style scoped>
.album__container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
  min-height: 64px;
  padding: 8px;
  background-color: var(--gray-100);
  border-radius: var(--br-2);
}
.album__cover {
  display: none;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background-color: var(--gray-300);
}

.album__cover img {
  width: 100%;
  aspect-ratio: 1;
  flex-shrink: 0;
}
.album__name {
  flex: 1 1 40%;
}

.album__release {
  display: none;
  flex: 0 0 15%;
}
.album__status {
  flex: 0 1 15%;
}

.album__options {
  flex: 1 0 10%;
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
}
.label {
  color: var(--blue-900);
  opacity: 0.6;
}

@media screen and (min-width: 740px) {
  .album__container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 16px;
    height: 96px;
    padding: 8px;
    background-color: var(--gray-100);
    border-radius: var(--br-2);
  }
  .album__cover {
    display: block;
    width: 80px;
    height: 80px;
    overflow: hidden;
    background-color: var(--gray-300);
    flex-shrink: 0;
  }

  .album__cover img {
    width: 80px;
    aspect-ratio: 1;
  }
  .album__name {
    flex: 1 1 40%;
  }

  .album__status {
    flex: 0 0 15%;
  }

  .album__options {
    flex: 1 0 10%;
    display: flex;
    justify-content: flex-end;
    column-gap: 8px;
  }
  .label {
    color: var(--blue-900);
    opacity: 0.6;
  }
}
@media screen and (min-width: 1440px) {
  .album__release {
    display: block;
    flex: 2 1 15%;
  }
}
</style>
