<template>
  <div class="container">
    <div class="row">
      <form class="tile is-ancestor">
        <div class="tile is-vertical is-3"></div>
        <div class="tile is-vertical is-6" style="padding-left: 3.5em; padding-right: 3.5em;">
          <div class="card">
            <div class="card-content">
              <b-message type="is-danger" v-if="error">
                {{ error }}
              </b-message>

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

              <b-field>
                <b-checkbox v-model="form.rememberMe">Remember me</b-checkbox>
              </b-field>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <b-button :loading="isSubmitting" type="is-primary" expanded
                          v-on:click="submit">Submit</b-button>
              </p>
            </footer>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
  import firebase from 'firebase';

  export default {
    data() {
      return {
        isSubmitting: false,
        form: {
          name: '',
          email: '',
          password: '',
          rememberMe: false,
        },
        error: null,
      };
    },
    methods: {
      submit() {
        this.isSubmitting = true;
        this.error = null;
        console.dir(this.form.email);

        firebase.auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then((data) => {
            data.user
              .updateProfile({
                displayName: this.form.name,
              })
              .then(() => {
                console.log('');
                this.isSubmitting = false;
              });
          })
          .catch((err) => {
            this.error = err.message;
            this.isSubmitting = false;
          });
      },
    },
  };
</script>
