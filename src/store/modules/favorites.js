/* eslint-disable */
import * as api from '@/api/api'
import Vue from 'vue'

function slugfy(string){
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

const state = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    isLoading: false,
    success: false
}

const mutations = {
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
}

const actions = {
    async getFavorites({commit, rootGetters}){
        if(rootGetters['user/isLoggedIn']){
            try {
                commit('SET_LOADING', true)
                const { data } = await api.getAll('clients/favorites', true)
                let favorites = data
                favorites.forEach(fav => {
                    fav['slug'] = slugfy(fav.name)
                })
                commit('SET_FAVORITES', favorites)
            } catch (error) {
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)            
            }
        }
    },
    async addFavorite({commit, dispatch, rootGetters}, { id, name }){
        if(rootGetters['user/isLoggedIn']){
            try {
                commit('SET_LOADING', true)
                const { data } = await api.post('clients/favorites', { id, name }, true)
                Vue.notify({
                    group: 'user',
                    title: 'Agregado a favoritos',
                    text: 'Elemento agregar a favoritos, podrás acceder a el rápidamente.',
                    type: 'success'
                });
                commit('SET_FAVORITES', data)
            } catch (error) {
                Vue.notify({
                    group: 'user',
                    title: 'Error al agregar',
                    text: 'Hubo un error al eliminar agregar el elemento, intenta más tarde',
                    type: 'warn'
                });
                commit('SET_ERROR', false)
            } finally {
                commit('SET_LOADING', false)
                dispatch('favorites/getFavorites', null, {root:true})        
            }
        }else{ // is not logged in 
            if(localStorage.getItem('favorites')){
                let favs = JSON.parse(localStorage.getItem('favorites'))
                favs.push({ id, name, slug: slugfy(name) })
                localStorage.setItem('favorites', JSON.stringify(favs))
            }else{
                localStorage.setItem('favorites', JSON.stringify([{ id, name, slug: slugfy(name) }]))
            }
            commit('SET_FAVORITES', JSON.parse(localStorage.getItem('favorites')))
            Vue.notify({
                group: 'user',
                title: 'Agregado a favoritos',
                text: 'Elemento agregar a favoritos, podrás acceder a el rápidamente.',
                type: 'success'
            });
        }
    },
    async deleteFavorite({commit, dispatch, rootGetters}, id){
        if(rootGetters['user/isLoggedIn']){
            try {
                commit('SET_LOADING', true)
                await api.delete_('clients/favorites', id, true)
            } catch (error) {
                commit('SET_ERROR', false)
                Vue.notify({
                    group: 'user',
                    title: 'Error al eliminar',
                    text: 'Hubo un error al eliminar el elemento, intenta más tarde',
                    type: 'warn'
                });
            } finally {
                commit('SET_LOADING', false)
                dispatch('favorites/getFavorites', null, {root:true})
            }
        }else{ // is not logged in
            let favs = JSON.parse(localStorage.getItem('favorites'))
            let index = favs.findIndex(x => x.id === id);
            if(index > -1){
                favs.splice(index, 1)
            }
            localStorage.setItem('favorites', JSON.stringify(favs))
            commit('SET_FAVORITES', JSON.parse(localStorage.getItem('favorites')))
            Vue.notify({
                group: 'user',
                title: 'Eliminado de favoritos',
                text: 'Elemento eliminado, podrás agregarlo de nuevo cuando desees.',
                type: 'success'
            });
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}