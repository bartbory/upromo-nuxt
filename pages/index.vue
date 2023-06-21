<template>
  <NuxtLayout>
    <header>
      <h1 class="logo">UPROMO</h1>
      <h3>Best way to prepare promo site for your upcoming album</h3>
    </header>
    <section class="benefits">
      <h2>What you get?</h2>
      <div class="benefits__slider">
        <div class="slide"><img />Responsive design</div>
        <div class="slide"><img />Soundcloud & Spotify integrated</div>
        <div class="slide"><img />Protected page link</div>
        <div class="slide"><img />Intuitive page creator</div>
      </div>
    </section>
    <section class="how__it__works">
      <h2>How it works?</h2>
      <div>
        <div>
          <h4 class="active">1. Create account</h4>
          <p>
            Less is more, you can create your account using your e-mail, social
            media account, google account or appleID
          </p>
          <h4>2. Upload promo materials</h4>
          <h4>3. Create your promo page</h4>
          <h4>4. Publish your page</h4>
        </div>
        <div>Showcase</div>
      </div>
    </section>
    <section class="plans">
      <h2>Available plans</h2>
      <div>
        <div>
          <h3>Lite</h3>
        </div>
        <div>
          <h3>Basic</h3>
        </div>
        <div>
          <h3>Pro</h3>
        </div>
      </div>
      <h2>Didn/t find play that fit to yours needs?</h2>
      <h4>
        Contact with us, and we will try yo customize plan special for you!
      </h4>
    </section>
    <footer></footer>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>
