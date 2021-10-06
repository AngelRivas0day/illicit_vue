import * as api from '@/api/api'
import { getField, updateField } from 'vuex-map-fields'
import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		addresses: [],
		address: {},
		success: false,
		isLoading: false,
		showDialog: false, // for editing
	},
	mutations: {
		updateField,
		SET_ADDRESSES(state, payload) {
			state.addresses = payload
			state.success = true
		},
		SET_LOADING(state, payload) {
			state.isLoading = payload
		},
		SET_ERROR(state, payload) {
			state.success = payload
		},
	},
	getters: {
		getField,
	},
	actions: {
		async getAddresses({ commit }) {
			try {
				commit('SET_LOADING', true)
				const response = await api.getAll('clients/addresses', true)
				commit('SET_ADDRESSES', response.data)
			} catch (error) {
				this._vm.$sentry.captureException(error)
				commit('SET_ERROR', true)
			} finally {
				commit('SET_LOADING', false)
			}
		},
		async createAddress({ commit, state }, newAddress) {
			try {
				commit('SET_LOADING', true)
				await api.post('clients/addresses', newAddress, true)
				Vue.notify({
					group: 'user',
					title: 'Dirección guardada',
					text: 'Ahora podrás utilizarla de forma rápida en tus compras',
					type: 'success',
				})
			} catch (error) {
				this._vm.$sentry.captureException(error)
				Vue.notify({
					group: 'user',
					title: 'Error al guardar',
					text: 'Hubo un error al guardar la dirección, intenta más tarde',
					type: 'warn',
				})
			} finally {
				state.showDialog = false
				commit('SET_LOADING', false)
			}
		},
		async deleteAddress({ commit, dispatch }, addressId) {
			try {
				commit('SET_LOADING', true)
				await api.delete_('clients/addresses', addressId, true)
				Vue.notify({
					group: 'user',
					title: 'Dirección eliminada',
					text: 'La dirección fue correctamente eliminada de tu cuenta',
					type: 'success',
				})
			} catch (error) {
				this._vm.$sentry.captureException(error)
				Vue.notify({
					group: 'user',
					title: 'Error al eliminar dirección',
					text: 'Hubo un error al eliminar la dirección, intenta más tarde',
					type: 'warn',
				})
			} finally {
				dispatch('addresses/getAddresses', null, { root: true })
				commit('SET_LOADING', false)
			}
		},
	},
}
