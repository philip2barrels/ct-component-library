<template>
  <ct-table
    ref="table"
    v-on="$listeners"
    v-bind="$attrs"
    :loaded="loaded"
    :fields="tableDefinition.columns"
    :items="records"
    :total-records="totalRecords"
    :sort-by.sync="orderBy"
    :sort-desc.sync="sortDesc"
    :is-select-all-checked="isSelectAllChecked"
    :selectable-function="selectableFunction"
    @pagination-changed="reload"
    @sort-changed="sortChanged"
  >
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
    >
      <slot :name="name" v-bind="slotData" />
    </template>
  </ct-table>
</template>

<script>
/*

# Ajax Table
This is a wrapper for the CtTable component with some additional functionality. This ctTable processes
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
*/

// import http from '../http' Inline client added below
import CtTable from '@/components/ctTable/CtTable'
import qs from 'qs'

import axios from 'axios'

const axiosClient = axios.create({
  //   baseURL: '/api/v3/',

  transformRequest: [
    (data, headers) => {
      Object.assign(headers, {
        // Authorization: `Bearer ${store.getters['session/getToken']}`,
      })

      return data
    },
    ...axios.defaults.transformRequest,
  ],
})

export default {
  name: 'AjaxTable',

  components: { CtTable },

  props: {
    tableDefinition: {
      type: Object,
      required: true,
    },
    selectableFunction: {
      type: Function,
      required: false,
      default: function() {
        return true
      },
    },
  },

  mounted() {
    this.reload()
  },

  data() {
    let sortDesc = true
    let orderColumn = null

    // Set up defaults for column ordering.
    if (this.tableDefinition && this.tableDefinition.columns.length > 0) {
      if (this.tableDefinition.defaultOrderBy) {
        orderColumn = this.tableDefinition.defaultOrderBy
      } else if (
        this.tableDefinition.columns.some(
          element => element.key === 'created_at',
        )
      ) {
        orderColumn = 'created_at'
      } else {
        // Since there is no created_at column, the developer really *should* specify default sort.
        console.error(
          'Table Warning: A defaultOrderBy column should be specified.',
        )
        orderColumn = this.tableDefinition.columns[0].key
      }

      if (this.tableDefinition.defaultOrderDirection) {
        sortDesc = this.tableDefinition.defaultOrderDirection === 'desc'
      }
    }

    return {
      loaded: false,
      orderBy: orderColumn,
      sortDesc: sortDesc,
      totalRecords: 0,
      records: this.items,
      isSelectAllChecked: false,
    }
  },

  methods: {
    async reload() {
      this.loaded = false
      const limit = this.$refs.table.resultsPerPage
      const curPage = this.$refs.table.currentPage
      const offset = limit * (curPage - 1)

      const response = await axiosClient.get(this.tableDefinition.url, {
        params: {
          ...this.tableDefinition.parameters,
          limit: limit,
          offset: offset,
          include_count: true,
          generic_search: this.tableDefinition.generic_search,
          order_by: this.orderBy,
          order_direction: this.sortDesc ? 'desc' : 'asc',
        },
        paramsSerializer: params => {
          return qs.stringify(params, {
            arrayFormat: 'brackets',
            encode: false,
          })
        },
      })

      // This is a count of all relevant records (not the length of the paginated response).
      this.totalRecords = response.data.count
      this.records = response.data.result
        ? response.data.result
        : response.data
        ? response.data
        : []

      this.$emit('loaded', this.records)
      this.isSelectAllChecked = false
      this.loaded = true
    },

    sortChanged(tableContext) {
      const clickedColumn = this.tableDefinition.columns.find(
        element => element.sortable && element.key === tableContext.sortBy,
      )

      if (clickedColumn) {
        this.orderBy = clickedColumn.sortAs || tableContext.sortBy
        this.sortDesc = tableContext.sortDesc
      }

      this.reload()
    },
  },

  watch: {
    tableDefinition() {
      this.reload()
    },
  },
}
</script>
