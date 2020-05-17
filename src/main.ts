import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import * as fb from './firebaseCore';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

Vue.config.productionTip = false;

fb.auth.onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
