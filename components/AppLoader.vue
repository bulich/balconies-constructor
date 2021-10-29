<template>
  <div class="c-loader">
    <div class="c-loader__element">
      <div class="c-loader__part"></div>
      <div class="c-loader__part"></div>
      <div class="c-loader__part"></div>
      <div class="c-loader__part"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoader'
}
</script>

<style lang="scss">
.c-loader {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #ffffff;

  &__element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }

  &__part {
    position: absolute;
    width: 40%;
    height: 40%;
    border-radius: 50%;
    animation: spin 2s ease infinite;

    &:first-child {
      background: #FFC600;
      animation-delay: -1.5s;
    }
    &:nth-child(2) {
      background: #000000;
      animation-delay: -1s;
    }
    &:nth-child(3) {
      background: #8E9092;;
      animation-delay: -0.5s;
    }
    &:last-child {
      background: #D9D9D9;
    }
  }
}

@keyframes spin {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
</style>
