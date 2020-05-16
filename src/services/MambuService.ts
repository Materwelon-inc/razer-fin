import store from '../store/index';
import axios from 'axios';
import Firebase from 'firebase';
import { MambuConfig } from '@/configs/mambuconfig';
import UserClaimService from './UserClaimService';
const userClaims = Firebase.firestore().collection('UserClaims');

export default {
  createClient() {
    // Obtain the user
    let user = store.getters.user(store.state);
    if (!user) return false; // Reject completely

    // Initial configuration first
    let payload = {
      client: {
        firstName: user.first_name,
        lastName: user.last_name,
        preferredLanguage: "ENGLISH",
        notes: 'Enjoys playing RPG',
        assignedBranchKey: MambuConfig.branchKey,
      },
      addresses: [], // Let's blank this off for now
      idDocuments: [] as any, // https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript wtf!!!
      customInformation: [] as any, // https://stackoverflow.com/questions/52423842/what-is-not-assignable-to-parameter-of-type-never-error-in-typescript wtf!!!
    };

    // Obtain the ID Documents dynamically
    if (MambuConfig.documentProperties && MambuConfig.documentProperties.length > 0) {
      for (let i = 0; i < MambuConfig.documentProperties.length; i++) {
        UserClaimService.getClaim(MambuConfig.documentProperties[i])
        .then((res: any) => {
          if (res && res.claimvalue && res.claimtype && res.claimtype == MambuConfig.documentProperties[i]) {
            payload.idDocuments.push(JSON.parse(res.claimvalue));
          }
        })
        .catch((err) => {
          console.dir(err);
        });
      }
    }

    // Obtain the custom information dynamically
    if (MambuConfig.customInformationProperties && MambuConfig.customInformationProperties.length > 0) {
      for (let i = 0; i < MambuConfig.customInformationProperties.length; i++) {
        UserClaimService.getClaim(MambuConfig.customInformationProperties[i])
        .then((res: any) => {
          if (res && res.claimvalue && res.claimtype && res.claimtype == MambuConfig.customInformationProperties[i]) {
            payload.customInformation.push({
              customFieldID: MambuConfig.customInformationProperties[i],
              value: res.claimvalue,
            });
          }
        })
        .catch((err) => {
          console.dir(err);
        });
      }
    }

    return new Promise((resolve, reject) => {
      axios.post(MambuConfig.baseUrl + '/api/clients', payload, {
        auth: {
          username: MambuConfig.username,
          password: MambuConfig.password,
        },
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
  },
  createCurrentAccount() {
    return new Promise((resolve, reject) => {
      axios.post(MambuConfig.baseUrl + 'api/', null, {
        auth: {
          username: MambuConfig.username,
          password: MambuConfig.password,
        },
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
    })
  }
}
