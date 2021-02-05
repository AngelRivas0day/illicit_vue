import * as api from "@/api/api";
import { getField, updateField } from "vuex-map-fields";
import router from "@/router";

function toFormData(formValue) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
        const value = formValue[key];
        if (value != null) {
            formData.append(key, value);
        }
    }
    return formData;
}

const state = {
    lenseSpecs: {
        name: "",
        price: "",
        design: "",
        lenseMaterial: "",
        mountMaterial: "",
        antireflective: "",
        photochromatic: "",
        graduation: null,
    },
    addressId: null,
    orderStatus: "PENDING",
    paymentMethod: null,
    isLoading: false,
    isError: false,
    isOrderOk: false,
    errorMessage: null,
    paymentStatus: null,
    discountCode: null
}

const mutations = {
    updateField,
    SET_ERROR(state, { isError, errorMessage }) {
        state.isError = isError;
        state.errorMessage = errorMessage;
    },
    SET_LOADING(state, payload) {
        state.isLoading = payload;
    },
    ORDER_SUCCESS(state, payload) {
        state.isOrderOk = payload;
    },
    PAYMENT_SUCCESS(state, payload) {
        state.paymentStatus = payload;
    },
    SET_DISCOUNT_CODE(state, payload){
        if(payload == null){
            state.discountCode = null
        }else{
            console.log("payload: ", payload)
            state.discountCode['source'] = payload.source
            state.discountCode['value'] = payload.value
        }
    },
    RESET_INFO(state) {
        state.lenseSpecs = {
            name: "",
            price: "",
            design: "",
            lenseMaterial: "",
            mountMaterial: "",
            antireflective: "",
            photochromatic: "",
            graduation: null,
        };
        state.addressId = "";
        state.orderStatus = "PENDING";
        state.paymentMethod = null;
        state.isLoading = false;
        state.isError = false;
        state.isOrderOk = false;
        state.errorMessage = null;
    }
}

const actions = {
    async createPayment({ commit, dispatch }, { stripeToken, total }) {
        try {
            commit("SET_LOADING", true);
            const { data } = await api.post("orders/charge", { stripeToken, total }, true)
            commit("PAYMENT_SUCCESS", data.chargeStatus);
            dispatch("order/createOrder", null, { root: true });
        } catch (error) {
            commit("SET_ERROR", {
                isError: true,
                errorMessage: error.response.data.error,
            });
            router.push({ name: "PaymentError" });
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async createOrder({ commit, state }) {
        var reducible = [
            state.lenseSpecs,
            { addressId: state.addressId },
            { paymentStatus: state.paymentStatus || "PENDING" },
        ];
        const orderObject = Object.assign({}, ...reducible);
        try {
            commit("SET_LOADING", true)
            await api.post("orders", toFormData(orderObject), true)
            commit("ORDER_SUCCESS", true)
            // commit("RESET_INFO")
            // router.push({ name: "PaymentSuccess" })
        } catch (error) {
            commit("ORDER_SUCCESS", false);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    resetInfo({ commit }) {
        commit("RESET_INFO");
    },
    async checkForDiscountCode({commit}, code){
        console.log("code: ", code)
        commit('SET_LOADING', true)
        try {
            let {data} = await api.get(`promo-codes/check/${code}`)
            console.log("Check code: ", data)
            commit('SET_DISCOUNT_CODE', data)
        } catch (error) {
            commit('SET_DISCOUNT_CODE', null)
        } finally {
            commit('SET_LOADING', false) 
        }
    }
}

const getters = {
    getField
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
