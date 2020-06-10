# Pagination
Quick first, previous, next, last, and page buttons for pagination control of another component (such as <b-table> or lists).

## Overview

```<b-pagination>``` is a custom input component that provides a current page number input control. The value should be bound via ```v-model``` in your app. Page numbers are indexed from 1. The number of pages is computed from the provided prop values for ```total-rows``` and per-page.

For pagination that changes to a new URL, use the ```<b-pagination-nav>``` component instead.

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
