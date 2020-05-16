import * as Firebase from 'firebase';
import 'firebase/firestore';
import store from './store';

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

Firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);
});

const db = Firebase.firestore();
// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);

export {
  db,
};
