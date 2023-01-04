const restaurantList = require('../../restaurant.json').results
const RestaurantModal = require('../restaurantModal.js')
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  restaurantList.forEach(restaurant => {
    RestaurantModal.create(restaurant)
  });
  console.log('data had been uploaded!')
})