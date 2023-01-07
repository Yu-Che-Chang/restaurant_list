const express = require('express')
const router = express.Router()
const RestaurantModal = require('../../models/restaurantModal')
const sortSelector = require('../../public/javascripts/sortSelector')
let lastSelected = ''
let keyword = ''
let direct = '/'

// root web
router.get('/', (req, res) => {
  // get RestaurantModal data
  RestaurantModal.find() // 找到 DB 資料
    .lean() // 轉換成 js 格式
    .sort({ _id: 'desc' })
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(error => console.error(error))
  lastSelected = ''
  keyword = ''
})

router.post('/', (req, res) => {
  lastSelected = req.body.sort ? req.body.sort : lastSelected
  let sortType = sortSelector(lastSelected)
  RestaurantModal.find()
    .lean()
    .collation({ locale: "en" }) // 解決大小寫排序問題
    .sort(sortType)
    .then(restaurantData => res.render('index', { restaurantData, lastSelected, keyword, direct }))
    .catch(error => console.log(error))
})

// route setting: 查詢字串
// 優化: En 大小寫轉換 / 餐庭名稱空格去除
router.get('/search', (req, res) => {
  const searchKeyword = req.query.keyword.toLowerCase().trim()
  lastSelected = 'recent'
  keyword = searchKeyword
  if (keyword.length > 0) { direct = '/search?keyword=' + keyword }
  RestaurantModal.find()
    .lean()
    .then(restaurantData => {
      const restaurantRow = restaurantData
      const restaurantDataFiltered = restaurantData.filter(restaurant =>
        restaurant.name.replace(' ', '').toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurantData: restaurantDataFiltered, keyword, restaurantRow, direct, lastSelected })
    })
    .catch(error => console.log(error))
})

router.post('/search', (req, res) => {
  lastSelected = req.body.sort ? req.body.sort : lastSelected
  const searchKeyword = req.query.keyword.toLowerCase().trim()
  let sortType = sortSelector(lastSelected)
  if (keyword.length > 0) { direct = '/search?keyword=' + keyword }
  keyword = searchKeyword
  RestaurantModal.find()
    .lean()
    .collation({ locale: "en" })
    .sort(sortType)
    .then(restaurantData => {
      const restaurantRow = restaurantData
      const restaurantDataFiltered = restaurantData.filter(restaurant =>
        restaurant.name.replace(' ', '').toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
      )
      res.render('index', { restaurantData: restaurantDataFiltered, keyword, restaurantRow, direct, lastSelected })
    })
    .catch(error => console.log(error))
})

module.exports = router