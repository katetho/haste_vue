import axios from "axios";
import { GetterTree } from "vuex";
import { State } from "../../types/types";
const transport = axios.create({
  withCredentials: true
});

export const state: State = {
  authenticated: localStorage.authenticated,
  tickets: [],
  ticketFilter: "",
  statusFilter: "active",
  userID: localStorage.userID
};

const actions = {
  register(context, data) {
    return new Promise((resolve, reject) => {
      transport
        .post(process.env.VUE_APP_SERVER_ADDRESS + "/users/register", data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  unathenticate(context) {
    return new Promise((resolve, reject) => {
      transport
        .get(process.env.VUE_APP_SERVER_ADDRESS + "/users/signout/")
        .then(res => {
          context.commit("setAuthentication", false);
          localStorage.authenticated = false;
          context.commit("setTicketFilter", "");
          context.commit("setStatusFilter", "active");
          context.commit("setUser", null);
          localStorage.userID = null;
          resolve(res);
        })
        .catch(err => {
          context.commit("setAuthentication", false);
          reject(err);
        });
    });
  },
  authenticate(context, creds) {
    return new Promise((resolve, reject) => {
      transport
        .post(process.env.VUE_APP_SERVER_ADDRESS + "/users/signin", creds)
        .then(res => {
          context.commit("setUser", res.data.id);
          localStorage.userID = res.data.id;
          context.commit("setAuthentication", true);
          localStorage.authenticated = true;
          resolve(res);
        })
        .catch(err => reject(err));
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
  },
  addTicket(context, data) {
    return new Promise((resolve, reject) => {
      transport
        .post(process.env.VUE_APP_SERVER_ADDRESS + "/tickets", data)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
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
        .patch(process.env.VUE_APP_SERVER_ADDRESS + "/tickets/" + id)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  },
  setTicketClosed(contex, id) {
    return new Promise((resolve, reject) => {
      transport
        .patch(process.env.VUE_APP_SERVER_ADDRESS + "/tickets/close", id)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  },
  getSignin(context) {
    return new Promise((resolve, reject) => {
      transport
        .get(process.env.VUE_APP_SERVER_ADDRESS + "/users/signin")
        .then(res => {
          
          if (Number(res.data)) {
            resolve(true);
          }
          else {
            resolve(false)
          }
        })
        .catch(err => reject(err));
    });
  }
};

const mutations = {
  setData(state: State, payload) {
    state.tickets = payload;
  },
  setAuthentication: (state: State, payload) => (state.authenticated = payload),
  setTicketFilter: (state: State, payload) => (state.ticketFilter = payload),
  setStatusFilter: (state: State, payload) => (state.statusFilter = payload),
  setUser: (state: State, payload) => (state.userID = payload)
};

export const getters: GetterTree<State, any> = {
  loggedIn: (state: State) => state.authenticated,
  allTickets: (state: State) => state.tickets,
  getUser: (state: State) => state.userID,
  getByTitle: (state, symbols) => (symbols) => {
    if (symbols) {
      return state.tickets.filter((el:any) => {
       return el.title.includes(symbols);
     });
    }
   }
 };

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
