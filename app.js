const express = require('express')
const port = 3000
const app = express()
const ephds = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const methodOverRide = require('method-override')

require('./config/mongoose')

app.engine('handlebars', ephds({
  defaultLayout: 'main',
  helpers: {
    ifSort: function (selected, lastSelected) {
      return (lastSelected === selected) ? 'selected' : '';
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extender: true })) // res.body 物件
app.use(express.static('public'))
app.use(methodOverRide('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Now server is on http://localhost:${port}`)
})