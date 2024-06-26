import Vue from "vue";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

const socket = io(process.env.VUE_APP_API_URL);

Vue.use(VueSocketIOExt, socket);
