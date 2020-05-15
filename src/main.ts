import Vue from 'vue';
import * as Firebase from 'firebase';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(Buefy);

const firebaseAuthConfig = {
  apiKey: 'AIzaSyCsrkNXtyQl22GqAqeTGV82lb1-r74CTKM',
  authDomain: 'chromabank-e4682.firebaseapp.com',
  databaseURL: 'https://chromabank-e4682.firebaseio.com/',
  projectId: 'chromabank-e4682',
  storageBucket: '',
  messagingSenderId: '',
  appId: '1:282436972133:web:a06d88c7e47e7d32b2208c',
};

Firebase.initializeApp(firebaseAuthConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
