# Input

Create various type inputs such as: text, password, number, url, email, search, range, date and more.

```

<template>
  <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>
```
