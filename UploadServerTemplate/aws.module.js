const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');
const BUCKET_NAME = process.env.BUCKET_NAME // Replace with your S3 bucket name

let client;

function initializeS3() {
    client = new S3Client({region: process.env.AWS_REGION});
}

async function putObject(file) {

    const fileId = uuidv4().toString();

    const fileObjectParams = {
        Bucket: BUCKET_NAME, 
        Key: fileId, 
        Body: file.buffer,
        Metadata: {
            content_type: file.mimetype
        },
    }

    const putObjectCommand = new PutObjectCommand(fileObjectParams);

    const response = await client.send(putObjectCommand)

    return fileId
}

async function getObject(fileId) {

    const getParams = {
        Bucket: BUCKET_NAME, 
        Key: fileId,
    }
    const getCommand = new GetObjectCommand(getParams);

    const result = await client.send(getCommand)
    console.log('result: ', typeof result.Body);

    return result;
}

module.exports = {
    initializeS3,
    putObject,
    getObject,
}