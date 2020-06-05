<template>
  <b-container fluid v-if="loaded">
    <div v-for="(item, i) in previewData" :key="String(i)">
      <b-container fluid>
        <component
          v-bind:is="kebabCase(item.name)"
          :key="`${item.name}-component`"
        />
        <vue-markdown
          :watches="['markdown']"
          :source="item.markdown"
          :key="`${item.name}-markdown`"
          class="mt-2 mb-2"
        />
        <h3 class="mt-4 mb-4" v-if="i === 0">Examples</h3>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import _ from 'lodash';
import {BContainer} from 'bootstrap-vue';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'ComponentPreview',
  components: {BContainer, VueMarkdown},
  props: ['manifest'],
  computed: {
    id: function() {
      return this.$route.params.id;
    },
  },
  methods: {
    kebabCase: (val) => _.kebabCase(val),
    extractManifestData: async function(node) {
      const entry = {id: Date.now()};
      for (let i = 0; i < node.contents.length; i++) {
        const item = node.contents[i];
        const vueFile = item.name.indexOf('.vue') > -1;
        const markdownFile =
          item.name.indexOf('.md') > -1 || item.name.indexOf('.markdown') > -1;

        if (item.type === 'file' && vueFile) {
          let paths = item.name.split('/');
          const name = paths[paths.length - 1].replace('.vue', '');
          entry.name = name;
          entry.template = name;
        } else if (item.type === 'file' && markdownFile) {
          let response = await fetch(item.name.replace('src', ''));
          entry.markdown = await response.text();
        }
      }
      return entry;
    },
    load: async function() {
      this.loaded = false;

      const id = this.id;
      const response = await fetch('/components-manifest.json');
      const data = await response.json();
      const formattedData = [];

      if (data && data.length > 0) {
        const component = data[0].contents.filter((directory) => {
          let paths = directory.name.split('/');
          return paths[paths.length - 1] === id;
        })[0];

        if (component) {
          const rootComponent = await this.extractManifestData(component);
          formattedData.push(rootComponent);
          component.contents.forEach((item) => {
            let paths = item.name.split('/');
            if (
              item.type === 'directory' &&
              paths[paths.length - 1] === 'examples'
            ) {
              item.contents.forEach(async (ex) => {
                const result = await this.extractManifestData(ex);
                formattedData.push(result);
              });
            }
          });
        }
        this.previewData = formattedData;
        this.loaded = true;
      }
    },
  },
  data: function() {
    return {
      previewData: [],
      loaded: false,
    };
  },
  mounted: async function() {
    await this.load();
  },
  watch: {
    $route: 'load',
  },
};
</script>
