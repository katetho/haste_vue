import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import AddTicket from "../components/AddTicket.vue";
import Missing from "../views/404.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
 {
    path: "/about/:id",
    name: "About",
    component: About
  },
  {
    path: "/add",
    name: "Add a Ticket",
    component: AddTicket
  },
  {
    path: "*",
    name: "404",
    component: Missing
  },
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  routes
});

export default router;
