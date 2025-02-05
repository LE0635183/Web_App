const express = require('express')
const path = require('path')
const app = express()

// path.join is used the right way to join the path from the os used
// /static is the path used in the browser to access the public folder
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', express.static(path.join(__dirname, 'dist')))


// get this for the server
app.get('/hello', function (req, res) {
  res.send('Hello World')
})

// path params exemple
app.get('/users/:userId/books/:bookId', function (req, res) {
    console.log(req.params)
    res.send('OK')
})

// query params exemple
app.get('/cars', function (req, res) {
    console.log(req.query)
    res.send('query recieved')
})

// this is the port used for the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})