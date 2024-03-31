/**
 * controllers/index.js
 */

const { uploader } = require('./uploader')
const { findImages } = require('./findImages')


module.exports = {
  uploader,
  findImages
}