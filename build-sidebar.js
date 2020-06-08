let _ = require('lodash')
const fs = require('fs')

const head = `<template>
  <div class="pl-3">
    <h5>Components</h5>
    <ul>
`

const tail = `    </ul>
  </div>
</template>

<script>

/*
  !!Warning!!
  This file is created dynamically based on the contents of src/components.
  Edit build-sidebar.js to make layout changes.
*/

export default {
  name: 'Sidebar',
};
</script>

<style lang="scss" scoped>
  ul {
    margin: 0;
    margin-left: 1em;
    padding: 0;
    li {
      list-style-type: none;
      text-align: left;
    }
  }
</style>
`

let manifest = JSON.parse(
  fs.readFileSync('public/components-manifest.json', 'utf8'),
)

manifest = manifest[0]

const types = manifest.contents.map(component => {
  const paths = component.name.split('/')
  return paths[paths.length - 1]
})

let body = ''

types.forEach(componentName => {
  body += `     <li>
        <a href="/#/components/${componentName}">${_.startCase(
    componentName,
  )}</a>
      </li>
    `
})

const io = fs.createWriteStream('src/views/Sidebar.vue')
io.write(`${head}${body}${tail}`)
io.end()
