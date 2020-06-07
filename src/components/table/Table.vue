<template>
  <div>
    <b-table
      ref="btable"
      v-if="loaded"
      show-empty
      sticky-header="570px"
      selected-variant="none"
      v-bind="$attrs"
      v-on="$listeners"
      :small="$mq != 'lg'"
      :stacked="$mq === 'sm'"
      :responsive="true"
      :fields="tableDefinition"
      :items="items"
      :per-page="totalRecords ? 0 : resultsPerPage"
      :current-page="currentPage"
      :selectable="selectable"
      :select-mode="selectMode"
      @row-selected="onRowSelected"
      @head-clicked="onHeadClicked"
    >
      <template slot="HEAD_selected" slot-scope="data">
        <b-form-checkbox
          :cy-data="`select-${data.index}`"
          v-model="isSelectAllChecked"
          :indeterminate.sync="isSelectAllIndeterminate"
          @input="handleSelectAllCheckbox($event, data.index)"
        />
      </template>

      <template slot="selected" slot-scope="data">
        <b-form-checkbox
          v-if="selectableFunction(data.item)"
          v-model="data.rowSelected"
          @input="handleRowCheckbox($event, data.index)"
        />
      </template>

      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
        ><slot :name="name" v-bind="slotData"
      /></template>
    </b-table>
    <b-row
      class="pt-2 pb-3"
      v-if="
        isPaginated &&
          loaded &&
          items &&
          (currentPage > 0 || items.length > perPage - 1)
      "
    >
      <b-col sm="8" md="12" offset-sm="1">
        <c-pagination
          :items="items"
          :current-page.sync="currentPage"
          :per-page="resultsPerPage"
          :totalRecords="totalRecords"
        />
      </b-col>
      <b-col sm="auto mt-2">
        <b-form-group>
          <b-form-select
            v-if="items && items.length > 0"
            v-model="resultsPerPage"
            id="perPageSelect"
            size="sm"
            class="my-0"
            align="fill"
            :options="pageOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <ct-centered-spinner :loaded="loaded" />
  </div>
</template>

<script>
/*

# Table
This is a wrapper for the B-Table component with some additional functionality, such as pagination,
a loading spinner, and cleaner multi-select functionality.
Reference: https://bootstrap-vue.js.org/docs/components/table/#comp-ref-b-table

## Usage Example
  <ct-table
    :loaded="loaded"
    :fields="tableDefinition"
    :items="searchResults"
  >
  tableDefinition:
    { key: 'jurisdiction', label: 'Jurisdiction', sortable: false },
    { key: 'ruleDescription', label: 'Type of Filing', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ],

## Events
  selection-changed
  row-selected
  head-clicked
  pagination-changed

## Methods
  selectAllRows
  clearSelected
*/

import CPagination from '@/components/pagination/Pagination';
import CtCenteredSpinner from '@/components/ct-centered-spinner/ctCenteredSpinner';

export default {
  name: 'CtTable',
  components: {CtCenteredSpinner, CPagination},
  props: {
    fields: {
      default: false,
    },
    items: {
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selectMode: {
      type: String,
      default: 'multi',
    },
    isPaginated: {
      type: Boolean,
      default: true,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    stickyHeader: {
      default: false,
    },
    perPage: {
      default: 25,
    },
    totalRecords: {
      default: 0,
    },
    isSelectAllChecked: {
      default: false,
    },
    selectableFunction: {},
    pageOptions: {
      type: Array,
      default: () => [
        {value: 25, text: '25 per page'},
        {value: 50, text: '50 per page'},
        {value: 100, text: '100 per page'},
        {value: 200, text: '200 per page'},
        {value: 500, text: '500 per page'},
        {value: 1000, text: '1000 per page'},
        {value: 10000, text: '10000 per page'},
      ],
    },
  },
  mounted() {
    if (this.selectable)
      this.tableDefinition.unshift({key: 'selected', sortable: false});
  },
  data() {
    return {
      resultsPerPage: this.isPaginated ? this.perPage : 1000000,
      tableDefinition: this.fields,
      currentPage: 1,
      selected: [],
      isSelectAllIndeterminate: false,
    };
  },
  watch: {
    selected: function(newSelection) {
      // This is the cleanest and most reliable way to update the state of the selectAll checkbox.
      if (newSelection.length === 0) {
        this.isSelectAllIndeterminate = false;
        this.isSelectAllChecked = false;
      } else if (newSelection.length === this.resultsPerPage) {
        this.isSelectAllIndeterminate = false;
        this.isSelectAllChecked = true;
      } else {
        this.isSelectAllIndeterminate = true;
      }

      this.$emit('selection-changed', newSelection);
    },
    currentPage() {
      this.paginationChanged();
    },
    resultsPerPage() {
      this.paginationChanged();
    },
  },
  methods: {
    onRowSelected(data) {
      let newData = [];
      for (const item of data) {
        if (this.selectableFunction(item)) {
          newData.push(item);
        }
      }
      this.$emit('row-selected', newData);
      this.selected = newData;
    },
    onHeadClicked(data) {
      this.$emit('head-clicked', data);
    },
    handleSelectAllCheckbox() {
      if (this.isSelectAllChecked) {
        this.selectAllRows();
      } else {
        this.clearSelected();
      }
    },
    selectAllRows() {
      this.$refs.btable.selectAllRows();
    },
    clearSelected() {
      this.$refs.btable.clearSelected();
    },
    handleRowCheckbox(checkboxState, rowIndex) {
      if (checkboxState) {
        this.$refs.btable.selectRow(rowIndex);
      } else {
        this.$refs.btable.unselectRow(rowIndex);
      }
    },
    paginationChanged() {
      this.clearSelected();
      this.$emit('pagination-changed', {
        currentPage: this.currentPage,
        perPage: this.resultsPerPage,
      });
    },
  },
};
</script>
