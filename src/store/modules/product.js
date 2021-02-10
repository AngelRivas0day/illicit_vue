/* eslint-disable */
import * as api from '@/api/products'
import { getField, updateField } from 'vuex-map-fields';

const pagination = 10

const state = {
    glass: {},
    designs: [],
    isLoading: false,
    success: null,
    glasses: [],
    error: null,
    filters:{
        query: null,
        start: 0,
        end: pagination,
        category: null,
        max: null,
        min: null,
        lenseMaterial: null,
        frameMaterial: null,
        brand: null
    }
}

const mutations = {
    updateField,
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
        state.filters.start = payload.length 
        state.filters.end = payload.length + pagination
        state.glasses = [...payload]
    },
    CLEAR_FILTERS(state){
        state.filters = {
            query: null,
            start: state.filters.start,
            end: state.filters.end,
            category: null,
            max: null,
            min: null,
            lenseMaterial: null,
            frameMaterial: null,
            brand: null
        }
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
            const { data } = await api.getGlasses(state.filters)
            commit('SET_GLASSES', data)
        } catch (error) {
            commit('SET_ERROR', error.response)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async clearFilters({commit, dispatch}){
        commit('CLEAR_FILTERS')
        await dispatch('product/getGlasses', null, {root:true})
    }
}

const getters = {
    getField
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
