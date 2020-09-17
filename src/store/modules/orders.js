import * as api from '@/api/api'
// import { getField, updateField } from 'vuex-map-fields';

const state = {
    orders: [],
    isLoading: false,
    errorMessage: null
}

const mutations = {
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
            const orders = await api.get('orders', true)
            commit('SET_ORDERS', orders.data)
        }catch(err){
            console.log(err)
            commit('SET_ERROR', err.response)
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

