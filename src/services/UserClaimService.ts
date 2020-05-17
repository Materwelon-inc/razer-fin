import axios from 'axios';
import Firebase from 'firebase';
import UserClaim from '@/models/UserClaim';
import store from '../store/index';

const userClaims = Firebase.firestore().collection('UserClaims');

export default {
  getClaim(key: string) {
    return new Promise((resolve, reject) => {
      const user = store.getters.user(store.state);
      if (!user) reject();

      userClaims
        .where('userid', '==', true)
        .where('claimtype', '==', key).get()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  createUserClaim(userClaim: UserClaim) {
    return new Promise((resolve, reject) => {
      userClaims.add({ ...userClaim })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
