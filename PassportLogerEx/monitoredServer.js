const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.get('/hello', function (req, res) {
    res.send('Hello World')
})

// Error handling middleware
app.use(function (err, req, res, next) {

    console.error(err.stack)
    
    if(err.message){
        res.status(500)
        res.send({message: err.message})
    } else {
        res.status(500)
        res.send({message: "Internal server error"})
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})