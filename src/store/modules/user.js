// store/modules/product.js
import { getField } from 'vuex-map-fields';

const state = {
    isLoading: false,
    userName: '',
    success: true,
    token: localStorage.getItem('token') || null,
    activeTab: 'UserInfo', // UserInfo | UserHistory | UserCoupons
    errMessage: '',
    user: null,
    emailSentStatus: null
}

const mutations = {}

const actions = {
    async googleLogin(){
        // const provider = new firebase.auth.GoogleAuthProvider()
        // try {
        //     const { additionalUserInfo, user } = await firebase.auth().signInWithPopup(provider)
        //     const newUser = {
        //         name: additionalUserInfo.profile.given_name,
        //         lastName: additionalUserInfo.profile.family_name,
        //         email: user.email,
        //         uid: user.uid
        //     }
        //     const { data } = await api.post('clients/login/google', newUser, false)
        //     localStorage.setItem('token', data.token)
        //     commit('AUTH_SUCCESS', { userName: data.name, token: data.token})
        //     router.push({name: 'User'})
        //     dispatch('user/checkIfOrigin', null, {root:true})
        // } catch (error) {
        //     this._vm.$sentry.captureException(error)
        //     commit('AUTH_ERROR', error.response)
        // } finally {
        //     commit('SET_LOADING', false)
        // }
    },
    async login(){
        // try {
        //     commit('SET_LOADING', true)
        //     const { data } = await api.post('clients/login', {email, password})
        //     localStorage.setItem('token', data.token)
        //     commit('AUTH_SUCCESS', {userName: data.name, token: data.token})
        //     dispatch('user/checkIfOrigin', null, {root:true})
        // } catch (error) {
        //     this._vm.$sentry.captureException(error)
        //     commit('AUTH_ERROR', error.response.data)
        // } finally {
        //     commit('SET_LOADING', false)
        // }
    },
    async register(){
        // try {
        //     commit('SET_LOADING', true)
        //     const { data } = await api.post('clients', user)
        //     commit('REGISTER_SUCCESS', data)
        // } catch (error) {
        //     this._vm.$sentry.captureException(error)
        //     commit('REGISTER_ERROR', error.response.data)
        // } finally {
        //     commit('SET_LOADING', false)
        // }
    },
    async logout(){
        // try {
        //     commit('SET_LOADING', true)
        //     await api.getAll('clients/logout', true)
        //     localStorage.removeItem('token')
        //     commit('LOGOUT_SUCCESS')
        //     router.push({name: 'Auth'})
        // } catch (error) {
        //     this._vm.$sentry.captureException(error)
        //     localStorage.removeItem('token')
        //     commit('LOGOUT_SUCCESS')
        //     router.push({name: 'Auth'})
        // } finally {
        //     commit('SET_LOADING', false)
        // }
    },
    async updateInfo(){
        // try {
        //     commit('SET_LOADING', true)
        //     await api.patch('clients', null,  updatedInfo, true)
        //     Vue.notify({
        //         group: 'user',
        //         title: 'Información actualizada',
        //         text: 'Tu información ha sido correctamente actualizada',
        //         type: 'success'
        //     })
        // } catch (error) {
        //     this._vm.$sentry.captureException(error)
        //     Vue.notify({
        //         group: 'user',
        //         title: 'Eror al actualizar información',
        //         text: 'Hubo un error al actualizar tu información, intenta más tarde',
        //         type: 'warn'
        //     })
        // } finally {
        //     dispatch('user/getInfo', null, {root:true})
        //     commit('SET_LOADING', false)
        // }
    },
    async getInfo(){
        // try {
        //     commit('SET_LOADING', true)
        //     const { data } = await api.getAll('clients', true)
        //     commit('SET_USER_INFO', data)
        //     return data
        // } catch (error) {
        //     this._vm.$sentry.captureException(error)
        //     dispatch('user/logout', null, {root:true})
        // } finally {
        //     commit('SET_LOADING', false)
        // }
    },
    async sendEmail(){
        // commit('SET_LOADING', true)
        // try {
        //    await api.post('clients/contact', emailData)
        //    commit('EMAIL_SENT_CORRECTLY', true)
        // } catch (error) {
        //     this._vm.$sentry.captureException(error)
        //    commit('EMAIL_SENT_ERROR', false)
        // } finally {
        //     commit('SET_LOADING', false)
        // }
    },
    setTab({commit}, tab){
        commit('SET_TAB', tab)
    }
}

const getters = {
    getField,
    isLoggedIn: state => !!state.token,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
