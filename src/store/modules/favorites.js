import * as api from '@/api/api'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        favorites: [],
        isLoading: false,
        success: false
    },
    mutations: {
        SET_FAVORITES(state, payload){
            state.favorites = payload
            state.success = true
        },
        SET_FAVORITE(state, payload){
            state.favorites = [...payload]
            state.success = true
        },
        SET_LOADING(state, payload){
            state.isLoading = payload
        },
        SET_ERROR(state, payload){
            state.success = payload
        }
    },
    actions: {
        getFavorites({commit}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getAll('clients/favorites', true)
                    .then(resp=>{
                        commit('SET_FAVORITES', resp.data)
                        resolve(resp.data)
                    })
                    .catch(err=>{
                        commit('SET_ERROR', false)
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        },
        addFavorite({commit, dispatch}, { id, name }){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.post('clients/favorites', { id, name }, true)
                .then(resp=>{
                    commit('SET_FAVORITES', resp.data)
                    Vue.notify({
                        group: 'user',
                        title: 'Agregado a favoritos',
                        text: 'Elemento agregar a favoritos, podrás acceder a el rápidamente.',
                        type: 'success'
                    });
                    resolve(resp.data)
                })
                .catch(err=>{
                    commit('SET_ERROR', false)
                    Vue.notify({
                        group: 'user',
                        title: 'Error al agregar',
                        text: 'Hubo un error al eliminar agregar el elemento, intenta más tarde',
                        type: 'warn'
                    });
                    reject(err)
                })
                .finally(()=>{
                    commit('SET_LOADING', false)
                    dispatch('favorites/getFavorites', null, {root:true})
                })
            })
        },
        deleteFavorite({commit, dispatch}, { id, name }){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.post('clients/favorites/remove', { id, name }, true)
                .then(resp=>{
                    commit('SET_FAVORITES', resp.data)
                    Vue.notify({
                        group: 'user',
                        title: 'Eliminado de favoritos',
                        text: 'Elemento eliminado, podrás agregarlo de nuevo cuando desees.',
                        type: 'success'
                    });
                    resolve(resp.data)
                })
                .catch(err=>{
                    commit('SET_ERROR', false)
                    Vue.notify({
                        group: 'user',
                        title: 'Error al eliminar',
                        text: 'Hubo un error al eliminar el elemento, intenta más tarde',
                        type: 'warn'
                    });
                    reject(err)
                })
                .finally(()=>{
                    commit('SET_LOADING', false)
                    dispatch('favorites/getFavorites', null, {root:true})
                })
            })
        }
    }
}