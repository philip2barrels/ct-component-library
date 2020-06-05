<template>
  <b-container fluid id="app">
    <navigation />
    <b-container fluid id="container">
      <b-container id="sidebar" fluid>
        <sidebar />
      </b-container>
      <b-container fluid><router-view :manifest="manifest"/></b-container>
    </b-container>
  </b-container>
</template>

<script>
import Navigation from '@/views/Navigation.vue';
import Sidebar from '@/views/Sidebar.vue';
import {BContainer} from 'bootstrap-vue';
export default {
  name: 'App',
  components: {Navigation, BContainer, Sidebar},
  methods: {
    load: async function() {
      const response = await fetch('/components-manifest.json');
      return await response.json();
    },
  },
  mounted: async function() {
    this.manifest = await this.load();
  },
  data: () => {
    return {
      manifest: null,
    };
  },
};
</script>

<style lang="scss">
#app {
  position: absolute;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#container {
  display: flex;
}

#sidebar {
  max-width: 100px;
  min-height: 100%;
  padding: 0;
  ul {
    margin-top: 0.25em;
  }
}
</style>
