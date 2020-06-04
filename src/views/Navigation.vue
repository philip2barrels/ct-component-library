<template>
  <b-navbar toggleable="lg" type="light" class="mb-2">
    <b-navbar-brand href="#">ct-component-library</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Components" right>
          <b-dropdown-item href="#">
            <router-link to="/components/button">Button</router-link>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <router-link to="/components/input">Input</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {
  BNavbarNav,
  BNavbar,
  BNavItemDropdown,
  BDropdownItem,
  BCollapse,
  BNavbarToggle,
  BNavbarBrand
} from "bootstrap-vue";
export default {
  name: "Navigation",
  components: {
    BNavbarNav,
    BNavbar,
    BNavItemDropdown,
    BDropdownItem,
    BCollapse,
    BNavbarToggle,
    BNavbarBrand
  }
};
</script>
