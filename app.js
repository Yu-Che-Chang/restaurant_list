const express = require('express')
const port = 3000
const app = express()
const ephds = require('express-handlebars')

// 導入Json
const restaurantList = require('./restaurant.json')

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
