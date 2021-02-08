/* eslint-disable */
import * as api from '@/api/products'

const pagination = 10

const state = {
    glass: {},
    designs: [],
    isLoading: false,
    success: null,
    start: 0,
    end: pagination,
    glasses: [],
    error: null
}

const mutations = {
    SET_LOADING(state, payload){
        state.isLoading = payload
    },
    SET_GLASS(state, payload) {
        state.success = true
        state.glass = payload
        state.designs = payload.designs
    },
    SET_ERROR(state, payload){
        state.error = payload
    },
    SET_GLASSES(state, payload) {
        state.success = true
        state.start = payload.length 
        state.end = payload.length + pagination
        state.glasses = [...payload]
    }
}

const actions = {
    async getGlass({commit}, id){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getGlass(id)
            commit('SET_GLASS', data)
        } catch (error) {
            commit('SET_ERROR', error.response)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async getGlasses({commit, state}){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getGlasses(state.start, state.end)
            commit('SET_GLASSES', data)
        } catch (error) {
            commit('SET_ERROR', error.response)
        } finally {
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
