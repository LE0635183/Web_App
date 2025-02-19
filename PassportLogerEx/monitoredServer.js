const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const morgan = require('morgan')
const { schedualLogJob } = require('./memory_cron.service')

const pathToAccessLog = path.join(__dirname, 'logs/request_combined.log')
const accessLogStream = fs.createWriteStream(pathToAccessLog, { flags: 'a' })
const logsAuth = { username: "admin", password: "admin" }

app.use(morgan('combined', { stream: accessLogStream }))

app.use("/logs", function (req, res, next) {
    console.log('req.headers.authorization: ', req.headers.authorization);
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if ( username === logsAuth.username && password === logsAuth.password ) {
       return next()
    }else {
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"')
        res.status(401).send('Authentication required.')
    }
})

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