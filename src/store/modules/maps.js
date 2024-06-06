import * as api from "@/services/api";

const state = {
    pins: [],
    error: null,
    isLoading: false,
};

const mutations = {
    SET_PINS(state, payload) {
        state.pins = payload;
        state.success = true;
    },
    SET_LOADING(state, payload) {
        state.isLoading = payload;
    },
    SET_ERROR(state, payload) {
        state.error = payload;
    },
};

const actions = {
    async getPins({ commit }) {
        try {
            commit("SET_LOADING", true);
            const { data } = await api.getAll("locations");
            commit("SET_PINS", data);
        } catch (error) {
            this._vm.$sentry.captureException(error);
            commit("SET_ERROR", error.response);
        } finally {
            commit("SET_LOADING", false);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
