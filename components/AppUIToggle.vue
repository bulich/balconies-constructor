<template>
  <div class="c-toggle">
    <label class="c-toggle__label" for="ui-toggle">Скрыть интерфейс</label>
    <label class="switch">
      <input v-model="isHidden" type="checkbox" id="ui-toggle" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AppUIToggle',
  computed: {
    isHidden: {
      get() {
        return this.$store.getters.isUIHidden
      },
      set(value) {
        value ? this.$store.commit('hideUI') : this.$store.commit('showUI') 
      }
    }
  }
}
</script>

<style lang="scss">
  .c-toggle {
    &__label {
      margin-right: 5px;
      user-select: none;
      cursor: pointer;
    }
  }
</style>