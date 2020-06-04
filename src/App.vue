<template>
  <b-container fluid id="app">
    <navigation />
    <router-view />
  </b-container>
</template>

<script>
import Navigation from "@/views/Navigation.vue";
import { BContainer } from "bootstrap-vue";
export default {
  name: "App",
  components: { Navigation, BContainer }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
