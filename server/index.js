const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/test', (req, res) => {
    res.json('Hello World!')
  })

  app.listen(port)