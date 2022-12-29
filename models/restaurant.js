const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
  },
  phone: {
    type: Number,
  },
  image: {
    type: String,
    require: true
  },
  location: {
    type: String,
    require: true
  },
  google_map: {
    type: String,
  },
  rating: {
    type: String,
    require: true
  },
  description: {
    type: String,
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)