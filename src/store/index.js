import Vue from 'vue'
import Vuex from 'vuex'

// Importar oauth
import background from './modules/background'

Vue.use(Vuex)

export default new Vuex.Store({
  // Aquuí registramos todos los módulos
  modules: {
    background
  }
})
