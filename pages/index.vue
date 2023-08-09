<script setup lang="ts">
import MailChimp from "~/components/frontend/MailChimp.vue";
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";
import { useRouter } from "nuxt/app";
definePageMeta({
  layout: "default",
});
const router = useRouter();
const steps = reactive({
  step: 1,
  stepText:
    "Less is more... Create your account using your e-mail, select your plan and C R E A T E",
});
const isLoggedIn = ref(false);

function stepHandler(step: number) {
  steps.step = step;
  switch (step) {
    case 1:
      steps.stepText =
        "Less is more... Create your account using your e-mail, select your plan and C R E A T E";
      break;
    case 2:
      steps.stepText =
        "Depending on the plan you choose, you can easily upload images and files within a certain limit ";
      break;
    case 3:
      steps.stepText =
        "Add new album in manager, and customize your data. You can add hero image, cover image, promo images, add a concert tour, booking contacts and more... ";
      break;
    case 4:
      steps.stepText =
        "Copy page url and just send it where you want... you can always change 'secret token' on your edit album page if you want to disable it from previous link";
      break;

    default:
      steps.stepText =
        "Less is more... Create your account using your e-mail, select your plan and C R E A T E";
      break;
  }
}
</script>

<template>
  <NuxtLayout>
    <nav>
      <div class="nav__container">
        <div class="logo">UPROMO</div>
      </div>
    </nav>
    <header>
      <div>
        <h1>Promote Your Album</h1>
        <h1>Reach Your Audience</h1>
        <h1>Boost Your Book Sales</h1>
      </div>
      <div>
        <h2>Subscribe to get early access</h2>
        <MailChimp />
      </div>
      <div>
        <a
          href="https://upromo.vercel.app/artist-name/new-album-name/6618223a-871d-4069-a06d-a8a8ba0dbce0?secret=HnvmSp5u4ZDDuHfL"
          >Demo page</a
        >
      </div>
    </header>
    <section class="benefits">
      <h1>What you get?</h1>
      <div class="benefits__container">
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/responsive.png"
          />
          <p>Responsive design</p>
        </div>
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/integration.png"
          />
          <p>Soundcloud/Spotify integration</p>
        </div>
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/protected.png"
          />
          <p>Protected page link</p>
        </div>
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/creator.png"
          />
          <p>Intuitive page creator</p>
        </div>
      </div>
    </section>
    <div class="blue"></div>
    <section class="how__it__works">
      <h1>How it works?</h1>
      <div>
        <div
          class="step"
          :class="{ active: steps.step === 1 }"
          @click="stepHandler(1)"
        >
          <h2>1. Create account</h2>
          <p v-if="steps.step === 1">
            {{ steps.stepText }}
          </p>
        </div>
        <div
          class="step"
          :class="{ active: steps.step === 2 }"
          @click="stepHandler(2)"
        >
          <h2>2. Upload materials</h2>
          <p v-if="steps.step === 2">
            {{ steps.stepText }}
          </p>
        </div>
        <div
          class="step"
          :class="{ active: steps.step === 3 }"
          @click="stepHandler(3)"
        >
          <h2>3. Create your promo site</h2>
          <p v-if="steps.step === 3">
            {{ steps.stepText }}
          </p>
        </div>
        <div
          class="step"
          :class="{ active: steps.step === 4 }"
          @click="stepHandler(4)"
        >
          <h2>4. Promote your release with just one link</h2>
          <p v-if="steps.step === 4">{{ steps.stepText }}</p>
        </div>
      </div>
    </section>
    <footer>
      <h1 class="logo">UPROMO</h1>
    </footer>
  </NuxtLayout>
</template>

<style scoped>
a {
  background-color: var(--green-900);
  color: var(--white-900);
  border: 1px solid var(--green-900);
  font-size: 16px;
  padding: 16px;
  border-radius: var(--br-8);
  border: none;
  cursor: pointer;
  transition: 0.3s;
  cursor: pointer;
}

section {
  max-width: 1136px;
  margin: 0 auto;
  position: relative;
}

h1 {
  color: var(--gray-900);
  font-size: 24px;
}

h2 {
  font-size: 20px;
}

h3 {
  font-size: 16px;
}

nav {
  background: var(--gradient-purple);
}

.nav__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  max-width: 1136;
  height: 60px;
}

.nav__container a {
  color: var(--white-900);
}

.nav--actions {
  display: flex;
  gap: 24px;
}

header {
  width: 100%;
  min-height: 60vh;
  /* background: var(--gradient-purple); */
  background: conic-gradient(
    from -38deg at 27.19% 32.4%,
    #c624ff 154.514723deg,
    #4378ff 430deg
  );
  background-image: url("https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/top.png");
  background-size: cover;
  background-position: center;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
}

header div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

header h1,
header h2 {
  width: 100%;
  color: var(--white-900);
  text-align: left;
}

header:deep(form) {
  width: 100%;
}

.benefits__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.benefits__block {
  position: relative;
  flex: 1 0 50%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-100);
  color: var(--white-900);
  border-radius: var(--br-16);
  overflow: hidden;
}
.benefits__block img {
  position: absolute;
  width: 100%;
  z-index: 0;
}

.benefits__block p {
  z-index: 10;
}

.step {
  cursor: pointer;
}

.blue {
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: var(--blue-900);
}

.how__it__works {
  color: white;
}

.how__it__works h1 {
  color: var(--white-900);
}

.active {
  margin: 24px 0;
}
.active h2 {
  font-size: 24px;
}
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 2.6;
  background: conic-gradient(
    from -70deg at 50% 50%,
    #c624ff 4.514723deg,
    #4378ff 495.520721deg
  );
}
footer .logo {
  color: var(--white-900);
}

@media screen and (min-width: 744px) {
  .benefits__block {
    position: relative;
    flex: 1 0 45%;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--gray-100);
    color: var(--white-900);
    border-radius: var(--br-16);
    overflow: hidden;
  }
}

@media screen and (min-width: 1440px) {
  a {
    background-color: var(--green-900);
    color: var(--white-900);
    border: 1px solid var(--green-900);
    font-size: 16px;
    padding: 16px;
    border-radius: var(--br-8);
    border: none;
    cursor: pointer;
    transition: 0.3s;
    cursor: pointer;
  }

  section {
    max-width: 1136px;
    margin: 0 auto;
    position: relative;
  }

  h1 {
    color: var(--gray-900);
    font-size: 48px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  nav {
    background: var(--gradient-purple);
  }

  .nav__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    max-width: 1136;
    height: 60px;
  }

  .nav__container a {
    color: var(--white-900);
  }

  .nav--actions {
    display: flex;
    gap: 24px;
  }

  header {
    width: 100%;
    min-height: 60vh;
    /* background: var(--gradient-purple); */
    padding: 40px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    align-items: center;
  }
  header div {
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .benefits__block {
    position: relative;
    flex: 1 0 22%;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--gray-100);
    color: var(--white-900);
    border-radius: var(--br-16);
    overflow: hidden;
  }
}
</style>
