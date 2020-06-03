<template>
  <b-container>
    <vue-markdown :source="markdown"></vue-markdown>
  </b-container>
</template>

<script>

  import { BContainer } from 'bootstrap-vue'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'ComponentPreview',
    components: { BContainer, VueMarkdown },
    computed: {
      id: function(){
        return this.$route.params.id
      },
    },
    methods: {
      fetchMarkdown: async function(){
        let response = await fetch(`/components/${this.id}/README.md`);
        let data = await response.text()
        this.markdown = data;

      }
    },
    data: function(){
      return {
        markdown: ''
      }
    },
    async mounted() {
      console.log('ComponentPreview mounted', this.$route.params.id)
      await this.fetchMarkdown()
      console.log(this.markdown)
    }
  }
</script>

<style scoped lang="scss">

</style>
