import axios from 'axios';
import Firebase from 'firebase';
import UserClaim from '@/models/UserClaim';
import store from '../store/index';

const userClaims = Firebase.firestore().collection('UserClaims');

export default {
  getClaim(key: string) {
    return new Promise((resolve, reject) => {
      const user = Firebase.auth().currentUser;
      if (!user || !user.uid) reject();

      userClaims
        .where('userid', '==', user!.uid)
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
      this.getClaim(userClaim.claimtype)
      .then((res: any) => {
        if (res && !res.empty) {
          reject();
        } else {
          userClaims.add({ ...userClaim })
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
};
