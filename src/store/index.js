import Vue from 'vue'
import Vuex from 'vuex'

// Importar oauth
// import background from './modules/background'
// import product from './modules/product'
// import loading from './modules/loading'
// import user from './modules/user'
// import banners from './modules/banners'
// import addresses from './modules/addresses'
// import favorites from './modules/favorites'
// import maps from './modules/maps'
// import order from './modules/order'
// import orders from './modules/orders'
// import brands from './modules/brands'
// import events from './modules/events'

Vue.use(Vuex)

const requireModule = require.context("./modules", false, /\.js$/); //extract js files inside modules folder
const modules = {};

requireModule.keys().forEach(fileName => {
  if (fileName === "./index.js") return; //reject the index.js file
  const moduleName = fileName.replace(/(\.\/|\.js)/g, ""); //
  modules[moduleName] = requireModule(fileName).default;
});


export default new Vuex.Store({
  // Aquuí registramos todos los módulos
  modules
  // modules: {
  //   background,
  //   product,
  //   loading,
  //   user,
  //   banners,
  //   addresses,
  //   favorites,
  //   maps,
  //   order,
  //   orders,
  //   brands,
  //   events
  // }
})
