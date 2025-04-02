const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


//Add your routers here
uploadRouter.post('/avatar', upload.single('avatar'), (req, res) => {
    // Handle the uploaded file here
    console.log(req.file); // The uploaded file information
    res.send('Ok')
})



module.exports = uploadRouter;