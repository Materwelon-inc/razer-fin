import store from '../store/index';
import axios from 'axios';
import Firebase from 'firebase';
import { MambuConfig } from '@/configs/mambuconfig';
const userClaims = Firebase.firestore().collection('UserClaims');

export default {
  createClient() {
    let payload = {};

    return new Promise((resolve, reject) => {
      axios.post(MambuConfig.baseUrl + '/api/clients', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }
}
