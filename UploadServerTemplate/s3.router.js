const express = require('express');
const s3Router = express.Router();
const multer = require('multer');
const memoryUpload = multer({ storage: multer.memoryStorage() });
const { putObject, initializeS3, getObject} = require("./aws.module");

initializeS3(); // Initialize S3 client


// Add your routers here
s3Router.post('/image',memoryUpload.single('avatar'), async (req, res) => {
    console.log(req.file); // Log the file information to the console

    const fileId = await putObject(req.file);

    res.send({
        message: "Ok",
        fileId: fileId,
    })
})

s3Router.get('/image/:fileId', async (req, res) => {
    const fileId = req.params.fileId;
    const result = await getObject(fileId);
    console.log('result: ', typeof result.Body);

    res.setHeader('Content-Type', result.Metadata.content_type);
    result.Body.pipe(res); // Pipe the S3 response to the client
})

module.exports = s3Router;