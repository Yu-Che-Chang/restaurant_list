const express = require('express')
const router = express.Router()
const RestaurantModal = require('../../models/restaurantModal')

// route setting: CREATE page
router.get('/new', (req, res) => {
  res.render('new')
})

// 評分篩選
router.get('/rating/:score', (req, res) => {
  const score = req.params.score
  const lastScore = parseInt(req.params.score)
  RestaurantModal.find()
    .lean()
    .sort({ rating: -1 })// 評分排序
    .then(restaurantData => {
      const scoreFilter = restaurantData.filter(restaurant => Number(restaurant.rating) <= score && Number(restaurant.rating) >= lastScore)
      res.render('index', { restaurantData: scoreFilter })
    })
    .catch(error => console.error(error))
})

// CREATE function:
router.post('/', (req, res) => {
  const survey = req.body
  RestaurantModal.create(survey)
    .then(() => res.redirect('/'))
    .catch(error => console.log('error'))
})

// route setting: detail page
router.get('/:restaurantsId', (req, res) => {
  const id = req.params.restaurantsId
  RestaurantModal.findById(id)
    .lean()
    .then(restaurantData => res.render('show', { restaurantInfo: restaurantData }))
    .catch(error => console.log(error))
})

// route setting: edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantModal.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

// EDIT and UPDATE: 
router.put('/:id', (req, res) => {
  const id = req.params.id
  const survey = req.body
  RestaurantModal.findByIdAndUpdate(id, survey)
    .then(() => res.redirect('/')) // 返回首頁
    .catch(error => console.log('error'))
})

// DELETE function:
router.delete('/:id', (req, res) => {
  const id = req.params.id
  RestaurantModal.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router