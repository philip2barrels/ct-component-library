<template>
  <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    msg: String,
  },
  data() {
    return {
      text: '',
    }
  },
}
</script>

<style scoped lang="scss"></style>
