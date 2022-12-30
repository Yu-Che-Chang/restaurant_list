const express = require('express')
const port = 3000
const app = express()
const ephds = require('express-handlebars')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser')
const restaurantList = require('./restaurant.json') // 載入 餐廳資料
const RestaurantModal = require('./models/restaurantModal')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
app.use(bodyParser.urlencoded({ extender: true })) // res.body 物件
app.use(express.static("public"))

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
  // get RestaurantModal data
  RestaurantModal.find() // 找到 DB 資料
    .lean() // 轉換成 js 格式
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(error => console.error(error))
})

// detail page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  RestaurantModal.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantInfo: restaurantData }))
    .catch(error => console.log(error))
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

// edit page
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.id
  return restaurantModal.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Now server is on http://localhost:${port}`)
})
