// store/modules/product.js
import * as api from '@/api/api'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        isLoading: false,
        userName: '',
        success: true,
        token: localStorage.getItem('token') || null,
        activeTab: 'UserInfo', //default tab
        errMessage: ''
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
        AUTH_ERROR( state, errorMessage ){
            state.success = false
            state.errMessage = errorMessage
        },
        REGISTER_SUCCESS(state, payload){
            state.success = payload
        },
        REGISTER_ERROR( state, errorMessage ){
            state.success = false
            state.errMessage = errorMessage
        },
        SET_FAVORITES(state, payload){
            state.favorites = payload
        },
        SET_TAB(state, payload){
            state.activeTab = payload
        },
        SET_USER_INFO(state, payload){
            state.user = payload
        }
    },
    actions: {
        login({commit}, {email, password}){
            console.log('login vuex', email, password)
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.post('clients/login', {email, password})
                    .then(resp=>{
                        localStorage.setItem('token', resp.data.token)
                        commit('AUTH_SUCCESS', {userName: resp.data.name, token: resp.data.token})
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('AUTH_ERROR', err.response.data)
                        reject(err.response.data)
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
                        commit('REGISTER_SUCCESS', resp.data)
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('REGISTER_ERROR', err.response.data)
                        reject(err.response.data)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        updateInfo({commit, dispatch}, updatedInfo){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.patch('clients', updatedInfo, true)
                    .then(resp=>{
                        Vue.notify({
                            group: 'user',
                            title: 'Información actualizada',
                            text: 'Tu información ha sido correctamente actualizada',
                            type: 'success'
                        })
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        Vue.notify({
                            group: 'user',
                            title: 'Eror al actualizar información',
                            text: 'Hubo un error al actualizar tu información, intenta más tarde',
                            type: 'warn'
                        })
                        reject(err.response.data)
                    })
                    .finally(()=>{
                        dispatch('user/getInfo', null, {root:true})
                        commit('SET_LOADING', false)
                    })
            })
        },
        getInfo({commit}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getAll('clients', true)
                    .then(resp=>{
                        commit('SET_USER_INFO', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
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
