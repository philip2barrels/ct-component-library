<template>
  <b-row>
    <b-col lg="4" class="pb-2"
      ><b-button size="sm">Small Button</b-button></b-col
    >
    <b-col lg="4" class="pb-2"><b-button>Default Button</b-button></b-col>
    <b-col lg="4" class="pb-2"
      ><b-button size="lg">Large Button</b-button></b-col
    >
  </b-row>
</template>

<script>
import { BRow, BCol, BButton } from 'bootstrap-vue'
export default {
  name: 'Button',
  components: { BRow, BCol, BButton },
  props: {
    msg: String,
  },
}
</script>

<style lang="scss">
.btn {
  margin-right: 0.2em !important;
}
</style>
