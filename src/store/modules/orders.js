import * as api from '@/api/api'
import { getField, updateField } from 'vuex-map-fields';
import Vue from 'vue'

const state = {
    orders: [],
    isLoading: false,
    errorMessage: null,
    showDialog: false
}

const mutations = {
    updateField,
    SET_ORDERS(state, payload){
        state.orders = payload
    },
    SET_ERROR(state, payload){
        state.errorMessage = payload
    },
    SET_LOADING(state, payload){
        state.isLoading = payload
    }
}

const actions = {
    async getOrders({commit}){
        commit('SET_LOADING', true)
        try{
            const { data } = await api.getAll('orders/me', true)
            commit('SET_ORDERS', data)
        }catch(error){
            Vue.$sentry.captureException(error)
            commit('SET_ERROR', error.response)
        }finally{
            commit('SET_LOADING', false)
        }
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

