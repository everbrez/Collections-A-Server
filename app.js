import http from 'http'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Collections:Anime')
  res.end()
})

http.createServer(app)
  .listen(8888, () => console.log('listening on port:8888'))
  .on('error', e => console.log(e.message))
