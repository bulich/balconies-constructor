<template>
  <button class="c-menu-item" type="button" @click="clickHandler" :class="{'active': isActive}">
    <div class="c-menu-item__thumbnail" 
         :style="background">
      <div class="c-menu-item__active-block">
        <svg class="c-menu-item__active-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#FFC600"/>
          <path d="M5 11.5L10 16.5L19 7.5" stroke="white" stroke-width="2"/>
        </svg>
      </div>
    </div>
    <div class="c-menu-item__title">{{ itemData.title }}</div>
  </button>
</template>

<script>
export default {
  name: 'AppMenuItem',
  data: () => ({
    active: false
  }),
  props: ['itemData'],
  computed: {
    activeElement() {
      return this.$store.getters.activeElement
    },
    activeElementGroup() {
      return this.$store.getters.activeElementGroup
    },
    selectedElements() {
      return this.$store.getters.selectedElements
    },
    activeElementGroupId() {
      return this.$store.getters.activeElementGroupId
    },
    background() {
      return `background-image: url(${'/' + this.itemData.thumbnail})`
    },
    isGroup() {
      return !!this.itemData.material_colors
    },
    isActive() {
      if (this.isGroup) {
        return  this.itemData.id == this.selectedElements[this.activeElement.id].groupId
      } else {
        return this.itemData.id == this.selectedElements[this.activeElement.id].color.id
      }
    }
  },
  methods: {
    clickHandler() {
      if (this.isGroup) {
        this.$store.commit('setActiveElementGroup', this.itemData.material_colors)
        this.$store.commit('setActiveElementGroupId', this.itemData.id)
      } else {
        const groupId = this.activeElement.material_groups.length ? this.activeElementGroupId : 0
        this.$store.commit('setActiveElementGroupId', groupId)
        this.$store.commit('setSelectedElement', {
          elementId: this.activeElement.id,
          groupId: groupId,
          color: this.itemData
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .c-menu-item {
    display: block;
    padding: 0;
    flex-shrink: 0;
    width: 110px;

    &.active {
      .c-menu-item__active-block {
        display: block;
      }
    }

    & + & {
      margin-left: 15px;
    }

    &__title {
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }

    &__thumbnail {
      position: relative;
      width: 80px;
      height: 80px;
      margin-left: auto;
      margin-right: auto;
      background-size: cover;
      background-position: center center;
    }

    &__active-block {
      display: none;
      position: absolute;
      left: -4px;
      right: -4px;
      bottom: -4px;
      top: -4px;
      border: 2px solid #FFC600;
    }

    &__active-icon {
      position: absolute;
      right: -8px;
      top: -8px;
    }
  }
</style>