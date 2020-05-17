import axios from 'axios';
import Firebase from 'firebase';
import { MambuConfig } from '@/configs/mambuconfig';
import store from '../store/index';
import UserClaimService from './UserClaimService';
import UserService from './UserService';

const userClaims = Firebase.firestore().collection('UserClaims');

export default {
  createClient() {
    // Obtain the user
    const user = store.getters.user(store.state);
    if (!user) return false; // Reject completely

    // Initial configuration first
    const payload = {
      client: {
        firstName: user.first_name,
        lastName: user.last_name,
        preferredLanguage: 'ENGLISH',
        notes: '',
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
      axios.post(`${MambuConfig.baseUrl}/api/clients`, payload, {
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
        });
    });
  },
  getClient(userid: string) {
    return new Promise((resolve, reject) => {
      // Obtain the user first
      const user = store.getters.user(store.state);
      if (!user || !user.uid) reject('Please login again.');

      // Obtain the mambu client id for this user
      let mambuClientId = '';
      UserClaimService.getClaim(MambuConfig.MambuClientIdClaimKey)
        .then((res: any) => {
          if (res && res.value) {
            mambuClientId = res.value;
          }
        })
        .catch((err) => {
          reject(err);
        });

      if (!mambuClientId || mambuClientId === '') {
        reject('Please setup your KYC to qualify for Mambu first.');
      }

      axios.get(`${MambuConfig.baseUrl}api/clients/${mambuClientId}?fullDetails=true`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  createCurrentAccount(productType: string) {
    return new Promise((resolve, reject) => {
      // Obtain the user first
      const user = store.getters.user(store.state);
      if (!user || !user.uid) reject();

      // Make sure he/she has initialised as a mambu client
      let clientDetail: any;
      this.getClient(user.uid)
        .then((res: any) => {
          clientDetail = res;
        })
        .catch((err) => {
          reject(err);
        });

      if (!clientDetail || clientDetail == {} || !clientDetail.client || !clientDetail.client.id) {
        reject('Invalid client credentials relating to Mambu.');
      }

      // Then setup the payload
      const payload = {
        savingsAccount: {
          name: 'Digital Account',
          accountHolderType: 'CLIENT',
          accountHolderKey: clientDetail.client.id,
          accountState: 'APPROVED',
          productTypeKey: productType,
          currencyCode: 'SGD',
          allowOverdraft: 'true',
          overdraftLimit: '100',
          overdraftInterestSettings: {
            interestRate: 5,
          },
          interestSettings: {
            interestRate: '1.25',
          },
        },
      };

      axios.post(`${MambuConfig.baseUrl}api/`, payload, {
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
        });
    });
  },
};
