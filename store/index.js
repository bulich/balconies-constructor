import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import url from '../url'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hideUI: false,
    windowTypes: [],
    showWindowTypeSelect: false,
    elements: [],
    selectedElements: {},
    viewsCount: 0,
    activeElement: null,
    activeElementGroup: null,
    activeElementGroupId: null,
    exposition: ''
  },

  getters: {
    isUIHidden(state) {
      return state.hideUI
    },

    isMenuVisible(state) {
      return !!state.activeElement
    },

    windowTypeSelected(state) {
      return state.windowTypeSelected
    },

    viewsCount(state) {
      return state.viewsCount
    },

    getButtonsById: (state) => (id) => {
      const buttons = []
      for (let item, i = 0; item = state.elements[i]; i++) {
        const coord = item.coords.find(itm => itm.view_id == id)
        if (coord) {
          buttons.push({
            id: item.id,
            title: item.title,
            icon: item.icon,
            coord: coord
          })
        }
      }
      return buttons
    },

    activeElement(state) {
      return state.activeElement
    },

    activeElementGroup(state) {
      return state.activeElementGroup
    },

    activeElementGroupId(state) {
      return state.activeElementGroupId
    },

    selectedElements(state) {
      return state.selectedElements
    },

    windowTypes(state) {
      return state.windowTypes
    },

    showWindowTypeSelect(state) {
      return state.showWindowTypeSelect
    },
     
    exposition(state) {
      return state.exposition
    }
  },

  mutations: {
    hideUI(state) {
      state.hideUI = true
    },

    showUI(state) {
      state.hideUI = false
    },

    setElements(state, payload) {
      state.elements.push(...payload)
    },

    setViewsCount(state, payload) {
      state.viewsCount = payload
    },

    setActiveElementById(state, payload) {
      const candidate = state.elements.find(item => item.id == payload)
      state.activeElement = candidate
      if (!candidate) return
      if (candidate.material_colors.length) {
        state.activeElementGroup = candidate.material_colors
      } else {
        state.activeElementGroup = candidate.material_groups
      }
    },

    setActiveElementGroup(state, payload) {
      state.activeElementGroup = payload
    },

    setActiveElementGroupId(state, payload) {
      state.activeElementGroupId = payload
    },

    setSelectedElement(state, {elementId, groupId, color}) {
      if (color.is_set_exposition) {
        state.exposition = color.set_exposition
      }
      url.setParam(`el_${elementId}`,`${groupId}_${color ? color.id : ''}`)
      Vue.set(state.selectedElements, elementId, {groupId, color})
    },

    setWindowTypes(state, payload) {
      state.windowTypes = payload
    },

    showWindowTypeSelect(state) {
      state.showWindowTypeSelect = true
    },

    selectWindowType(state, payload) {
      url.setParam('type_window_id', payload)
      state.showWindowTypeSelect = false
    },
  },

  actions: {
    async loadData({ commit, dispatch }) {
      const balconyID = url.getParam('balcony_id')
      const windowID = url.getParam('type_window_id')
      try {
        const res = await api.getElements(balconyID, windowID)
        commit('setElements', res.data.elements),
        commit('setViewsCount', res.data.views_count),
        dispatch('setSelectedElements', res.data.elements)
      } catch (error) {
        console.log(error)
      }
    },

    setSelectedElements({commit}, payload) {
      const urlElements = url.getElements()
      
      for (let item, i = 0; item = payload[i]; i++) {
        const candidate = {}
        const hasGroup = !!item.material_groups.length
        const firstGroup = hasGroup ? item.material_groups[0] : item.material_colors[0]
        const firstColor = hasGroup ? firstGroup.material_colors[0] : firstGroup

        if (item.id in urlElements) {
          candidate = {
            elementId: item.id,
            groupId: urlElements[item.id].groupId,
            color: getColorById(item, urlElements[item.id].groupId, urlElements[item.id].colorId)
          }
          if (!candidate.color) {
            candidate.color = firstColor
          }
        } else {
          candidate = {
            elementId: item.id,
            groupId: hasGroup ? firstGroup.id : 0,
            color: firstColor
          }
        }

        commit('setSelectedElement', candidate)
      }
    },

    async getWindowTypes({ dispatch, commit }) {
      const balconyID = url.getParam('balcony_id')
      try {
        const res = await api.getWindowTypes(balconyID)
        if (res.data.length) {
          commit('setWindowTypes', res.data)
          dispatch('checkForWindowTypes')
        } else {
          commit('selectWindowType', '')
          dispatch('loadData')
        }
      } catch (error) {
        console.log(error)
      }
    },
  
    checkForWindowTypes({ commit, dispatch }) {
      const type = url.getParam('type_window_id')
      if (type) {
        commit('selectWindowType', type)
        dispatch('loadData')
      } else {
        commit('showWindowTypeSelect') 
      }
    },
  
    selectWindowType({ commit, dispatch }, payload) {
      commit('selectWindowType', payload)
      return dispatch('loadData')
    },
  }
})

function getColorById(item, groupId, colorId) {
  if (+groupId) {
    return item.material_groups
            .find(i => i.id == groupId).material_colors
            .find(i => i.id == colorId)
  } else {
    return item.material_colors.find(i => i.id == colorId)
  }
}

export default store
