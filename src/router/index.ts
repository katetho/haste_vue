import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Tickets from "../components/Tickets.vue";
import Register from "../components/Register.vue";
import Signin from "../components/Signin.vue";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import AddTicket from "../components/AddTicket.vue";
import Missing from "../views/404.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresVisitor: true
    },
    children: [
      {
        path: "signin",
        name: "signin",
        component: Signin,
        meta: {
          requiresVisitor: true
        }
      },
      {
        path: "register",
        component: Register,
        meta: {
          requiresVisitor: true
        }
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
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "add",
        component: AddTicket
      },
      {
        path: "/",
        name: "listTickets",
        component: Tickets
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: "signin"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: "listTickets"
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
