/**
 * routes.js
 */


const { uploader } = require('../controllers')
const { readFields } = require('../middleware')


const routes = (app) => {
  app.post("/", readFields, uploader)
}


module.exports = routes