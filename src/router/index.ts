import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Tickets from "../components/Tickets.vue";
import Register from "../components/Register.vue";
import Signin from "../components/Signin.vue";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import AddTicket from "../components/AddTicket.vue";
import Missing from "../views/404.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/users",
    name: "Users",
    component: Users,
    children: [
      {
        path: "signin",
        component: Signin
      },
      {
        path: "register",
        component: Register
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: Missing
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "add",
        component: AddTicket
      },
      {
        path: "/",
        component: Tickets
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
