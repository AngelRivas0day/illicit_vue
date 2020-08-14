import * as api from '@/api/api'

export default {
    namespaced: true,
    state: {
        banners: [],
        isLoading: false,
        success: false
    },
    mutations: {
        SET_BANNERS(state, payload){
            state.banners = payload
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
        getBanners({commit}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getAll('banners')
                    .then(resp=>{
                        commit('SET_BANNERS', resp.data)
                        resolve()
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