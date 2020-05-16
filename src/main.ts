import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faArrowLeft, faArrowRight, faChevronLeft, faChevronRight, faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import * as fb from './firebaseCore';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.component('vue-fontawesome', FontAwesomeIcon);
library.add(faArrowLeft, faArrowRight, faChevronLeft, faChevronRight, faUserSecret);

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
