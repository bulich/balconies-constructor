<template>
  <div class="c-menu">
    <div class="c-menu__header">
      <button class="c-menu__close" @click="hideMenu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L5 15M5 5L15 15" stroke="#8E9092" stroke-width="2"/>
        </svg>
      </button>

      <div class="c-menu__title">{{ activeElement.title }}</div>
    </div>
    <div class="c-menu__body">
      <div class="c-menu__list" @wheel.prevent="wheelHandler" ref="list">
        <app-menu-item v-for="item in activeElementGroup"
          :key="item.id"
          :itemData="item"
          >
          {{item.title}}
        </app-menu-item>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenuItem from './AppMenuItem.vue'

export default {
  name: 'AppMenu',
  components: { AppMenuItem },
  computed: {
    activeElement() {
      return this.$store.getters.activeElement
    },
    activeElementGroup() {
      return this.$store.getters.activeElementGroup
    }
  },
  methods: {
    hideMenu() {
      this.$store.commit('setActiveElementById', null)
    },
    wheelHandler(e) {
      this.$refs.list.scrollLeft -= (e.wheelDelta);
    },
  }
}
</script>

<style lang="scss">
  .c-menu {
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 280px;
    background: #fff;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.15);

    &__header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 15px 20px;
      border-bottom: 1px solid #D9D9D9;
    }

    &__close {
      display: block;
      margin-right: 10px;
      padding: 0;

      svg {
        display: block;
      }
    }

    &__title {
      font-family: 'Magistral', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 27px;
    }

    &__body {
      padding-top: 12px;
      padding-left: 20px;
      padding-right: 20px;
    }

    &__list {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-x: auto;
      padding-bottom: 20px;
      padding-top: 20px;
    }
  }
</style>