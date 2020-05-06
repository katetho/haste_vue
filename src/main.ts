import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import Notifications from "vue-notification";
import dotenv from "dotenv";
import i18n from "./i18n";

dotenv.config();
Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
