const express = require('express')
const path = require('path')
const app = express()

app.use(express.json()); // body-parser for JSON

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/hello', function (req, res) {
  res.send('Hello world')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000')
})