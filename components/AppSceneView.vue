<template>
  <div class="c-view" :class="{'hide-ui': isUIHidden}">
    <app-scene-button
      v-for="button in buttons"
      :key="button.id"
      :buttonData="button">
    </app-scene-button>

    <app-view-layer
      v-for="(layer, id) in layers"
      :key="'id'+sceneId+id"
      :sceneId="sceneId"
      :layerData="layer"
     >
    </app-view-layer>
  </div>
</template>

<script>
import AppSceneButton from './AppSceneButton'
import AppViewLayer from './AppViewLayer.vue'

export default {
  name: 'AppSceneView',
  props: ['sceneId'],
  components: { AppSceneButton, AppViewLayer },
  computed: {
    isUIHidden() {
      return this.$store.getters.isUIHidden
    },
    buttons() {
      return this.$store.getters.getButtonsById(this.sceneId)
    },
    layers() {
      return this.$store.getters.selectedElements
    },
  }
}
</script>

<style lang="scss">
  .c-view {
    flex-shrink: 0;
    width: 600px;
    height: 600px;
    position: relative;
    overflow: hidden;
    background: #ECF1F3;

    &.hide-ui {
      .c-button {
        display: none;
      }
    }

    & + & {
      margin-left: 30px;
    }
  }
</style>
