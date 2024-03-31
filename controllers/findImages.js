/**
 * controllers/findImages.js
 */


const { Image } = require('../database')

function findImages(req, res) {
  Image
   .find({})
   .then( images => {
     res.render("index", {images})
   })
   .catch( error => {
      console.log("error:", error);
      res.status(500).send("An error occurred", error);
    })
}

module.exports = {
  findImages
}