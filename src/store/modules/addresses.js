import * as api from '@/api/api'
import { getField, updateField } from 'vuex-map-fields';
import Vue from 'vue'

export default{
    namespaced: true,
    state: {
        addresses: [],
        address: {},
        success: false,
        isLoading: false,
        showDialog: false // for editing
    },
    mutations: {
        updateField,
        SET_ADDRESSES(state, payload){
            state.addresses = payload
            state.success = true
        },
        SET_LOADING(state, payload){
            state.isLoading = payload
        },
        SET_ERROR(state, payload){
            state.success = payload
        }
    },
    getters: {
        getField
    },
    actions: {
        getAddresses({commit}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getAll('clients/addresses', true)
                    .then(resp=>{
                        console.log(resp.data)
                        commit('SET_ADDRESSES', resp.data)
                        resolve(resp)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', true)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        getAddress({commit}, addressId){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getOne('clients/addresses', addressId)
                    .then(resp=>{
                        resolve(resp)
                    })
                    .catch(err=>{
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        createAddress({commit, state}, newAddress){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.post('clients/addresses', newAddress, true)
                    .then(resp=>{
                        Vue.notify({
                            group: 'user',
                            title: 'Dirección guardada',
                            text: 'Ahora podrás utilizarla de forma rápida en tus compras',
                            type: 'success'
                        });
                        resolve(resp)
                    })
                    .catch(err=>{
                        Vue.notify({
                            group: 'user',
                            title: 'Error al guardar',
                            text: 'Hubo un error al guardar la dirección, intenta más tarde',
                            type: 'warn'
                        });
                        reject(err)
                    })
                    .finally(()=>{
                        state.showDialog = false
                        commit('SET_LOADING', false)
                    })
            })
        },
        updateAddress({commit}, updatedAddress){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.patch('clients/addresses', updatedAddress)
                    .then(resp=>{
                        resolve(resp)
                    })
                    .catch(err=>{
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        deleteAddress({commit, dispatch}, addressId){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.delete_('clients/addresses', addressId, true)
                    .then(resp=>{
                        Vue.notify({
                            group: 'user',
                            title: 'Dirección eliminada',
                            text: 'La dirección fue correctamente eliminada de tu cuenta',
                            type: 'success'
                        });
                        resolve(resp)
                    })
                    .catch(err=>{
                        Vue.notify({
                            group: 'user',
                            title: 'Error al eliminar dirección',
                            text: 'Hubo un error al eliminar la dirección, intenta más tarde',
                            type: 'warn'
                        });
                        reject(err)
                    })
                    .finally(()=>{
                        dispatch('addresses/getAddresses', null, {root:true})
                        commit('SET_LOADING', false)
                    })
            })
        }
    }
}