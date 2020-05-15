import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';
import Home from '../views/dashboard/Index.vue';
import Register from '../views/auth/Register.vue';

Vue.use(VueRouter);

function guardRoute(to: any, from: any, next: any) {
  if (to.name !== 'Login' && !store.state.user.loggedIn) next({ name: 'Login' });
  else next();
}

const routes: Array<RouteConfig> = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: guardRoute,
    // route level code-splitting
    // this generates a separate chunk (logout.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "logout" */ '../views/auth/Logout.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter: guardRoute,
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
