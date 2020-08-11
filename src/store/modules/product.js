// store/modules/product.js
import * as api from '@/api/products'

export default {
    namespaced: true,
    state: {
        glass: [],
        designs: [],
        isLoading: false,
        success: null
    },
    mutations: {
        SET_LOADING(state, payload){
            state.isLoading = payload
        },
        SET_GLASS(state, payload) {
            state.success = true
            state.glass = payload
            state.designs = payload.designs
        },
        SET_ERROR(state, payload){
            state.success = payload
        }
    },
    actions: {
        getGlass({commit}, id){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getGlass(id)
                    .then(resp=>{
                        commit('SET_GLASS', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
                })
        }
    }
  }
