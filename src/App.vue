<template>
  <div id="app">
    <b-nav vertical class="w-25">
      <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
      <b-nav-item><router-link to="/components/button">Button</router-link></b-nav-item>
    </b-nav>
    <router-view/>
  </div>
</template>

<script>

  import { BNav, BNavItem } from 'bootstrap-vue'

  export default {
    name: 'App',
    components: {
      BNav,
      BNavItem
    }
  }

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


</style>
