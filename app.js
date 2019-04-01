const http = require('http')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Collections:A')
  res.end()
})

http.createServer(app).listen(8888, () => console.log(`listening on port:8888`))
