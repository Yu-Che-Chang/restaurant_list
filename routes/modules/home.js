const express = require('express')
const router = express.Router()
const RestaurantModal = require('../../models/restaurantModal')


// root web
router.get('/', (req, res) => {
  // get RestaurantModal data
  RestaurantModal.find() // 找到 DB 資料
    .lean() // 轉換成 js 格式
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(error => console.error(error))
})

// route setting: 查詢字串
// 優化: En 大小寫轉換 / 餐庭名稱空格去除
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()

  RestaurantModal.find()
    .lean()
    .then(restaurantData => {
      const restaurantRow = restaurantData
      const restaurantDataFiltered = restaurantData.filter(restaurant =>
        restaurant.name.replace(' ', '').toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurantData: restaurantDataFiltered, keyword, restaurantRow })
    })
    .catch(error => console.log(error))
})

module.exports = router