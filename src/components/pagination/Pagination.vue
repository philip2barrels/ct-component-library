<template>
  <b-pagination
    v-if="totalRecords > 0 || (items && items.length > 0)"
    v-model="cPage"
    :total-rows="totalRecords || items.length"
    :current-page.sync="currentPage"
    :per-page="perPage"
    align="fill"
    :hide-ellipsis="true"
    :hide-goto-end-buttons="true"
    class="my-2 border-none"
    aria-controls="nothing"
    @input="onInput"
  />
</template>

<script>
import BPagination from 'bootstrap-vue';
export default {
  extends: BPagination,
  name: 'CPagination',
  props: {
    items: {
      default() {
        return [];
      },
      type: Array,
    },
    currentPage: {
      default: null,
      type: Number,
    },
    perPage: {
      default: null,
      type: Number,
    },
    totalRecords: {
      default: 0,
      type: Number,
    },
  },
  data: function() {
    return {
      cPage: this.currentPage,
    };
  },
  methods: {
    onInput() {
      this.$parent.$children.find((child) => {
        return child.$options._componentTag === 'b-table';
      }).$el.scrollTop = 0;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      this.$emit('update:current-page', this.cPage);
    },
  },
};
</script>
