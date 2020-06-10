# CT-Table

This is a wrapper for the B-Table component with some additional functionality, such as pagination,
a loading spinner, and cleaner multi-select functionality.
Reference: https://bootstrap-vue.js.org/docs/components/table/#comp-ref-b-table

### Usage Example

```
  <ct-table
    :loaded="loaded"
    :fields="tableDefinition"
    :items="searchResults"
  />
```

### Example tableDefinition

```
  [
    { key: 'jurisdiction', label: 'Jurisdiction', sortable: false },
    { key: 'ruleDescription', label: 'Type of Filing', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ]
```


### Props

| Name | Type  |Required  | Default | Description |
|-|-|-|-|-|
|loaded  |boolean  | false | false | Renders a 100% width button (expands to the width of its parent container) |
|fields  |array  | true | [] | When set to 'true', disables the component's functionality and places it in a disabled state |
|items  |array  | true | [] | Array of records to display|

### Events

| Event | Arguments  | Description |
|-|-|-|
|selection-changed  |   |  | 
|row-selected  |   |  | 
|head-clicked  |   |  | 
|pagination-changed  |   |  | 

## Methods

| Event | Arguments  | Description |
|-|-|-|
|selectAllRows  |   |  | 
|clearSelected  |   |  | 




