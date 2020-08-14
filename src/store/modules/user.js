// store/modules/product.js
import * as api from '@/api/api'

export default {
    namespaced: true,
    state: {
        isLoading: false,
        userName: '',
        success: false,
        token: localStorage.getItem('token') || null,
        favorites: [],
        activeTab: 'UserInfo' //default tab
    },
    mutations: {
        SET_LOADING(state, paylaod){
            state.isLoading = paylaod
        },
        AUTH_SUCCESS(state, {userName, token}){
            state.userName = userName
            state.success = true
            state.token = token
        },
        AUTH_ERROR( state, success ){
            state.success = success
        },
        REGISTER_SUCCESS(state, payload){
            state.success = payload
        },
        REGISTER_ERROR( state, paylaod ){
            state.success = paylaod
        },
        SET_FAVORITES(state, payload){
            state.favorites = payload
        },
        SET_TAB(state, payload){
            state.activeTab = payload
        }
    },
    actions: {
        login({commit}, {email, password}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.post('clients/login', {email, password})
                    .then(resp=>{
                        localStorage.setItem('token', resp.data.token)
                        commit('AUTH_SUCCESS', {userName: resp.data.name, token: resp.data.token})
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('AUTH_ERROR', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.post('clients', user)
                    .then(resp=>{
                        // commit('REGISTER_SUCCESS', {})
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('REGISTER_ERROR', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        getFavorites({commit}, userId){
            return new Promise((resolve, reject)=>{
                api.getOne('clients/favorites', userId)
                    .then(resp=>{
                        commit('SET_FAVORITES', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        reject(err)
                    })
            })
        },
        setTab({commit}, tab){
            commit('SET_TAB', tab)
        }
    },
    getters: {
      isLoggedIn: state => !!state.token,
    }
}
