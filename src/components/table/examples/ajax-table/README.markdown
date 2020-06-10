## Ajax Table
This is a wrapper for the CtTable component with some additional functionality. This table processes
its own AJAX request for paginated data and has the ability to pass filters, order-by info, and
scope-based queries through to the API. All parameters, slots, and events are passed through this,
as if they were going directly to/from the grandparent/grandchild components. To access the raw
data, try listening on @loaded.

## Sorting
Column sorting can be enabled per-column within the column definition:
  { key: 'company_name', sortable: true },

If the string used as the 'key' does not match up with the column name in the database, "sortAs" can
be used to specify the sorting column.
  { key: 'jurisdiction', sortable: true, sortAs: 'jurisdictions.state_province_region' },
```

```
