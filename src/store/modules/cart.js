// store/modules/cart.js

export default {
    namespaced: true,
    state: {
      products: []
    },
    mutations: {
      ADD_PRODUCT(state, payload){
        state.products.push(payload)
      },
      REMOVE_PRODCT(state, payload){

      }
    },
    actions: {
      addProduct({commit}){
        // this.state.whiteIcons = true;
        commit('ADD_PRODUCT', true)
      },
      remoteProduct({commit}){
        // this.state.whiteIcons = true;
        commit('REMOVE_PRODCT', false)
      }
    }
  }
