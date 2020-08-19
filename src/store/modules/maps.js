import * as api from '@/api/api'

export default {
    namespaced: true,
    state: {
        pins: [],
        success: false,
        isLoading: false
    },
    mutations: {
        SET_PINS(state, payload){
            state.pins = payload
            state.success = true
        },
        SET_LOADING(state, payload){
            state.isLoading = payload
        },
        SET_SUCCESS(state, payload){
            state.success = payload
        }
    },
    actions: {
        getPins({commit}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getAll('pins')
                    .then(resp=>{
                        console.log("resp: ", resp)
                        commit('SET_PINS', resp.data)
                        commit('SET_SUCCESS', true)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_SUCCESS', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        }
    }
}