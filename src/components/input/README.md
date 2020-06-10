# Input

Create various type inputs such as: text, password, number, url, email, search, range, date and more.

### Props

| Name | Type  |Required  | Default | Description |
|-|-|-|-|-|
|block  |boolean  | false | false | Renders a 100% width button (expands to the width of its parent container) |
|disabled  |boolean  | false | false | When set to 'true', disables the component's functionality and places it in a disabled state |
|size  |string  | false |  | Set the size of the component's appearance. 'sm', 'md' (default), or 'lg' |
|variant  |string  | false | 'secondary' | Applies one of the Bootstrap theme color variants to the component |


### Events

| Event | Arguments  | Description |
|-|-|-|
|click  | Native click event object  | Emitted when non-disabled button clicked | 


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
