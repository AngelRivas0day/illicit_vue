const state = {
    isLoading: false,
};

const mutations = {
    SET_LOADING(state, payload) {
        state.isLoading = payload;
    }
};

const actions = {
    isLoading({ commit }) {
        commit("SET_LOADING", true);
    },
    notLoading({ commit }) {
        commit("SET_LOADING", false);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
