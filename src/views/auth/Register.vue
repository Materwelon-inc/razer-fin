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
  </section>
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
        },
        success: null,
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
                this.success = 'Account successfully created!';
                this.isSubmitting = false;
                window.setTimeout(function () {
                  this.$router.push({ path: 'login' });
                }, 4000);
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
