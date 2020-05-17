<template>
  <div class="container" id="main-container">
    <div class="box">
      <section>
        <b-tabs>
            <b-tab-item label="Identification">
                <h1 class="title has-text-centered">Identification</h1>
                <p class="subtitle is-6 has-text-centered">Please key in your particulars</p>
                <section class="container">
                    <b-field grouped>
                        <b-field label="First Name"
                            :label-position="labelPosition"
                            type="text">
                            <b-input v-model="particularsForm.firstName" />
                        </b-field>
                        <b-field label="Last name"
                            :label-position="labelPosition"
                            type="text">
                            <b-input v-model="particularsForm.lastName" />
                        </b-field>
                    </b-field>
                    <b-field label="Email"
                        :label-position="labelPosition"
                        type="email">
                        <b-input v-model="particularsForm.email" />
                    </b-field>
                    <b-field label="Address" :label-position="labelPosition">
                        <b-input v-model="particularsForm.addr" />
                    </b-field>
                    <b-field grouped>
                        <b-field
                            label="Preferred language"
                            id="languagefield"
                            :label-position="labelPosition"
                            >
                            <b-select v-model="particularsForm.prefLang"
                                placeholder="Select a language">
                                <option value="English">English</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Malay">Malay</option>
                                <option value="Tamil">Tamil</option>
                            </b-select>
                        </b-field>
                    </b-field>
                </section>
                <b-field style="margin-top:2em">
                    <b-button type="is-success" @click="submitParticulars">Save</b-button>
                </b-field>
            </b-tab-item>
            <b-tab-item label="Upload">
                <h1 class="title has-text-centered">Upload your ID</h1>
                <hr />
                <p
                class="subtitle is-6 has-text-centered"
                >Please upload a coloured copy of both sides of ID card for verification.</p>
                <div class="tile is-ancestor" id="tile-margin">
                <div class="tile">
                    <div class="container">
                    <p class="subtitle is-6" id="imagesmustinclude">IMAGES MUST INCLUDE</p>
                    <img src="@/assets/frontic.jpg" />
                    <img src="@/assets/backic.jpg" />
                    </div>
                </div>
                <div class="tile">
                    <div class="container">
                    <div class="content">
                        <ul>
                        <li>Coloured photo</li>
                        <li>Full name</li>
                        <li>Date of birth</li>
                        <li>Valid expiration date</li>
                        <li>NRIC</li>
                        </ul>
                        <hr />
                        <p class="subtitle is-6">Front:</p>
                        <b-field class="file">
                        <input type="file" accept="image/*" @change="onFileChanged" />
                        <b-button type="is-success" outlined>Upload!</b-button>
                        <!-- <span class="file-name" v-if="frontIC">{{ frontIC.name }}</span> -->
                        </b-field>
                        <p class="subtitle is-6">Back:</p>
                        <b-field class="file">
                        <input type="file" accept="image/*" @change="onFileChanged" />
                        <b-button type="is-success" outlined>Upload!</b-button>
                        <!-- <span class="file-name" v-if="backIC">{{ backIC.name }}</span> -->
                        </b-field>
                    </div>
                    </div>
                </div>
                </div>
            </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<style scoped>
.box {
  box-shadow: 5px 5px #a8a8a8;
  border: 1px solid rgb(172, 172, 172);
}
#main-container {
  margin-top: 5%;
}

#tile-margin {
  margin-left: 25%;
  margin-right: 25%;
}
#imagesmustinclude {
  margin-top: 5%;
  margin-bottom: 2%;
  margin-left: 2%;
  font-weight: bold;
}
.content {
  margin-left: 20%;
  margin-top: 12%;
}
#particulars {
  margin: auto;
}
.buttons {
  margin-left: 35%;
}
</style>

<script>
import axios from 'axios';
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import UserClaim from '@/models/UserClaim';
import UserClaimService from '../../services/UserClaimService';

export default {
    computed: {
        ...mapGetters({
            user: 'user',
        }),
        liveUser() {
            if (this.user && this.user.data && this.user.data.email) {
                return firebase.auth().currentUser;
            }

            return null;
        },
    },
  methods: {
    onFileChanged(event) {
      // eslint-disable-next-line
      // this.selectedFile = event.target.files[0]
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
    submitParticulars() {
        // const incomingData = this.particularsForm;
        // Object.keys(incomingData).forEach((key) => {
        //     if (incomingData[key]) {
        //         console.dir(key);
        //     }
        // });
        const user = this.liveUser;
        const formData = this.particularsForm;
        if (user && user.uid) {
            if (formData.firstName) {
                UserClaimService.createUserClaim(new UserClaim(user.uid, 'first_name', formData.firstName))
                .then((res) => {
                    // Done
                })
                .catch((err) => {
                    console.dir(err);
                });
            }

            if (formData.lastName) {
                UserClaimService.createUserClaim(new UserClaim(user.uid, 'last_name', formData.lastName))
                .then((res) => {
                    // Done
                })
                .catch((err) => {
                    console.dir(err);
                });
            }

            if (formData.addr) {
                UserClaimService.createUserClaim(new UserClaim(user.uid, 'address', formData.address))
                .then((res) => {
                    // Done
                })
                .catch((err) => {
                    console.dir(err);
                });
            }

            if (formData.lastName) {
                UserClaimService.createUserClaim(new UserClaim(user.uid, 'last_name', formData.lastName))
                .then((res) => {
                    // Done
                })
                .catch((err) => {
                    console.dir(err);
                });
            }

            if (formData.prefLang) {
                UserClaimService.createUserClaim(new UserClaim(user.uid, 'preferred_language', formData.prefLang))
                .then((res) => {
                    // Done
                })
                .catch((err) => {
                    console.dir(err);
                });
            }
        }
    },
  },
  data() {
    return {
      labelPosition: 'on-border',
      particularsForm: {
        firstName: '',
        lastName: '',
        addr: '',
        prefLang: '',
        email: '',
      },
      activeTab: 0,
    };
  },
};
</script>
