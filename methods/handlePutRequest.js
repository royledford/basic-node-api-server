const crypto = require('crypto')
const requestBodyParser = require('../utils/body-parser')
const writeToFile = require('../utils/write-to-file')

module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1)
  let id = req.url.split('/')[3]
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  )

  if (!regexV4.test(id)) {
    // id is not an id
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        title: 'Bad Request',
        message: 'Error: ID is valid',
      }),
    )
  } else if (baseUrl === '/api/movies/' && regexV4.test(id)) {
    try {
      let body = await requestBodyParser(req)

      const index = req.movies.findIndex((movie) => {
        return movie.id === id
      })

      if (index === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.write(
          JSON.stringify({
            title: 'Not Found',
            message: `Error: Movie with id: ${id} not found`,
          }),
        )
        res.end()
      } else {
        req.movies[index] = { id, ...body }
        writeToFile(req.movies)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(req.movies[index]))
      }
    } catch (err) {
      console.log('err', err)
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          title: 'Failed to parse body',
          message: `Request body is not valid JSON`,
        }),
      )
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ title: 'Not Found', message: 'Route not found' }))
  }
}
