require('dotenv').config();
const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan');
const uploadRouter = require('./upload.router');
const s3Router = require('./s3.router');

// 1 - Logger middleware
app.use(morgan('tiny'))

// 2 - Body-parser middleware
app.use(express.json()); // body-parser for JSON


// 3 - Routers
// TODO: Add your routers here

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/uploads', uploadRouter)

app.use('/s3', s3Router)

// 5 - Error handling middleware
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

const PORT = process.env.PORT || 3001
app.listen(PORT, async () => {
    // connect to a database
    console.log('Server is running on port ' + PORT)
})