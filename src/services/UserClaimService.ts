import store from '../store/index';
import axios from 'axios';
import Firebase from 'firebase';
const userClaims = Firebase.firestore().collection('UserClaims');

export default {
  createUserClaim(userClaim: UserClaim) {
    return new Promise((resolve, reject) => {
      userClaims.add(userClaim)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
    })
  },
};
