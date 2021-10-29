<template>
  <div class="c-window-types">
    <div class="c-window-type"
      v-for="type in types"
      :key="type.id"
      @click="selectType(type.id)" 
      >
      <div class="c-window-type__image-wrap">
        <div class="c-window-type__image" 
            :style="'background-image: url(/'+ type.image +')'"></div>
      </div>
      <div class="c-window-type__title h3">{{ type.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWindowTypes',
  computed: {
    types() {
      return this.$store.getters.windowTypes
    }
  },
  methods: {
    selectType(type) {
      this.$store.dispatch('selectWindowType', type)
    }
  }
}
</script>

<style lang="scss">
  .c-window-types {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 80px;
  }

  .c-window-type {
    flex-basis: 560px;
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
    cursor: pointer;
    &:hover,
    &:focus {
      .c-window-type {
        &__image {
          transform: scale(1.5);
        }
      }
    }
    
    &__image-wrap {
      padding-top: 100%;
      position: relative;
      overflow: hidden;
    }

    &__image {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: center center;
      background-size: cover;
      transition: transform 0.3s ease-in-out;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }

    &__title {
      margin-top: 30px;
    }
  }
</style>
