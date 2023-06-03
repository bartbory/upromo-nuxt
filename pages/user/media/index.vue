<script setup lang="ts">
import { ref, computed } from "vue";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import ImageCard from "~/components/backoffice/card/ImageCard.vue";
import BaseInput from "~/components/backoffice/form/BaseInput.vue";
import S3FileUpload from "~/components/backoffice/UI/S3FileUpload.vue";
import { IImage } from "~/types";

definePageMeta({
  layout: "backoffice-layout",
});

const data: IImage[] = [
  { path: "img1.png", createdBy: "Ed Sheeran", alt: "" },
  { path: "img2.png", createdBy: "Mario Bros", alt: "" },
  { path: "img3.png", createdBy: "Mario Bros", alt: "" },
  { path: "img4.png", createdBy: "Mario Bros", alt: "" },
  { path: "img5.png", createdBy: "Jacob Nielse", alt: "Test message" },
  { path: "img6.png", createdBy: "Mark Twain", alt: "" },
  { path: "img7.png", createdBy: "Tony Hawk", alt: "" },
  { path: "img8.png", createdBy: "Rob Bob", alt: "" },
  { path: "img9.png", createdBy: "Salma Hayek", alt: "" },
];

const selectedImage = ref("img1.png");

const imageDetails = computed(() => {
  if (data.find((image) => image.path === selectedImage.value))
    return data.find((image) => image.path === selectedImage.value);
  else {
    return null;
  }
});

function colourOfSpace(v: number) {
  if (v >= 90) {
    return "warning";
  }
}
</script>

<template>
  <div class="head">
    <h1>My Media</h1>
    <!-- <BaseButton
      :size="width === 'xs' ? 'normal' : 'big'"
      styleType="primary"
      msg="Upload"
      /> -->
  </div>
  <div class="limit__container">
    <label
      >You are using
      <span style="font-weight: 700" :class="colourOfSpace(90)">90%</span> of
      your disk space</label
    >
    <div class="range"><div class="range__used"></div></div>
    <S3FileUpload :maxSize="5" accept="png" />
  </div>
  <section>
    <article>
      <ImageCard
        v-for="image in data"
        :imagePath="image.path"
        :key="image.path"
        :isActive="selectedImage === image.path"
        @click="selectedImage = image.path"
      />
    </article>
    <form v-if="imageDetails" @submit.prevent="">
      <img :src="imageDetails.path" />
      <BaseInput
        label="Artist / photographer"
        type="text"
        v-model="imageDetails.createdBy"
      />
      <BaseInput
        label="Alternative text"
        type="text"
        v-model="imageDetails.alt"
      />
      <div class="actions">
        <BaseButton
          msg="Save changes"
          size="normal"
          styleType="success"
          type="submit"
        /><BaseButton
          msg="Delete image"
          size="normal"
          styleType="danger"
          type="button"
        />
      </div>
    </form>
  </section>
</template>

<style scoped>
section {
  flex-direction: row;
}
article {
  flex: 1 1 55%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 45%;
  padding: 24px;
  background-color: var(--gray-100);
  border-radius: var(--br-8);
}

form img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
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
