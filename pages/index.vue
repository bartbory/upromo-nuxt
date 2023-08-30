<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const title = ref("RELEASLAND");
const description = ref(
  "RELEASLAND is your secret weapon for creating captivating pages dedicated to your upcoming music album releases. Whether you're a solo artist, a band, or a music label - now you have the power to captivate your audience right from the start."
);

useHead({
  title,
  meta: [
    { name: "description", content: description },
    { name: "author", content: "Bartosz Borycki" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: "assets/image/releasland_og.png",
  ogSiteName: "RELEASLAND",
});

const steps = reactive({
  step: 1,
  stepText:
    "Less is more... Create your account using your e-mail, select your plan and C R E A T E",
});

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
        <div class="logo">RELEASLAND</div>
      </div>
    </nav>
    <header>
      <div>
        <h1>Your Music. Your World. Your RELEASLAND.</h1>
        <h2>Your Ultimate SaaS Tool for Artists and Music Labels!</h2>
        <h2>See RELEASLAND in Action</h2>
        <div class="cta">
          <a
            href="https://www.releasland.com/hudson/bright-river/d53fc6f4-7287-41e6-8ec0-2d1bb2164a3b?secret=YjQJC5IMOmT7F5Se"
            >Sample 1</a
          >
          <a
            href="https://www.releasland.com/monic/vestido-suelto/2685eec9-a525-4262-b117-eff9da04a586?secret=lKItSLDku3lGN9U4"
            >Sample 2</a
          >
        </div>
      </div>
    </header>
    <iframe
      title="Early access form"
      width="100%"
      height="560px"
      src="https://59b5b9a5.sibforms.com/serve/MUIFAKs_Atu0OwCcfbqk1cLk0S8iLbcYDGfoqknXHr9S5MQnzZ-JHNUMXfD4wMx2pijxL6APpOkpTC9saKN9_dEFA7_dNYKL_U0FzkWddFOoUWLixKGlnOnZzIvTqmSupfQgv54jVXUi6Mhnv3n7mFB_sH-mOZv64zHG9zdpa0VuvrID-yaK6Dm7jl3hP6ZO6JYJsw4t1JFFeRvf"
      frameborder="0"
      scrolling="no"
      allowfullscreen
      style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        max-width: 100%;
      "
    ></iframe>
    <section class="benefits">
      <h1>What you get?</h1>
      <div class="benefits__container">
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/responsive.png"
            alt="Benefit image - responsive"
          />
          <p>Responsive design</p>
        </div>
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/integration.png"
            alt="Benefit image - integration"
          />
          <p>Soundcloud/Spotify integration</p>
        </div>
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/protected.png"
            alt="Benefit image - protected"
          />
          <p>Protected page link</p>
        </div>
        <div class="benefits__block">
          <img
            src="https://dfkoxxzioobmrfcznrnc.supabase.co/storage/v1/object/public/public/default/creator.png"
            alt="Benefit image - intuitive"
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
      <h1 class="logo">RELEASLAND</h1>
    </footer>
    <p class="copyright">
      Copyright © 2023, Bartosz Borycki, All rights reserved
    </p>
  </NuxtLayout>
</template>

<style scoped>
a {
  background-color: var(--white-900);
  border: 2px solid var(--purple-900);
  color: var(--purple-900);
  font-size: 16px;
  padding: 16px;
  border-radius: var(--br-8);
  cursor: pointer;
  transition: 0.3s;
  cursor: pointer;
}

a:hover {
  background-color: var(--purple-900);
  border: 2px solid var(--purple-900);
  color: var(--white-900);
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

.cta {
  display: flex;
  flex-direction: row;
  gap: 24px;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 3.6;
  background: var(--white-900);
}
footer .logo {
  color: var(--purple-900);
}

.copyright {
  width: 100%;
  padding: 2px 24px;
  text-align: center;
  color: var(--gray-900);
  font-size: 12px;
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
  footer {
    aspect-ratio: 6.6;
  }
}

@media screen and (min-width: 1440px) {
  a {
    font-size: 16px;
    padding: 16px;
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
    flex-direction: column;
    gap: 24px;
    justify-content: space-evenly;
    align-items: center;
  }
  header div {
    max-width: 1136px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
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
