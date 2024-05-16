// deps
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// plugins
import './plugins/VueMaterial'
import './plugins/OwlCarousel'
import './plugins/Stripe'
import './plugins/GoogleMaps'
import './plugins/VueResponsive'
import './plugins/Vuelidate'
import './plugins/VueNotify'
import './plugins/VueLazyLoad'
import './plugins/VueInputMask'
import './plugins/Firebase'
import './plugins/VueCookies'
import './plugins/VueClipboard'
import './plugins/SocketIO'
import './plugins/Skeleton'
import './plugins/Sentry'

// directives
import './directives'

// styles
import '../node_modules/animate.css/animate.min.css'
import './assets/scss/_light_theme.scss';

// helpers
import interceptorSetup from './helpers/interceptor'
import { getAuth } from "firebase/auth";

interceptorSetup()
Vue.prototype.$store = store
Vue.$cookies.config('1d')

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const isAuthenticated = getAuth().currentUser;
	next(requiresAuth && !isAuthenticated ? '/auth' : undefined)
});

Vue.config.productionTip = false

new Vue({
	sockets: {
		connect() {
			console.log("Socket connected!")
		}
	},
	router,
	store,
	render: h => h(App)
}).$mount('#app')
