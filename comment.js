//create web server
const express = require('express')
const app = express()
const port = 3000

//create express-handlebars
const exphbs = require('express-handlebars')
//create body-parser
const bodyParser = require('body-parser')
const generateTrashTalk = require('./generate_trash_talk')
const handlebars = require('handlebars')
const { ifEqual } = require('handlebars-helpers')

//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//set handlebars helper
handlebars.registerHelper('ifEqual', ifEqual)

//set route
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const options = req.body
  const trashTalk = generateTrashTalk(options)
  res.render('index', { trashTalk: trashTalk, options: options })
})

//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})