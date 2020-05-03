import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    showAlert: false,
    alertMessage: "",
    sendToId: "",
  },
  getters: {
    getUsername: (state) => state.username,
    getAlert: (state) => ({
      show: state.showAlert,
      message: state.alertMessage,
    }),
    getSendToId: (state) => state.sendToId,
  },
  mutations: {
    setUsername: (state, val) => (state.username = val.trim()),
    setAlert: (state, { show, message }) => {
      state.showAlert = show;
      state.alertMessage = message;
    },
    setSendToId: (state, val) => (state.sendToId = val),
  },
  actions: {
    setUsername: (context, val) => context.commit("setUsername", val),
    setAlert: (context, val) => context.commit("setAlert", val),
    setSendToId: (context, val) => context.commit("setSendToId", val),
  },
});
