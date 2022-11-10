// include express in node_modules and related variables
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//routing setting
app.get('/', (req, res) => {
  // response send the feedback
  res.render('index', { restaurant: restaurantList.results })
})

// setting route for details
app.get('/restaurants/:id', (req, res) => {
  // response send the feedback
  console.log('req.params.id:', req.params.id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// route for searching 
app.get('/search', (req, res) => {
  console.log('req.query:', req.query.keyword)
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return (restaurant.name.includes(keyword) || restaurant.category.includes(keyword))
  })
  res.render('index', { restaurant: restaurants, keyword: keyword })
})

//start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})