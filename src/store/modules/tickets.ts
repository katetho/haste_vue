import axios from "axios";
import { GetterTree } from "vuex";
import { State } from "../../types/types";
const transport = axios.create({
  withCredentials: true
});

export const state: State = {
  authenticated: false,
  tickets: [],
  ticketFilter: "",
  statusFilter: "active"
};

const actions = {
  register(context, data) {
    return new Promise((resolve, reject) => {
      transport
        .post(process.env.VUE_APP_SERVER_ADDRESS + "/users/register", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  unathenticate(context) {
    return new Promise((resolve, reject) => {
      transport
        .post(process.env.VUE_APP_SERVER_ADDRESS + "/users/signout/")
        .then((res) => {
          context.commit("unathenticate");
          resolve(res);
        })
        .catch((err) => {
          context.commit("unathenticate");
          reject(err);
        });
    });
  },
  authenticate(context, creds) {
    return new Promise((resolve, reject) => {
      transport
        .post(process.env.VUE_APP_SERVER_ADDRESS + "/users/signin", creds)
        .then((res) => {
          context.commit("setAuthentication");
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  async fetchData(context) {
    const res = await transport.get(
      process.env.VUE_APP_SERVER_ADDRESS +
        "/" +
        context.state.ticketFilter +
        "?status=" +
        context.state.statusFilter
    );
    context.commit("setData", res.data);
    console.log(res.data);
  },
  addTicket(context, data) {
    return new Promise((resolve, reject) => {
      transport
        .post(process.env.VUE_APP_SERVER_ADDRESS + "/tickets", data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  setTicketType(context, ticketType) {
    context.commit("setTicketFilter", ticketType);
  },
  setStatusFilter(context, ticketStatus) {
    context.commit("setStatusFilter", ticketStatus);
  },
  setTicketTaken(contex, id) {
    return new Promise((resolve, reject) => {
      transport
      .patch(process.env.VUE_APP_SERVER_ADDRESS + "/tickets/"+id)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
    })
  }
};

const mutations = {
  setData(state: State, payload) {
    state.tickets = payload;
  },
  setAuthentication: (state: State) => (state.authenticated = true),
  unathenticate: (state: State) => (state.authenticated = false),
  setTicketFilter: (state: State, payload) => (state.ticketFilter = payload),
  setStatusFilter: (state: State, payload) => (state.statusFilter = payload)
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
};
