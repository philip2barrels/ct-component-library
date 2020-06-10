# Button

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

## Overview

BootstrapVue's `<button>` component generates either a `<button>` element,
`<a>` element, or `<router-link>` component with the styling of a button.

Use button component for actions in forms, dialogs, and more. Includes support for a handful of contextual variations, sizes, states, and more.

```
<template>
  <div>
    <h5>Pressed and un-pressed state</h5>
    <b-button :pressed="true" variant="success">Always Pressed</b-button>
    <b-button :pressed="false" variant="success">Not Pressed</b-button>

    <h5 class="mt-3">Toggleable Button</h5>
    <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
    <p>Pressed State: <strong>{{ myToggle }}</strong></p>

    <h5>In a button group</h5>
    <b-button-group size="sm">
      <b-button
        v-for="(btn, idx) in buttons"
        :key="idx"
        :pressed.sync="btn.state"
        variant="primary"
      >
        {{ btn.caption }}
      </b-button>
    </b-button-group>
    <p>Pressed States: <strong>{{ btnStates }}</strong></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myToggle: false,
        buttons: [
          { caption: 'Toggle 1', state: true },
          { caption: 'Toggle 2', state: false },
          { caption: 'Toggle 3', state: true },
          { caption: 'Toggle 4', state: false },
        ],
      }
    },
    computed: {
      btnStates() {
        return this.buttons.map(btn => btn.state)
      },
    },
  }
</script>
```