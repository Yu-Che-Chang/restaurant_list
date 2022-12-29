const restaurantList = require('../../restaurant.json').results
const mongoose = require('mongoose') // 載入 mongoose
const RestaurantModal = require('../restaurantModal.js')
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI) // 連線到 mongoDB

const db = mongoose.connection // 取得 資料庫連線狀態

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.forEach(restaurant => {
    RestaurantModal.create(restaurant)
  });
  console.log('data had been uploaded!')
})