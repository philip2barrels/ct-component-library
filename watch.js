var chokidar = require('chokidar')
const shell = require('shelljs')

chokidar
  .watch('.', {
    ignored: [
      /node_modules/,
      /public/,
      /tests/,
      /src\/assets/,
      /src\/plugins/,
      /src\/router/,
      /src\/views/,
      /\.git/,
    ],
  })
  .on('all', (event, path) => {
    console.log(`[changed] ${path}`)
    shell.exec('./copy-assets.sh')
  })
