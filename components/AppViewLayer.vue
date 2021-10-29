<template>
  <div class="c-layer" :style="style">

  </div>
</template>

<script>
export default {
  name: 'AppViewLayer',
  props: ['layerData', 'sceneId'],
  computed: {
    hasColor() {
      return !!this.layerData.color
    },
    exposition() {
      return this.$store.getters.exposition
    },
    image() {
      let image = this.hasColor ? `view_${this.sceneId}_img` : ''
      
      if (this.layerData.color.use_exposition_image && this.exposition) {
        image = image + "_" + this.exposition
      }

      return `url(${'/' + this.layerData.color[image]})`
    },
    style() {
      const zIndex = (this.hasColor) ? this.layerData.color[`z_index_view_${this.sceneId}_img`] : 1
      return {
        "background-image": this.image,
        "z-index": zIndex
      }
    }
  }
}
</script>

<style lang="scss">
  .c-layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: contain;
    background-position: center center;
  }
</style>
