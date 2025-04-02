const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + file.originalname.replace(/\s+/g, '_');
        cb(null, uniqueSuffix)
    }
})

const uploadCustom = multer({ storage: storage });


//Add your routers here
const formDataKey = 'avatar';
uploadRouter.post('/avatar', uploadCustom.single(formDataKey), (req, res) => {
    // Handle the uploaded file here
    console.log(req.file); // The uploaded file information
    res.send({
        message: 'File uploaded successfully',
        fileId: req.file.filename,
    })
})

uploadRouter.get('/avatar/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;

    res.sendFile(path.join(__dirname,filePath));

})



module.exports = uploadRouter;