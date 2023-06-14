<template>
  <div class="loading__container">
    <main>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </main>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.loading__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 40px;
  background-color: var(--white-900);
  border-radius: var(--br-16);
}
main {
  width: 100px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
}

main > div {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: var(--purple-900);
  margin: 0 auto;
  animation: pulse 0.7s ease-in-out infinite;
}

main > div:nth-child(1) {
  animation-delay: 0.1s;
}
main > div:nth-child(2) {
  animation-delay: 0.5s;
}
main > div:nth-child(3) {
  animation-delay: 0.2s;
}
main > div:nth-child(4) {
  animation-delay: 0.4s;
}
main > div:nth-child(5) {
  animation-delay: 0.3s;
}

@keyframes pulse {
  0% {
    height: 0px;
    width: 0px;
  }
  50% {
    height: 8px;
    width: 8px;
  }
  100% {
    height: 0px;
    width: 0px;
  }
}
</style>
