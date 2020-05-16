<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <form class="tile is-ancestor">
        <div class="tile is-vertical is-4"></div>
        <div class="tile is-vertical is-4" style="padding-left: 2.5em; padding-right: 2.5em;">
          <div class="card">
            <div class="card-content">
              <b-message type="is-success" v-if="success">
                {{ success }} <b><router-link to="/login">Click here to sign in</router-link></b>
              </b-message>
              <b-message type="is-danger" v-if="error">
                {{ error }}
              </b-message>

              <img alt="Razer logo" src="../../assets/razer.png">
              <b-field label="Name">
                <b-input v-model="form.name" placeholder="Your name" required />
              </b-field>

              <b-field label="Email">
                <b-input type="email" v-model="form.email" placeholder="Your email" required />
              </b-field>

              <b-field label="Password">
                <b-input type="password" v-model="form.password" password-reveal
                         placeholder="Your password" required />
              </b-field>
          <input type="file" accept="image/*" @change="onFileChanged">
          <b-button @click="onUpload" type="is-success" outlined>Upload!</b-button>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <b-button :loading="isSubmitting" type="is-success" expanded
                          v-on:click="submit">Register</b-button>
              </p>
            </footer>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase';
import { mapState } from 'vuex';

import axios from 'axios';

export default {
  name: 'Register',
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        name: '',
        email: '',
        password: '',
      },
      success: null,
      error: null,
      selectedFile: null,
    };
  },
  beforeMount() {
    if (this.user.loggedIn) this.$router.replace({ name: 'Dashboard' });
  },
  methods: {
    submit() {
      this.isSubmitting = true;
      this.error = null;
      firebase.auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {
              this.success = 'Account successfully created!';
              this.isSubmitting = false;
              window.setTimeout(function () {
                this.$router.replace({ name: 'Login' });
              }, 4000);
            });
        })
        .catch((err) => {
          this.error = err.message;
          this.isSubmitting = false;
        });
    },
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
  onUpload() {
    // upload file, get it from this.selectedFile
    console.log(this.selectedFile);
    const formData = new FormData();
    formData.append('myFile', this.selectedFile, this.selectedFile.name);
    axios.post('https://niw1itg937.execute-api.ap-southeast-1.amazonaws.com/Prod/verify', formData)
      .then((res) => {
        console.log(res);
      });
  },
  },
};
</script>
