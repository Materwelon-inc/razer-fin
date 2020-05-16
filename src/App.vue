<template>
  <div id="app">
    <div class="navbar is-success" id="nav">
      <div class="navbar-brand">
        <figure class="image is-48x48" id="razerlogo">
          <img
            src="@/assets/razer.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </figure>
        <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
            Home
        </b-navbar-item>
      </div>
      <template>
        <div class="navbar-menu">
          <div class="navbar-end">
            <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
              <a
                class="navbar-item"
                slot="trigger"
                role="button">
                <img class="is-rounded"
                  src="@/assets/profiledefault.png"
                  alt="default icon"
                >
                <b-icon icon="menu-down"></b-icon>
              </a>
              <b-dropdown-item custom aria-role="menuitem">
                  Logged as <b>Kayton</b>
              </b-dropdown-item>
              <hr class="dropdown-divider">
              <b-dropdown-item aria-role="menuitem" >
                <b-navbar-item tag="router-link" :to="{ path: '/kyc' }">
                  Verify Account
                </b-navbar-item>
              </b-dropdown-item>
              <b-dropdown-item value="logout" aria-role="menuitem">
                <b-navbar-item tag="router-link" :to="{ path: '/logout' }">
                  Logout
                </b-navbar-item>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </template>
    </div>
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

.center-items {
  display: flex;
  align-items: center;
}
</style>
