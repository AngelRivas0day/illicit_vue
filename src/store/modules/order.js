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
        antireflective: "",
        photochromatic: "",
        graduation_type: "",
        graduation_image: null,
        extra: ""
    },
    basePrice: null,
    addressId: null,
    orderStatus: "PENDING",
    paymentMethod: null,
    isLoading: false,
    isError: false,
    isOrderOk: false,
    errorMessage: null,
    paymentStatus: null,
    discountCode: null,
    // price mods
    lenseMaterialCurrentPrice: 0,
    graduationCurrentPrice: 0,
    extrasCurrentPrice: 0,
    // checkout session
    session_id: null
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
        console.log("payload: ", payload)
        state.discountCode['source'] = payload.source
        state.discountCode['value'] = payload.value
    },
    SET_SESSION_ID(state, id){
        state.session_id = id
    },
    ERROR_SET_ID(state){
        state.session_id = null
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
            graduation_type: "",
            graduation_image: null,
            extra: ""
        };
        state.addressId = "";
        state.orderStatus = "PENDING";
        state.paymentMethod = null;
        state.isLoading = false;
        state.isError = false;
        state.isOrderOk = false;
        state.errorMessage = null;
        state.lenseMaterialCurrentPrice = 0;
        state.graduationCurrentPrice = 0;
        state.extrasCurrentPrice = 0;
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
    async createSession({commit},payload){
        commit('SET_LOADING', true)
        try {
            let {data}  = await api.Post('orders/create-session', payload, true, true)
            commit('SET_SESSION_ID', data.sessionId)
        } catch (error) {
            commit('ERROR_SET_ID')
        }
    },
    async confirmPayment({commit}, orderId){
        commit('SET_LOADING', true)
        try {
            await api.patch('orders/confirm-order',orderId, {}, true)
        } catch (error) {
            console.log("Error while confirming the payment: ", error)
        } finally {
            commit('SET_LOADING', false) 
        }
    },
    async cancelPayment({commit}, orderId){
       commit('SET_LOADING', true)
       try {
           await api.patch('orders/cancel-order',orderId, {}, true)
       } catch (error) {
           console.log("Error while cancelling the payment: ", error)
       } finally {
           commit('SET_LOADING', false) 
       } 
    },
    resetInfo({ commit }) {
        commit("RESET_INFO")
    },
    async checkForDiscountCode({commit}, code){
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
