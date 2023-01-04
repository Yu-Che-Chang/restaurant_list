const mongoose = require('mongoose') // 載入 mongoose

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
})

module.exports = db