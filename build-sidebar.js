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

let manifest = null;

fs.readFileSync('public/components-manifest.json', 'utf8', (err, data) => {
  return (manifest = JSON.parse(data));
});

let body = '';

manifest = manifest && manifest.length > 0 ? manifest[0] : null;

if (manifest) {
  const types = manifest[0].contents.map((component) => {
    const paths = component.name.split('/');
    return paths[paths.length - 1];
  });

  types.forEach((componentName) => {
    body += `     <li>
          <a href="/#/components/${componentName}">${componentName}</a>
        </li>
      `;
  });
}

const io = fs.createWriteStream('src/views/Sidebar.vue');
io.write(`${head}${tail}${body}`);
io.end();
