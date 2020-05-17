<template>
  <section class="hero is-medium">
    <div class="hero-body">
      <h2>Logging you out, hang on..</h2>
    </div>
  </section>
</template>


<script>
import Firebase from 'firebase';
import { mapState } from 'vuex';

export default {
  name: 'Logout',
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
  beforeMount() {
    if (!this.user) this.$router.replace({ name: 'home' });
  },
  mounted() {
    Firebase.auth().signOut()
      .then(() => {
        this.$router.replace({
          name: 'home',
        });
      });
  },
};
</script>
