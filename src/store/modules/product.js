/* eslint-disable */
import { getField, updateField } from "vuex-map-fields";

const pagination = 10;

const state = {
  glass: {},
  designs: [],
  isLoading: false,
  success: null,
  glasses: [],
  error: null,
  filters: {
    query: null,
    start: null,
    end: pagination,
    category: null,
    max: null,
    min: null,
    lensMaterial: null,
    frameMaterial: null,
    brand: null,
  },
};

const mutations = {
  updateField,
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_GLASS(state, payload) {
    state.success = true;
    state.glass = payload;
    state.designs = payload.designs;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  SET_GLASSES(state, payload) {
    state.success = true;
    state.filters.start = payload.length;
    state.filters.end = payload.length + pagination;
    state.glasses = [...payload];
  },
  CLEAR_FILTERS(state) {
    state.filters = {
      query: null,
      start: state.filters.start,
      end: state.filters.end,
      category: null,
      max: null,
      min: null,
      lenseMaterial: null,
      frameMaterial: null,
      brand: null,
    };
  },
  CLEAR_DATA(state) {
    state.glass = {};
    state.designs = [];
    state.success = null;
    state.error = null;
  },
};

const actions = {
  async getGlass({ commit }, id) {
    try {
      commit("SET_LOADING", true);
      const { data } = null;
      commit("SET_GLASS", data);
    } catch (error) {
      this._vm.$sentry.captureException(error);
      commit("SET_ERROR", error.response);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async getGlasses({ commit, state }) {
    try {
      commit("SET_LOADING", true);
      const { data } = null;
      commit("SET_GLASSES", data);
    } catch (error) {
      this._vm.$sentry.captureException(error);
      commit("SET_ERROR", error.response);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async clearFilters({ commit, dispatch }) {
    commit("CLEAR_FILTERS");
    await dispatch("product/getGlasses", null, { root: true });
  },
  clearData({ commit }) {
    commit("CLEAR_DATA");
  },
};

const getters = {
  getField,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
