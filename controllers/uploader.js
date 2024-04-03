/**
 * controllers/upload.js
 */

// require specific methods of 'path', so that we can use the
// variable 'path' elsewhere, with no conflicts.
const { basename, parse, join } = require('path')

const { Image } = require('../database')
const {
  UPLOAD,
  absolutePath,
  moveFile
} = require('../middleware')


exports.uploader = (req, res) => {
  const { files, body } = req
  const { user, room } = body
  const { images } = files
  if (!images) {
    const fail = "No images uploaded"
    res.send({ fail })
    return console.log("ERROR in uploader():", fail)
  }

  files.images.forEach( file => {
    const {
      path,        // "public/temp/hAs4$&-originalname.ext"
      mimetype,    // "image/ext"
      originalname // name of file on end-user's device
    } = file
    // Get name of image file with its extension but no path
    const fileName = basename(path)
    // Get the name that the file had on the end-user's device,
    // with no extension
    const name = parse(originalname).name
    // Get destination directory relative to PUBLIC dir
    const folder = join(UPLOAD, room)
    // Get image URL that a browser can use
    const src = "/" + join(folder, fileName)
    // Ensure that the destination directory exists
    const fullPath = absolutePath(room)

    // const from = `${ROOT}/${path}`
    const to = `${fullPath}/${fileName}`

    if (path === to) {
      // The file is already at its final resting place
      createImageRecord()

    } else {
      // Asynchronously move the file then call createImageRecord
      moveFile( path, to, createImageRecord )
    }

    function createImageRecord(error) {
      if (error) { // moveFile() was called, and failed
        res.status(500).send({ error: `${originalname} not saved`})
        return console.log("error:", error);
      }

      const image = {
        user,
        room,
        src,
        name,
        mimetype
      };

      new Image(image)
        .save()
        .then(() => {
          res.send({ src })
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({ error: `${originalname} not recorded in database`})
        });
    }
  })
}