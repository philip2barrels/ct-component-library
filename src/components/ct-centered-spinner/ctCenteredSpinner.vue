<template>
  <div v-if="!loaded" class="d-flex justify-content-center mb-3">
    <b-spinner style="width: 3rem; height: 3rem;" label="Loading..." />
  </div>
</template>

<script>
export default {
  name: 'ct-centered-spinner',
  props: {
    loaded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
