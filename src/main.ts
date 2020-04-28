import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import Notifications from 'vue-notification';
import dotenv from 'dotenv';

dotenv.config()
Vue.config.productionTip = false;
Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");