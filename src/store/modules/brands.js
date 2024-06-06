import * as api from "@/services/api";

const state = {
    brands: [],
    error: null,
    isLoading: false,
};

const mutations = {
    SET_BRANDS(state, payload) {
        state.brands = payload;
    },
    SET_ERROR(state, payload) {
        state.error = payload;
    },
    TOGGLE_LOADING(state) {
        state.isLoading = !state.isLoading;
    },
};

const actions = {
    async getBrands({ commit }) {
        commit("TOGGLE_LOADING");
        try {
            const { data } = await api.getAll("brands", false);
            commit("SET_BRANDS", data);
        } catch (error) {
            this._vm.$sentry.captureException(error);
            commit("SET_ERROR", error);
        } finally {
            commit("TOGGLE_LOADING");
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
