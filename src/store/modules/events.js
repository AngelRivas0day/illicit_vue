import * as api from '@/api/api'

const state = {
	event: null,
	eventOffers: [],
	eventProducts: [],
	isActive: false,
	loading: false,
	error: null,
}

const mutations = {
	SET_EVENT(state, payload) {
		state.event = payload
	},
	SET_OFFERS(state, payload) {
		state.eventOffers = payload
	},
	SET_PRODUCTS(state, payload) {
		state.eventProducts = payload
	},
	TOGGLE_LOADING(state) {
		state.loading = !state.loading
	},
	SET_ERROR(state, payload) {
		state.error = payload
	},
	SET_ACTIVE_EVENT(state, payload) {
		state.isActive = payload
	},
}

const actions = {
	async getCurrentEvent({ commit }) {
		commit('TOGGLE_LOADING')
		try {
			let { data } = await api.Get({
				endpoint: 'events/active',
				useToken: false,
			})
			if (data.length == 0) {
				commit('SET_ACTIVE_EVENT', false)
			} else {
				commit('SET_EVENT', data[0])
				commit('SET_ACTIVE_EVENT', true)
			}
		} catch (error) {
			this._vm.$sentry.captureException(error)
			commit('SET_ERROR', error)
		} finally {
			commit('TOGGLE_LOADING')
		}
	},
	async getEvenOffers({ commit }, eventId) {
		try {
			let { data } = await api.Get({
				endpoint: `events/${eventId}/offers/active`,
				useToken: false,
			})
			commit('SET_OFFERS', data)
		} catch (error) {
			this._vm.$sentry.captureException(error)
			commit('SET_ERROR', error)
		}
	},
	async getProducts({ commit }, productsId) {
		commit('TOGGLE_LOADING')
		try {
			let products = []
			await Promise.all(
				productsId.map(async (id) => {
					let { data } = await api.Get({
						endpoint: `glasses/${id}`,
						useToken: false,
					})
					products.push(data)
				})
			)
			commit('SET_PRODUCTS', products)
		} catch (error) {
			this._vm.$sentry.captureException(error)
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
