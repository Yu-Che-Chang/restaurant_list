const express = require('express')
const port = 3000
const app = express()
const ephds = require('express-handlebars')
const restaurantList = require('./restaurant.json') // 載入 餐廳資料
const mongoose = require('mongoose') // 載入 mongoose

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
})

app.engine('handlebars', ephds({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// root web
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// params
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantInfo = restaurantList.results.find(restaurant =>
    restaurant.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurantInfo })
})

// 查詢字串
// 優化: En 大小寫轉換 / 餐庭名稱空格去除
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurantRow = restaurantList.results
  const restaurantsFiltered = restaurantList.results.filter(restaurant =>
    restaurant.name.replace(' ', '').toLowerCase().includes(keyword) ||
    restaurant.category.toLowerCase().includes(keyword)
  )
  res.render('index', { restaurants: restaurantsFiltered, keyword, restaurantRow })
})

// 靜態樣板
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Now server is on http://localhost:${port}`)
})
