import store from '../store/index';
import axios from 'axios';
import Firebase from 'firebase';
import { MambuConfig } from '@/configs/mambuconfig';
const userClaims = Firebase.firestore().collection('UserClaims');

export default {
  createClient() {
  //   {
  //     "customInformation": [
  //         {
  //             "encodedKey": "8a8e87b772175ada01721cf412e0293f",
  //             "parentKey": "8a8e87b772175ada01721cf412e0293d",
  //             "customFieldKey": "8a8e878e71c7a4d70171c968da100b1d",
  //             "customField": {
  //                 "encodedKey": "8a8e878e71c7a4d70171c968da100b1d",
  //                 "id": "countryOfBirth",
  //                 "creationDate": "2020-04-30T04:47:04+0000",
  //                 "lastModifiedDate": "2020-04-30T05:39:08+0000",
  //                 "name": "Country of Birth",
  //                 "type": "CLIENT_INFO",
  //                 "dataType": "STRING",
  //                 "valueLength": "SHORT",
  //                 "isDefault": false,
  //                 "isRequired": false,
  //                 "description": "",
  //                 "customFieldSet": {
  //                     "encodedKey": "8a8e878e71c7a4d70171c866758d09e2",
  //                     "id": "_customerFields",
  //                     "name": "Customer Fields",
  //                     "notes": "",
  //                     "createdDate": "2020-04-30T00:04:50+0000",
  //                     "lastModifiedDate": "2020-04-30T00:04:50+0000",
  //                     "indexInList": 3,
  //                     "type": "CLIENT_INFO",
  //                     "usage": "SINGLE"
  //                 },
  //                 "indexInList": 5,
  //                 "state": "NORMAL",
  //                 "customFieldSelectionOptions": [],
  //                 "viewRights": {
  //                     "encodedKey": "8a8e878e71c7a4d70171c968da100b1e",
  //                     "isAccessibleByAllUsers": true,
  //                     "roles": []
  //                 },
  //                 "editRights": {
  //                     "encodedKey": "8a8e878e71c7a4d70171c968da100b1f",
  //                     "isAccessibleByAllUsers": true,
  //                     "roles": []
  //                 },
  //                 "unique": false,
  //                 "values": [],
  //                 "amounts": {}
  //             },
  //             "value": "Singapore",
  //             "indexInList": 0,
  //             "customFieldID": "countryOfBirth",
  //             "customFieldSetGroupIndex": -1
  //         },
  //         {
  //             "encodedKey": "8a8e87b772175ada01721cfbcac12940",
  //             "parentKey": "8a8e87b772175ada01721cf412e0293d",
  //             "customFieldKey": "8a8e867271bd280c0171bf981b2b1bd6",
  //             "customField": {
  //                 "encodedKey": "8a8e867271bd280c0171bf981b2b1bd6",
  //                 "id": "razerID",
  //                 "creationDate": "2020-04-28T07:03:28+0000",
  //                 "lastModifiedDate": "2020-04-28T07:03:28+0000",
  //                 "name": "RazerID",
  //                 "type": "CLIENT_INFO",
  //                 "dataType": "STRING",
  //                 "valueLength": "SHORT",
  //                 "isDefault": false,
  //                 "isRequired": false,
  //                 "description": "",
  //                 "customFieldSet": {
  //                     "encodedKey": "8a8e867271bd280c0171bf981b2b1bd5",
  //                     "id": "_razerAccount",
  //                     "name": "RazerAccount",
  //                     "notes": "",
  //                     "createdDate": "2020-04-28T07:02:28+0000",
  //                     "lastModifiedDate": "2020-04-28T07:02:28+0000",
  //                     "indexInList": 2,
  //                     "type": "CLIENT_INFO",
  //                     "usage": "SINGLE"
  //                 },
  //                 "indexInList": 0,
  //                 "state": "NORMAL",
  //                 "customFieldSelectionOptions": [],
  //                 "viewRights": {
  //                     "encodedKey": "8a8e867271bd280c0171bf981b2b1bd7",
  //                     "isAccessibleByAllUsers": true,
  //                     "roles": []
  //                 },
  //                 "editRights": {
  //                     "encodedKey": "8a8e867271bd280c0171bf981b2b1bd8",
  //                     "isAccessibleByAllUsers": true,
  //                     "roles": []
  //                 },
  //                 "unique": true,
  //                 "values": [],
  //                 "amounts": {}
  //             },
  //             "value": "baabb1a7-9982-4008-a103-50ec40f268b8",
  //             "indexInList": 1,
  //             "customFieldID": "razerID",
  //             "customFieldSetGroupIndex": -1
  //         }
  //     ],
  //     "idDocuments": [
  //         {
  //             "encodedKey": "8a8e87b772175ada01721cf412e0293e",
  //             "clientKey": "8a8e87b772175ada01721cf412e0293d",
  //             "documentType": "NRIC/Passport Number",
  //             "documentId": "S9812345A",
  //             "issuingAuthority": "Immigration Authority of Singapore",
  //             "validUntil": "2021-09-12T00:00:00+0000",
  //             "indexInList": 0,
  //             "identificationDocumentTemplateKey": "8a8e867271bd280c0171bf7e4ec71b01"
  //         }
  //     ]
  // }
    let payload = {
      client: {
        "encodedKey": "8a8e87b772175ada01721cf412e0293d",
        "state": "INACTIVE",
        "id": "256021469",
        "creationDate": "2020-05-16T10:16:02+0000",
        "lastModifiedDate": "2020-05-16T10:16:02+0000",
        "approvedDate": "2020-05-16T10:16:02+0000",
        "firstName": "Celeste",
        "lastName": "Goh",
        "notes": "Enjoys playing RPG",
        assignedBranchKey: MambuConfig.branchKey,
        loanCycle: 0,
        groupLoanCycle: 0,
        preferredLanguage: "ENGLISH",
        clientRole: {
          "encodedKey": "8a8e87c87162c2aa01717bd703ed14e9"
        },
      },
    };

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
