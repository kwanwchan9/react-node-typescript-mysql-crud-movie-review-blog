const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase',
})

db.connect(function (err) {
  if (err) throw err
  console.log('Connected to the database!')
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
  const sqlSelect = 'SELECT * FROM movie_reviews;'
  db.query(sqlSelect, (error, result) => {
    if (error) return console.log(error)
    res.send(result)
  })
})

app.get('/api/getrandom', (req, res) => {
  const sqlSelect = 'SELECT * FROM movie_reviews ORDER BY RAND() LIMIT 1;'
  db.query(sqlSelect, (error, result) => {
    if (error) return console.log(error)
    res.send(result)
  })
})

app.post('/api/insert', (req, res) => {
  const movieName = req.body.title
  const movieReview = req.body.content
  const sqlInsert =
    'INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);'
  db.query(sqlInsert, [movieName, movieReview], (error, result) => {
    if (error) console.log(error)
    res.send(result)
  })
})

app.delete('/api/delete/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const sqlDelete = 'DELETE FROM movie_reviews WHERE id = ?;'
  db.query(sqlDelete, id, (error, result) => {
    if (error) return console.log(error)
    res.send('Successfully Deleted')
  })
})

app.listen(3001, () => {
  console.log('running on port 3001')
})
