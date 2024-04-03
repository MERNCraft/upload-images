/**
 * middleware/index.js
 */


const {
  TEMP,
  PUBLIC,
  UPLOAD,
  absolutePath,
  moveFile
} = require('./directory.js')
const { readFields } = require('./multer.js')


module.exports = {
  TEMP,
  PUBLIC,
  UPLOAD,
  absolutePath,
  moveFile,
  readFields
}
