/**
 * meta/indexer.js
 */

require('dotenv').config()

const fs = require('fs')
const path = require('path')
const _root = process.cwd()
const options = { withFileTypes: true }
const ignore = [
  "node_modules",
  "Notes",
  "tutorial",
  "temp",
  "uploads"
]
const skip = ["index.js", "server.js"]


const treatFoldersRecursively = (parent) => {
  const relativePath = parent.replace(_root+"/", "") + "/index.js"
  const contents = fs
    .readdirSync(parent, options)
    
  const folderNames = contents
    .filter(dirent => dirent.isDirectory())
    .map( dirent => dirent.name )
    .filter( name => name[0] !== "." && ignore.indexOf(name) < 0)

  // console.log("folderNames:", folderNames);
  folderNames.forEach( name => {
    treatFoldersRecursively(path.join(parent, name))
  })

  const scripts = contents
    .filter(dirent => dirent.isFile())
    .map( dirent => dirent.name )
    .filter( name => path.extname(name) === ".js")

  const indexData = scripts.reduce(( exportData, scriptName ) => {
    if (skip.indexOf(scriptName) < 0) {
      const scriptPath = path.join(parent, scriptName)

      try {
        const exports = require(scriptPath)
        if (typeof exports === "function") {
          // Any script that requires this module can choose its
          // own name for the exported function
          console.log(path.join(parent, scriptName), "\nreturns a function\n");
          
        } else {
          const keys = Object.keys(exports)
          const keyCount = keys.length
          if (keyCount) {
            const required = keyCount === 1
              ? ` ${keys[0]} `
              : "\n  " + keys.join(",\n  ") + "\n"
            exportData.required += 
              `const {${required}} = require('./${scriptName}')\n`

            exportData.exported = [...exportData.exported, ...keys]
          }
        }
        
      } catch {
        console.log(`require failed on ${scriptPath}`)     
      }
    }
    
    return exportData
  }, {
    required: `/**\n * ${relativePath}\n */\n\n\n`,
    exported: []
  })
  
  const exported = indexData.exported
  if (exported.length) {
    const indexScript = `${indexData.required}

module.exports = {
  ${exported.join(",\n  ")}
}
`
    const indexPath = path.join(parent, "index.js")
    fs.writeFileSync(indexPath, indexScript)
  }
}

treatFoldersRecursively(_root)
process.exit()
