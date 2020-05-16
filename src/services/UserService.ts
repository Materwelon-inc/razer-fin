import store from '../store/index';
import axios from 'axios';
import Firebase from 'firebase';
const users = Firebase.firestore().collection('users');

export default {
  createUser(user: User) {
    return new Promise((resolve, reject) => {
      users.add(user)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
    }
  }
}
