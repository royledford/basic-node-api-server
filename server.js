const http = require('http')
const handleGetRequest = require('./methods/handleGetRequest')
const handlePostRequest = require('./methods/handlePostRequest')
const handlePutRequest = require('./methods/handlePutRequest')
const handleDeleteRequest = require('./methods/handleDeleteRequest')
let movies = require('./data/movies.json')
require('dotenv').config()

const PORT = process.env.PORT || 5001

const server = http.createServer((req, res) => {
  req.movies = movies
  console.log('req', req.method) // TODO: remove this

  switch (req.method) {
    case 'GET':
      handleGetRequest(req, res)
      break
    case 'POST':
      handlePostRequest(req, res)
      break
    case 'PUT':
      handlePutRequest(req, res)
      break
    case 'DELETE':
      handleDeleteRequest(req, res)
      break
    default:
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      res.write(
        JSON.stringify({ title: 'Not Found', message: 'Error: Not Found' }),
      )
      res.end()
  }
})

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
