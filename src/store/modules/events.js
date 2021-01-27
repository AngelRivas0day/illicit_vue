// import * as api from '@/api/api'

const state = {
    event: null
}

const mutations = {
    SET_EVENT(state, payload){
        state.event = payload
    }
}

const actions = {
    async getCurrentEvent({commit}){
        commit('SET_EVENT', {title: 'lmao'})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}