/**
 * database/index.js
 */


const DB = process.env.DB

const mongoose = require('mongoose')
const { Image } = require('./models')


mongoose
  .connect(DB)
  .then(() => {
    console.log(`Connected to ${DB}`)
  })

  .catch( error => {
    console.log("DB connection ERROR:\n", error);
    process.exit()
  })


  const db = {
    mongoose,
    Image
  }


  module.exports = db