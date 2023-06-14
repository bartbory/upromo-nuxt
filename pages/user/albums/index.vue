<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import AlbumCard from "~/components/backoffice/card/AlbumCard.vue";
import { useRouter } from "nuxt/app";
definePageMeta({
  layout: "backoffice-layout",
  middleware: ["auth"],
});
const router = useRouter();

const user = useSupabaseUser();

const { data } = await useFetch(`/api/albums/${user.value!.id}`);
</script>

<template>
  <div class="head">
    <h1>My Albums</h1>
    <BaseButton
      size="big"
      styleType="primary"
      msg="Add new album"
      @click="router.push({ path: 'albums/new-album' })"
    />
  </div>
  <article>
    <AlbumCard
      id="jhb1rbjheqw"
      album="Lucy Perk got new tattoo"
      band="The Eagles of Shadow"
      date="20/09/2023"
      status="Published"
      cover="../cover1.png"
    />
    <AlbumCard
      id="13rqwsd23"
      album="Millennials vibe"
      band="Mysterious"
      date="25/09/2023"
      status="Unpublished"
      cover="../cover2.png"
    />
  </article>
</template>

<style scoped>
article {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
