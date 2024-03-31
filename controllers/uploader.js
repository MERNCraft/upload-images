/**
 * controllers/upload.js
 */


const { Image } = require('../database')


exports.uploader = (req, res) => {
  const { file, body } = req
  const { user, set } = body
  const { path, mimetype, originalname: name } = file

  const image = {
    user,
    set,
    path,
    name,
    mimetype
  };


  new Image(image)
    .save()
    .then(() => {
      res.redirect("/")
    })
    .catch(err => {
      console.log(err);
    });
}