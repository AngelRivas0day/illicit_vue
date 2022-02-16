import axios from 'axios'
import store from '@/store'

export default function setup() {
	axios.interceptors.request.use(
		function (config) {
			// console.log('Interceptors: ', config)
			return config
		},
		function (err) {
			store.dispatch('user/logout', null, { root: true })
			return Promise.reject(err)
		}
	)
}
