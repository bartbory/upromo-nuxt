<script setup lang="ts">
import BaseButton from "~/components/backoffice/UI/BaseButton.vue";

definePageMeta({
  layout: "default",
});
const supabase = useSupabaseUser();
const user = supabase.value;
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
if (user) {
  isLoggedIn.value = true;
}
</script>

<template>
  <NuxtLayout>
    <nav>
      <div class="nav__container">
        <div class="logo">UPROMO</div>
        <div v-if="!isLoggedIn" class="nav--actions">
          <BaseButton
            msg="Login"
            style-type="secondary"
            type="button"
            size="normal"
            @click="$router.push('/auth/login')"
          />
          <BaseButton
            msg="Create account"
            style-type="secondary"
            type="button"
            size="normal"
            @click="$router.push('/auth/register')"
          />
        </div>
        <div v-else>
          <BaseButton
            msg="Go to panel"
            style-type="secondary"
            type="button"
            size="normal"
            @click="$router.push('/user')"
          />
        </div>
      </div>
    </nav>
    <header>
      <h1>
        The best and simplest way to promote your upcoming release... Just try!
      </h1>
    </header>
    <section class="benefits">
      <h1>What you get?</h1>
      <div class="benefits__container">
        <div class="benefits__block"><img />Responsive design</div>
        <div class="benefits__block">
          <img />Soundcloud & Spotify integrated
        </div>
        <div class="benefits__block"><img />Protected page link</div>
        <div class="benefits__block"><img />Intuitive page creator</div>
      </div>
    </section>
    <div class="purple"></div>
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
    <section class="plans">
      <h1>Available plans</h1>
      <div class="plans__container">
        <div class="plan">
          <h2>Lite</h2>
          <div class="plan--row">
            <p>Albums:</p>
            <p>{{ maxAlbumCount("LITE") }}</p>
          </div>
          <div class="plan--row">
            <p>Images storage:</p>
            <p>{{ maxImagesStorageCapacity("LITE") }} mb</p>
          </div>
          <div class="plan--row">
            <p>Files storage:</p>
            <p>{{ maxFilesStorageCapacity("LITE") }} mb</p>
          </div>
        </div>
        <div class="plan">
          <h2>Basic</h2>
          <div class="plan--row">
            <p>Albums:</p>
            <p>{{ maxAlbumCount("BASIC") }}</p>
          </div>
          <div class="plan--row">
            <p>Images storage:</p>
            <p>{{ maxImagesStorageCapacity("BASIC") }} mb</p>
          </div>
          <div class="plan--row">
            <p>Files storage:</p>
            <p>{{ maxFilesStorageCapacity("BASIC") }} mb</p>
          </div>
        </div>
        <div class="plan">
          <h2>Pro</h2>
          <div class="plan--row">
            <p>Albums:</p>
            <p>{{ maxAlbumCount("PRO") }}</p>
          </div>
          <div class="plan--row">
            <p>Images storage:</p>
            <p>{{ maxImagesStorageCapacity("PRO") }} mb</p>
          </div>
          <div class="plan--row">
            <p>Files storage:</p>
            <p>{{ maxFilesStorageCapacity("PRO") }} mb</p>
          </div>
        </div>
      </div>
      <h3>Didn/t find play that fit to yours needs?</h3>
      <p>Contact with us, and we will try yo customize plan special for you!</p>
    </section>
    <footer>
      <h1 class="logo">UPROMO</h1>
    </footer>
  </NuxtLayout>
</template>

<style scoped>
a {
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
  height: 80vh;
  /* background: var(--gradient-purple); */
  background: conic-gradient(
    from -38deg at 27.19% 32.4%,
    #c624ff 154.514723deg,
    #4378ff 430deg
  );

  padding: 40px;
  position: relative;
}

header h1 {
  position: absolute;
  width: 75%;
  bottom: 40px;
  left: 40px;
  color: var(--white-900);
}

.benefits__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.benefits__block {
  flex: 1 0 22%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-100);
  border-radius: var(--br-16);
}

.purple {
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: var(--purple-900);
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

.plans__container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
}

.plan {
  flex: 1 0 30%;
  background-color: var(--gray-100);
  border-radius: var(--br-16);
  padding: 16px;
}
.plan h2 {
  text-align: center;
  margin-bottom: 32px;
}

.plan--row {
  display: flex;
  justify-content: space-between;
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
</style>
