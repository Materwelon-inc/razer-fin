<template>
  <div id="app">
    <b-navbar type="is-success" id="nav">
      <template slot="brand">
        <figure class="image is-48x48" id="razerlogo">
          <img
            src="@/assets/razer.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </figure>
      </template>
      <template slot="start">
          <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
              Home
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/login' }">
              Login
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/logout' }">
              Logout
          </b-navbar-item>
      </template>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {

  a {
    font-weight: bold;
    color: #000000;

    &.router-link-exact-active {
      color: #000000;
    }
  }
}

#razerlogo {
  margin-left: 10px;
}
</style>
