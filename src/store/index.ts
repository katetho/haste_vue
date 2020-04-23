import Vue from "vue";
import Vuex from "vuex";
import { state, getters } from "./modules/tickets";
import ticketState from "./modules/tickets";
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  modules: {
    ticketState
  }
});
