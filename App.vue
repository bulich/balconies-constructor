<template>
  <div class="c-app grow f-column" v-cloak>
    <div class="grow">
      <app-header></app-header>
      <app-scene v-if="!showWindowTypeSelect"></app-scene>
      <app-window-types v-if="showWindowTypeSelect"></app-window-types>
    </div>

    <transition name="slide-up">
      <app-menu v-if="isMenuVisible"></app-menu>
    </transition>

    <app-loader v-if="showLoader"></app-loader>

    <app-plug></app-plug>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
import AppLoader from './components/AppLoader'
import AppMenu from './components/AppMenu'
import AppPlug from './components/AppPlug'
import AppScene from './components/AppScene'
import AppWindowTypes from './components/AppWindowTypes'

export default {
  data: () => ({
    showLoader: false
  }),
  components: {
    AppHeader,
    AppFooter,
    AppLoader,
    AppPlug,
    AppScene,
    AppMenu,
    AppWindowTypes
  },
  computed: {
    isMenuVisible() {
      return this.$store.getters.isMenuVisible
    },
    showWindowTypeSelect() {
      return this.$store.getters.showWindowTypeSelect
    }
  },
  methods: {
    async init() {
      this.showLoader = true
      await this.$store.dispatch('getWindowTypes')
      this.showLoader = false
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss">
.c-app {
  max-width: 100%;
  overflow: hidden;
}

[v-cloak] {
  display: none;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(280px);
}
</style>
