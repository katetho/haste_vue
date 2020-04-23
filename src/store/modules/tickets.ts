import axios from "axios";
import { GetterTree } from 'vuex'
import { State } from "../../types/types";

export const state: State = {
  authenticated: false,
  tickets: []
};

const actions = {
  unathenticate(context) {
      return new Promise((resolve, reject)=>{
        axios.post("http://localhost:3002/users/signout")
        .then(res=>{
          context.commit('unathenticate')
          console.log(res)
          resolve(res);
        })
        .catch(err=>{
          context.commit('unathenticate')
          reject(err)
        })
          })
  },
  authenticate(context, creds) {
  return new Promise((resolve, reject)=>{
  axios.post("http://localhost:3002/users/signin", creds)
  .then(res=>{
    context.commit("setAuthentication");
    resolve(res)})
  .catch(err=>reject(err))
    })
  },
  async fetchData({ commit }) {
    const res = await axios.get("http://localhost:3002");
    commit("setData", res.data);
  }
};

const mutations = {
  setData(state: State, payload) {
    state.tickets = payload
  },
  setAuthentication: (state: State) => (state.authenticated = true),
  unathenticate: (state: State) => (state.authenticated = false)
};

export const getters: GetterTree<State, any> = {
  loggedIn: (state: State) => state.authenticated,
  allTickets: (state: State) => state.tickets
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
