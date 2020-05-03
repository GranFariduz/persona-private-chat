import Vue from "vue";
import io from "socket.io-client";

import router from "./router";
import store from "./store";

// entry point
import App from "./App.vue";

import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// instance variables
Vue.prototype.$socket = io("http://localhost:2000");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
