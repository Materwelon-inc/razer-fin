<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <form class="tile is-ancestor">
        <div class="tile is-vertical is-4"></div>
        <div class="tile is-vertical is-4" style="padding-left: 2.5em; padding-right: 2.5em;">
          <div class="card">
            <div class="card-content">
              <b-message type="is-success" v-if="success">
                {{ success }}
              </b-message>
              <b-message type="is-danger" v-if="error">
                {{ error }}
              </b-message>

              <img alt="Razer logo" src="../../assets/razer.png">

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
                          v-on:click="submit">Login</b-button>
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

export default {
  name: 'Login',
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        email: '',
        password: '',
        rememberMe: false,
      },
      success: null,
      error: null,
    };
  },
  beforeMount() {
    if (this.user.loggedIn) this.$router.replace({ name: 'Dashboard' });
  },
  methods: {
    submit() {
      this.isSubmitting = true;
      this.error = null;

      firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          this.$router.replace({ name: 'Dashboard' });
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
};
</script>
