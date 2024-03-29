import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const requireModule = require.context('./modules', false, /\.js$/) //extract js files inside modules folder
const modules = {}

requireModule.keys().forEach((fileName) => {
	if (fileName === './index.js') return //reject the index.js file
	const moduleName = fileName.replace(/(\.\/|\.js)/g, '') //
	modules[moduleName] = requireModule(fileName).default
})

export default new Vuex.Store({
	modules,
})
