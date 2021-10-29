<template>
  <div class="c-plug">
    <div class="c-plug__content">
      <svg width="380" height="261" viewBox="0 0 380 261" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.4932 110.724C12.4932 75.6379 16.9628 50.1207 45.6959 50.1207M45.6959 50.1207L39.3108 43.7414M45.6959 50.1207L39.9493 57.1379M55.9122 122.207H8.66216C4.43047 122.207 1 125.634 1 129.862V252.345C1 256.573 4.43047 260 8.66216 260H66.1284C70.3601 260 73.7905 256.573 73.7905 252.345V242.138M55.9122 122.207H66.1284C70.3601 122.207 73.7905 125.634 73.7905 129.862V242.138M55.9122 122.207L55.9122 6.10344C55.9122 3.28489 58.1991 1 61.0203 1L373.892 1.00001C376.713 1.00001 379 3.28491 379 6.10346V237.035C379 239.853 376.713 242.138 373.892 242.138L73.7905 242.138M364.953 121.569C364.953 125.444 361.808 128.586 357.929 128.586C354.05 128.586 350.905 125.444 350.905 121.569C350.905 117.693 354.05 114.552 357.929 114.552C361.808 114.552 364.953 117.693 364.953 121.569ZM43.1419 245.328C43.1419 248.498 40.569 251.069 37.3953 251.069C34.2215 251.069 31.6486 248.498 31.6486 245.328C31.6486 242.157 34.2215 239.586 37.3953 239.586C40.569 239.586 43.1419 242.157 43.1419 245.328Z" stroke="#D9D9D9" stroke-width="2"/>
      </svg>
      <div class="c-plug__title">
        Для корректной работы конструктора
        откройте его на планшете
        или компьютере
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPlug'
}
</script>

<style lang="scss">
  .c-plug {
    display: block;
    position: fixed;
    z-index: 101;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #ffffff;

    svg {
      max-width: 50vw;
      height: auto;
    }

    &__content {
      width: 100%;
      max-width: 525px;
      padding-left: 15px;
      padding-right: 15px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    &__title {
      margin-top: 1vh;
      font-family: 'Magistral', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 25px;
      line-height: 32px;
    }
  }

  @media (width: 1080px) {
    .c-plug {
      display: none;
    }
  }
</style>
