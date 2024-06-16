import * as api from '@/services/api'

const state = {
	loading: false,
	faqs: [],
	error: null,
}

const mutations = {
	SET_LOADING(state, loading) {
		state.loading = loading
		if (!loading) state.error = null
	},
	SET_ERROR(state, error) {
		state.loading = false
		state.error = error
	},
	SET_FAQS(state, payload) {
		state.faqs = payload
		state.error = null
	},
}

const actions = {
	async getFaqs({ commit }) {
		commit('SET_LOADING', true)
		try {
			const { data } = await api.Get({
				endpoint: 'faq',
				useToken: false,
			})
			commit('SET_FAQS', data)
		} catch (error) {
			commit('SET_ERROR', error)
		} finally {
			commit('SET_LOADING', false)
		}
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
