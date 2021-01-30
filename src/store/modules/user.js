// store/modules/product.js
import * as api from '@/api/api'
import Vue from 'vue'
import firebase from 'firebase'
import router from '@/router'

const state = {
    isLoading: false,
    userName: '',
    success: true,
    token: localStorage.getItem('token') || null,
    activeTab: 'UserInfo', // UserInfo | UserHistory | UserCoupons
    errMessage: '',
    user: null
}

const mutations = {
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
    },
    LOGOUT_SUCCESS(state){
        state.user = {}
        state.userName = ''
        state.success = true
        state.token = null
    }
}

const actions = {
    checkIfOrigin(){
        if(Vue.$cookies.get('origin-url')){
            console.log(Vue.$cookies.get('origin-url'))
            router.push(Vue.$cookies.get('origin-url'))
            Vue.$cookies.remove('origin-url')
        }else{
            console.log("no hay origin URL")
        }
    },
    async googleLogin({commit, dispatch}){
        const provider = new firebase.auth.GoogleAuthProvider()
        try {
            const { additionalUserInfo, user } = await firebase.auth().signInWithPopup(provider)
            const newUser = {
                name: additionalUserInfo.profile.given_name,
                lastName: additionalUserInfo.profile.family_name,
                email: user.email,
                uid: user.uid
            }
            console.log(additionalUserInfo, user)
            const { data } = await api.post('clients/login/google', newUser, false)
            localStorage.setItem('token', data.token)
            commit('AUTH_SUCCESS', { userName: data.name, token: data.token})
            router.push({name: 'User'})
            dispatch('user/checkIfOrigin', null, {root:true})
        } catch (error) {
            commit('AUTH_ERROR', error.response)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async facebookLogin({commit, dispatch}){
        const provider = new firebase.auth.FacebookAuthProvider()
        try {
            const { additionalUserInfo, user } = await firebase.auth().signInWithPopup(provider)
            const newUser = {
                name: additionalUserInfo.profile.first_name,
                lastName: additionalUserInfo.profile.last_name,
                email: user.email,
                uid: user.uid
            }
            const { data } = await api.post('clients/login/google', newUser, false)
            localStorage.setItem('token', data.token)
            commit('AUTH_SUCCESS', { userName: data.name, token: data.token})
            router.push({name: 'User'})
            dispatch('user/checkIfOrigin', null, {root:true})
        } catch (error) {
            commit('AUTH_ERROR', error.response)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async login({commit, dispatch}, {email, password}){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.post('clients/login', {email, password})
            localStorage.setItem('token', data.token)
            commit('AUTH_SUCCESS', {userName: data.name, token: data.token})
            dispatch('user/checkIfOrigin', null, {root:true})
        } catch (error) {
            commit('AUTH_ERROR', error.response.data)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async register({commit}, user){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.post('clients', user)
            commit('REGISTER_SUCCESS', data)
        } catch (error) {
            commit('REGISTER_ERROR', error.response.data)
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async logout({commit}){
        try {
            commit('SET_LOADING', true)
            await api.getAll('clients/logout', true)
            localStorage.removeItem('token')
            commit('LOGOUT_SUCCESS')
            router.push({name: 'Auth'})
        } catch (error) {
            console.log("Sesion cerrada por seguridad a pesar de haber un error en el request.")
            localStorage.removeItem('token')
            commit('LOGOUT_SUCCESS')
            router.push({name: 'Auth'})
        } finally {
            commit('SET_LOADING', false)
        }
    },
    async updateInfo({commit, dispatch}, updatedInfo){
        try {
            commit('SET_LOADING', true)
            await api.patch('clients', null,  updatedInfo, true)
            Vue.notify({
                group: 'user',
                title: 'Información actualizada',
                text: 'Tu información ha sido correctamente actualizada',
                type: 'success'
            })
        } catch (error) {
            Vue.notify({
                group: 'user',
                title: 'Eror al actualizar información',
                text: 'Hubo un error al actualizar tu información, intenta más tarde',
                type: 'warn'
            })
        } finally {
            dispatch('user/getInfo', null, {root:true})
            commit('SET_LOADING', false)
        }
    },
    async getInfo({commit, dispatch}){
        try {
            commit('SET_LOADING', true)
            const { data } = await api.getAll('clients', true)
            commit('SET_USER_INFO', data)
            return data
        } catch (error) {
            dispatch('user/logout', null, {root:true})
        } finally {
            commit('SET_LOADING', false)
        }
    },
    setTab({commit}, tab){
        commit('SET_TAB', tab)
    }
}

const getters = {
    isLoggedIn: state => !!state.token,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
