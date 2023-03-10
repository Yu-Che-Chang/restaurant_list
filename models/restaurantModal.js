const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)