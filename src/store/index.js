import Vue from 'vue'
import Vuex from 'vuex'

// Importar oauth
import background from './modules/background'
import product from './modules/product'
import loading from './modules/loading'
import user from './modules/user'
import banners from './modules/banners'
import addresses from './modules/addresses'
import favorites from './modules/favorites'

Vue.use(Vuex)

export default new Vuex.Store({
  // Aquuí registramos todos los módulos
  modules: {
    background,
    product,
    loading,
    user,
    banners,
    addresses,
    favorites
  }
})
