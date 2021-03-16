import * as api from '@/api/api'
import Vue from 'vue'

const state = {
    banners: [],
    isLoading: false,
    error: null
}

const mutations = {
    SET_BANNERS(state, payload){
        state.banners = payload
    },
    SET_LOADING(state, payload){
        state.isLoading = payload
    },
    SET_ERROR(state, payload){
        state.error = payload
    }
}

const actions = {
    async getBanners({commit}){
        try{
            commit('SET_LOADING', true)
            const { data } = await api.getAll('banners')
            commit('SET_BANNERS', data)
        }catch(error){
            Vue.$sentry.captureException(error)
            commit('SET_ERROR', error.response)
        }finally{
            commit('SET_LOADING', false)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}