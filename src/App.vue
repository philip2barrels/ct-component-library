<template>
  <b-container fluid id="app">
    <navigation id="nav" />
    <b-container fluid id="container">
      <b-container id="sidebar" fluid class="bg-darkgray">
        <sidebar />
      </b-container>
      <b-container fluid id="router-view"
        ><router-view :manifest="manifest"
      /></b-container>
    </b-container>
  </b-container>
</template>

<script>
import Navigation from '@/views/Navigation.vue'
import Sidebar from '@/views/Sidebar.vue'
import { BContainer } from 'bootstrap-vue'
export default {
  name: 'App',
  components: { Navigation, BContainer, Sidebar },
  methods: {
    load: async function() {
      const response = await fetch('/components-manifest.json')
      return await response.json()
    },
  },
  mounted: async function() {
    this.manifest = await this.load()
  },
  data: () => {
    return {
      manifest: null,
    }
  },
}
</script>

<style lang="scss">
#app {
  // position: fixed;
  min-height: 100% !important;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  #nav {
    position: fixed;
    width: 100%;
    z-index: 999999;
  }

  #container {
    min-height: 100%;
  }
}

#container {
  padding: 0;
  margin: 0;
  display: flex;
}

#router-view {
  position: absolute;
  max-height: 100%;
  left: 150px;
  top: 60px;
  overflow: scroll;
}

#sidebar {
  position: fixed;
  top: 60px;
  padding: 0 !important;
  margin: 0 !important;
  width: 150px;
  height: 100%;
  overflow: scroll;
  ul {
    margin-top: 0.25em;
  }

  .btn {
    text-align: left;
  }
}

.bg-darkgray {
  //   border-right: 1px solid #999;
}
</style>
