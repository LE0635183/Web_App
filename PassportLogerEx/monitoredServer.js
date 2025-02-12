const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const morgan = require('morgan')
const { schedualLogJob } = require('./memory_cron.service')

const pathToAccessLog = path.join(__dirname, 'logs/request_combined.log')
const accessLogStream = fs.createWriteStream(pathToAccessLog, { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))

app.use('/logs', express.static(path.join(__dirname, 'logs')))

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
    schedualLogJob.start()
    console.log('Server is running on port 3000')
})