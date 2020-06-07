<template>
  <div class="home">
    <template v-if="loaded">
      <vue-markdown>{{ markdown }}</vue-markdown>
    </template>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Home',
  components: {
    VueMarkdown,
  },
  data: function() {
    return {
      loaded: false,
      markdown: null,
    }
  },
  mounted: async function() {
    let response = await fetch('/README.md')
    this.markdown = await response.text()
    this.loaded = true
  },
}
</script>
