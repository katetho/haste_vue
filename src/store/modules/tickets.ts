import axios from "axios";
import { GetterTree } from 'vuex'
import { State } from "../../types/types";

export const state: State = {
  authenticated: true,
  tickets: []
};

const actions = {
  retrieveToken(context, creds) {
  return new Promise((resolve, reject)=>{
  axios.post("http://localhost:3002/users/signin", creds)
  .then(res=>resolve(res))
  .catch(err=>reject(err))
    })
  },
  async fetchData({ commit }) {
    const res = await axios.get("http://localhost:3002");
    commit("setData", res.data);
  }
};

const mutations = {
  setData(state, payload) {
    state.tickets = payload
  },
  setAuthentication: (state: any, status: any) => (state.authenticated = status)
};

export const getters: GetterTree<State, any> = {
  allTickets: (state: any) => state.tickets
};

import { Component, Prop, Vue } from "vue-property-decorator";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
