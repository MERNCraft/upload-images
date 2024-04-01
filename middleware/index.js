/**
 * middleware/index.js
 */

const {
  TEMP,
  PUBLIC,
  UPLOAD,
  absolutePath,
  moveFile
} = require('./directory')
const readFields = require('./multer')

 module.exports = {
  TEMP,
  PUBLIC,
  UPLOAD,
  absolutePath,
  moveFile,
  readFields
 }