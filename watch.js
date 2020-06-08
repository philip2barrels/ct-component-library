var chokidar = require('chokidar')
const shell = require('shelljs')

chokidar.watch('src/components').on('all', (event, path) => {
  console.log(`[changed] ${path}`)
  shell.exec('./copy-assets.sh')
  shell.exec('node build-sidebar.js')
})
