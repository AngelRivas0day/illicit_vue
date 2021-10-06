import * as api from '@/api/api'

const state = {
	offers: [],
	offer: null,
	loading: false,
	error: null,
}
const mutations = {
	TOGGLE_LOADING(state) {
		state.loading = !state.loading
	},
	SET_OFFERS(state, payload) {
		state.offers = payload
		state.error = null
	},
	SET_OFFER(state, payload) {
		state.offer = payload
		state.error = null
	},
	SET_ERROR(state, payload) {
		state.error = payload
		state.loading = false
	},
}
const actions = {
	async getPromotions({ commit }) {
		commit('TOGGLE_LOADING')
		try {
			let { data } = await api.Get({
				endpoint: 'offers/active',
				useToken: false,
			})
			commit('SET_OFFERS', data)
		} catch (error) {
			commit('SET_ERROR', error)
		} finally {
			commit('TOGGLE_LOADING')
		}
	},
	async getPromotion({ commit }, id) {
		commit('TOGGLE_LOADING')
		try {
			let { data } = await api.Get({
				endpoint: `offers/${id}`,
				useToken: false,
			})
			commit('SET_OFFER', data)
		} catch (error) {
			commit('SET_ERROR', error)
		} finally {
			commit('TOGGLE_LOADING')
		}
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
