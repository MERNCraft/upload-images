/**
 * routes.js
 */


const { uploader } = require('../controllers')
const { readFields } = require('../middleware')


const routes = (app) => {
  app.post("/", readFields, uploader)
  // app.post("/select", treatQuery)
}


module.exports = routes