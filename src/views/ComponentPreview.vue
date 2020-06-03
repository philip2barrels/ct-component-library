<template>
  <b-container fluid>
    <div v-for="item in manifest" :key="item.id">
      <vue-markdown :source="item.markdown"></vue-markdown>
      <component :is="kebabCase(item.name)"></component>
    </div>

  </b-container>
</template>

<script>
  import _ from 'lodash'
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
      kebabCase:(val) => _.kebabCase(val),
      extractManifestData: function(node){

        const entry = { id: Date.now() }
        node.contents.map(async item => {
          const vueFile = item.name.indexOf('.vue') > -1
          const markdownFile = item.name.indexOf('.md') > -1 || item.name.indexOf('.markdown') > -1



          if (item.type === 'file' && vueFile) {
            let paths = item.name.split('/')
            const name = paths[paths.length - 1].replace('.vue', '')
            entry.name = name
            entry.template = name
          } else if(item.type === 'file' && markdownFile) {
            let response = await fetch(item.name.replace('src', ''));
            entry.markdown = await response.text();
          }
        })

        return entry
      }
    },
    data: function(){
      return {
        manifest: [],
        markdown: ''
      }
    },
    async mounted(){
    const id = this.id
    let response = await fetch('/components-manifest.json');
    const data = await response.json();
    const formattedData = []

    if (data && data.length > 0) {
      const component = data[0].contents.filter(directory => {
        let paths = directory.name.split('/')
        return paths[paths.length - 1] === id
      })[0]

      if (component) {
        const rootComponent = this.extractManifestData(component)
        formattedData.push(rootComponent)
        component.contents.forEach(item => {
          let paths = item.name.split('/')
          if (item.type === 'directory' && paths[paths.length - 1] === 'examples') {
            item.contents.forEach(async ex => formattedData.push(await this.extractManifestData(ex)))
          }
        })
      }
      this.manifest = formattedData
      console.log(this.manifest)
    }
    }
  }
</script>

<style scoped lang="scss">

</style>
