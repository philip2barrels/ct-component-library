const fs = require('fs');

const head = `<template>
  <div>
    Components
    <ul>
`;

const tail = `    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style lang="scss" scoped>
  ul {
  margin: 0;
  padding: 0;
    li {
        list-style-type: none;
    }
  }
</style>
`;

let manifest = JSON.parse(
  fs.readFileSync('public/components-manifest.json', 'utf8')
);

manifest = manifest[0];

const types = manifest.contents.map((component) => {
  const paths = component.name.split('/');
  return paths[paths.length - 1];
});

let body = '';

types.forEach((componentName) => {
  body += `     <li>
        <a href="/#/components/${componentName}">${componentName}</a>
      </li>
    `;
});

const io = fs.createWriteStream('src/views/Sidebar.vue');
io.write(`${head}${body}${tail}`);
io.end();