/**
 * routes.js
 */


const {
  uploader,
  treatQuery
} = require('../controllers')
const { readFields } = require('../middleware')


const routes = (app) => {
  app.post("/", readFields, uploader)
  app.post("/query", treatQuery)
}


module.exports = routes