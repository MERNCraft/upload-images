/**
 * middleware/multer.js
 */

const multer = require('multer')


function destination (req, file, cb) {
  cb(null, "uploads");
}


// Reduce the 13-digit number value of Date.now(), such as
// 3333333333333 (18 August 2075) to a 7-character string
const sfits = /* a string of 64 unique characters */
"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&$"
function sixtyFour(number) {
  let result = ""
  while (number) {
    const sfit = number % 64
    result += sfits[sfit] // little endian
    number = (number - sfit) / 64
  }

  return result
}

function filename(req, file, callback) {
  const { originalname } = file
  const now = Date.now()
  const hash = sixtyFour(now)
  const fileName = `${hash}-${originalname}`
  callback( null, fileName )
}

const storage = multer.diskStorage({
  destination,
  filename,
});

exports.upload = multer({ storage });

