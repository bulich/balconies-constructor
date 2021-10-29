<template>
  <div class="c-scene">
    <div class="c-scene__views" @wheel.prevent="wheelHandler" ref="scene">
      <app-scene-view 
        v-for="idx in viewsCount" 
        :key="idx"
        :sceneId="idx">
      </app-scene-view>
    </div>
  </div>
</template>

<script>
import AppSceneView from './AppSceneView'

export default {
  name: 'AppScene',
  components: { AppSceneView },
  computed: {
    viewsCount() {
      return this.$store.getters.viewsCount
    }
  },
  methods: {
    wheelHandler(e) {
      this.$refs.scene.scrollLeft -= (e.wheelDelta);
    }
  }
}
</script>

<style lang="scss">
.c-scene {
  width: 100%;
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 40px;

  &__views {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 20px;
    overflow-x: auto;
  }
}
</style>
