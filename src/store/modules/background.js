const state = {
	whiteIcons: false
}

const mutations = {
	SET_WHITE_ICONS(state, payload) {
		state.whiteIcons = payload
	}
}

const actions = {
	setWhiteIcons({commit}) {
		commit('SET_WHITE_ICONS', true)
	},
	unsetWhiteIcons({commit}) {
		commit('SET_WHITE_ICONS', false)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
