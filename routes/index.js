/**
 * routes.js
 */


const { uploader, findImages } = require('../controllers')
const { upload } = require('../middleware')


const routes = (app) => {
  app.get("/xxx", findImages)
  app.post("/", upload.single("image"), uploader)
}


module.exports = routes