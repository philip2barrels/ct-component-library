<template>
  <b-container fluid v-if="loaded">
    <div v-for="(item, i) in previewData" :key="String(i)">
      <b-container fluid class="mb-4">
        <component
          :is="kebabCase(item.name)"
          :key="`${item.name}-component`"
          class="mt-2 mb-2"
        />
        <vue-markdown
          :watches="['item.markdown']"
          :source="item.markdown"
          :key="`${item.name}-markdown`"
          class="mt-2 mb-2"
        />
        <h3 class="mt-4 mb-4" v-if="i === 0 && previewData.length > 1">
          Examples
        </h3>
      </b-container>
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
  props: ['manifest'],
  methods: {
    filters: input => {
      return input.sort((a, b) => a.name.localeCompare(b.name))
    },
    kebabCase: val => _.kebabCase(val),
    containsMarkdownFileExtension: string =>
      string.includes('.md') || string.includes('.markdown'),
    containsSFCFileExtension: string => string.includes('.vue'),
    extractManifestData: async function(node) {
      let entry = { id: Date.now() }
      for (let i = 0; i < node.contents.length; i++) {
        const item = node.contents[i]
        if (item.type != 'file') {
          continue
        }
        if (this.containsSFCFileExtension(item.name)) {
          let paths = item.name.split('/')
          const name = paths[paths.length - 1].replace('.vue', '')
          entry = { ...entry, name, template: name }
        } else if (this.containsMarkdownFileExtension(item.name)) {
          let response = await fetch(item.name.replace('src', ''))
          entry.markdown = await response.text()
        }
      }
      return entry
    },
    load: async function() {
      this.loaded = false

      const id = this.$route.params.id
      const formattedData = []

      const hasComponentManifest = this.manifest && this.manifest.length > 0

      if (hasComponentManifest) {
        const component = this.manifest[0].contents.filter(directory => {
          let paths = directory.name.split('/')
          return paths[paths.length - 1] === id
        })[0]

        if (component) {
          const rootComponent = await this.extractManifestData(component)
          formattedData.push(rootComponent)
          component.contents.forEach(item => {
            const isDirectory = item.type === 'directory'
            const paths = item.name.split('/')
            const isExamplesFolder = paths[paths.length - 1] === 'examples'

            if (isDirectory && isExamplesFolder) {
              item.contents.forEach(async ex => {
                const res = await this.extractManifestData(ex)
                console.log('found example', res)
                formattedData.push(res)
              })
            }
          })
        }

        this.previewData = formattedData
        this.loaded = true
        console.log(`Loaded: ${this.previewData.length}`, formattedData)
      }
    },
  },
  data: function() {
    return {
      loaded: false,
      previewData: [],
    }
  },
  mounted: async function() {
    await this.load()
  },
  watch: {
    $route: 'load',
  },
}
</script>
