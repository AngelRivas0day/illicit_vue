import * as api from '@/services/api'

const state = {
	error: null,
	loading: false,
	categories: [],
	category: null,
}
const mutations = {
	SET_ERROR(state, payload) {
		state.error = payload
	},
	SET_CATEGORIES(state, payload) {
		state.error = null
		state.categories = payload
	},
	TOGGLE_LOADING(state) {
		state.loading = !state.loading
	},
	SET_CATEGORY(state, payload) {
		state.error = null
		state.category = payload
	},
}
const actions = {
	async getCategories({ commit }) {
		commit('TOGGLE_LOADING')
		try {
			let { data } = await api.Get({
				endpoint: 'categories',
				useToken: false,
			})
			console.log('data: ', data)
			commit('SET_CATEGORIES', data)
		} catch (error) {
			commit('SET_ERROR', error)
		} finally {
			commit('TOGGLE_LOADING')
		}
	},
	async getCategory({ commit }, categoryId) {
		commit('TOGGLE_LOADING')
		try {
			let { data } = await api.Get({
				endpoint: `categories/${categoryId}`,
				useToken: false,
			})
			commit('SET_CATEGORY', data)
		} catch (error) {
			commit('SET_ERROR', error)
			this._vm.$notify({
				verticalAlign: 'top',
				horizontalAlign: 'right',
				message: 'Ha habido un error. Inténtalo más tarde.',
				type: 'warning',
			})
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
