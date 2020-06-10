<template>
  <ajax-table :table-definition="tableDefinition" @loaded="loaded" />
</template>

<script>
import AjaxTable from '@/components/table/AjaxTable'

export default {
  name: 'AjaxTableExample',

  components: { AjaxTable },

  props: {},

  mounted() {},

  data() {
    return {
      tableDefinition: {
        url: '/comments.json',
        defaultOrderBy: 'postId',
        columns: [
          { key: 'postId', label: 'Id', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'body', label: 'Body', sortable: true },
        ],
      },
    }
  },

  methods: {
    loaded: function(val) {
      console.log('loaded', val)
    },
  },
}
</script>
