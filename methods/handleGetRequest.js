const stringHelper = require('../utils/stringHelper')

module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1)
  let id = req.url.split('/')[3]
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  )

  if (req.url === '/api/movies') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(req.movies))
    res.end()
  } else if (!regexV4.test(id)) {
    // id is not an id
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        title: 'Bad Request',
        message: 'Error: ID is not alphanumeric',
      }),
    )
  } else if (baseUrl === '/api/movies/' && regexV4.test(id)) {
    // id is an id
    res.setHeader('Content-Type', 'application/json')
    let movie = req.movies.filter((movie) => {
      return movie.id === id
    })

    if (movie.length > 0) {
      res.statusCode = 200
      res.write(JSON.stringify(movie[0]))
      res.end()
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.write(
        JSON.stringify({
          title: 'Not Found',
          message: `Error: Movie with id: ${id} not found`,
        }),
      )
      res.end()
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ title: 'Not Found', message: 'Error: Not Found' }))
  }
}
