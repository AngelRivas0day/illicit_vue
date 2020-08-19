/* eslint-disable */
import * as api from '@/api/products'

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

export default {
    namespaced: true,
    state: {
        glass: {},
        designs: [],
        isLoading: false,
        success: null,
        start: 0,
        end: 10,
        glasses: []
    },
    mutations: {
        SET_LOADING(state, payload){
            state.isLoading = payload
        },
        SET_GLASS(state, payload) {
            state.success = true
            state.glass = payload
            state.designs = payload.designs
        },
        SET_ERROR(state, payload){
            state.success = payload
        },
        SET_GLASSES(state, payload) {
            state.success = true
            state.start = payload.length - 1
            state.end = payload.length + 10
            state.glasses = [...payload]
        }
    },
    actions: {
        getGlass({commit}, id){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getGlass(id)
                    .then(resp=>{
                        commit('SET_GLASS', resp.data)
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
        getGlasses({commit, state}){
            return new Promise((resolve, reject)=>{
                commit('SET_LOADING', true)
                api.getGlasses(state.start, state.end)
                    .then(resp=>{
                        console.log(resp.data)
                        let glasses = resp.data
                        glasses.forEach(item => {
                            item['slug'] = slugfy(item.name)
                        })
                        commit('SET_GLASSES', glasses)
                        resolve()
                    })
                    .catch(err=>{
                        reject(err)
                    })
                    .finally(()=>{
                        commit('SET_LOADING', false)
                    })
            })
        }
    }
  }
