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

const auth = Firebase.auth();
const db = Firebase.firestore();

export {
  db,
  auth,
};
