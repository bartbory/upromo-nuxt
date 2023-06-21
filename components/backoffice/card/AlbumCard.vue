<script setup lang="ts">
import { useRouter } from "nuxt/app";
import BaseButton from "../UI/BaseButton.vue";
import { PropType } from "nuxt/dist/app/compat/capi";
import { IAlbumList } from "~/types";

const props = defineProps({
  album: { type: Object as PropType<IAlbumList>, required: true },
});

const linkToPage = `/${props.album.artistSlug}/${props.album.albumSlug}/${props.album.id}?secret=${props.album.secret}`;
const router = useRouter();
</script>

<template>
  <div class="album__container">
    <div class="album__cover"><img :src="album.imageCoverPath" /></div>
    <div class="album__name">
      <h4 class="label">{{ album.artistName }}</h4>
      <h4>{{ album.albumName }}</h4>
    </div>
    <div class="album__release">
      <h4 class="label">Release date</h4>
      <h4>{{ album.releaseDate }}</h4>
    </div>
    <div class="album__options">
      <BaseButton
        size="small"
        styleType="primary"
        msg="Visit"
        @click="router.push(linkToPage)"
      />
      <BaseButton
        size="small"
        styleType="secondary"
        msg="Edit"
        @click="router.push(`albums/edit/${album.id}`)"
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
  border: 1px solid transparent;
  transition: all 0.3s;
}

.album__container:hover {
  border: 1px solid var(--purple-900);
  box-shadow: var(--shadow-sc);
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
