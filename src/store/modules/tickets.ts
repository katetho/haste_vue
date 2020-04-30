import axios from "axios";

const state = {
  tickets: ['Hello']
};

const actions = {
  async fetchTickets({ commit }) {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log(res.data);
    commit("setDate", res.data);
  }
};

const mutations = {
  setDate(state, payload) {
    state.tickets = payload
  },
};

const getters = {
  allTickets: (state: any) => state.tickets
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
