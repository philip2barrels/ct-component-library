# Table

This is a wrapper for the B-Table component with some additional functionality, such as pagination,
a loading spinner, and cleaner multi-select functionality.
Reference: https://bootstrap-vue.js.org/docs/components/table/#comp-ref-b-table

## Usage Example

```
  <ct-table
    :loaded="loaded"
    :fields="tableDefinition"
    :items="searchResults"
  >
```

tableDefinition:

```
    { key: 'jurisdiction', label: 'Jurisdiction', sortable: false },
    { key: 'ruleDescription', label: 'Type of Filing', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ],
```

## Events

selection-changed
row-selected
head-clicked
pagination-changed

## Methods

selectAllRows
clearSelected
