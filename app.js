import http from 'http'
import express from 'express'

import 'models/database'
import config from 'config'

import { user } from 'routes'

const { server: { port } } = config

const app = express()

app.use(user)

app.get('/', (req, res) => {
  res.send('Collections:Anime')
  res.end()
})

http.createServer(app)
  .listen(port, () => console.log(`app is listening on port:${port}`))
  .on('error', e => console.log(e.message))
