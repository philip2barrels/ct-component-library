<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand href="/">ct-component-library</b-navbar-brand>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand } from 'bootstrap-vue'
export default {
  name: 'Navigation',
  components: {
    BNavbar,
    BNavbarBrand,
  },
}
</script>
