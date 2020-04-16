import axios from "axios";

const state = {
  tickets: []
};

const actions = {
  async fetchTickets({ commit }) {
    const res = await axios.get("http://localhost:3002");
    console.log(res.data);
    commit("setTickets", res.data);
  }
};

const mutations = {
  setTickets: (state: any, tickets: any) => (state.tickets = tickets)
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
