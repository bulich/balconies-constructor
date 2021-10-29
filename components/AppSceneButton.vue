<template>
  <button class="c-button" 
          :class="{'active': isActive}"
          :style="position"
          @click="clickHandler"
          v-html="buttonData.icon">
    
  </button>
</template>

<script>
export default {
  name: 'AppSceneButton',
  props: ['buttonData'],
  methods: {
    clickHandler() {
      const payload = this.isActive ? null : this.buttonData.id
      this.$store.commit('setActiveElementById', payload)
    }
  },
  computed: {
    position() {
      return {
        left: this.buttonData.coord.x + '%',
        bottom: this.buttonData.coord.y + '%'
      }
    },
    activeElement() {
      return this.$store.getters.activeElement
    },
    isActive() {
      if (this.activeElement) {
        return this.activeElement.id == this.buttonData.id
      }
      return false
    }
  }
}
</script>

<style lang="scss">
  .c-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    padding: 0;
    position: absolute;
    z-index: 50;
    border: 3px solid #ffffff;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  

    &.active {
      background: #FFC600;
    }
    
    svg {
      max-width: 100%;
      height: auto;
    }
  }
</style>
