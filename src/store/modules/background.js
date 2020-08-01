// store/modules/background.js

export default {
    namespaced: true,
    state: {
      whiteIcons: false
    },
    mutations: {
      SET_WHITE_ICONS(state, payload) {
        state.whiteIcons = payload
      }
    },
    actions: {
      setWhiteIcons({commit}){
        // this.state.whiteIcons = true;
        commit('SET_WHITE_ICONS', true)
      },
      unsetWhiteIcons({commit}){
        // this.state.whiteIcons = true;
        commit('SET_WHITE_ICONS', false)
      }
    }
  }
