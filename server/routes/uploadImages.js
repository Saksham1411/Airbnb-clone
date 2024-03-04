const express = require('express');
const router = express.Router();
const multer = require('multer');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const DatauriParser = require('datauri/parser');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

router.post('/uploadByLink', async (req, res) => {
    const { link } = req.body;
    if (!link) return res.status(StatusCodes.BAD_REQUEST).send('fill all the fields');

    const result = await cloudinary.uploader.upload(link);
    res.status(201).send(result.url);
})

const storage = multer.memoryStorage();

const photosMiddleware = multer({ storage });
const parser = new DatauriParser();

router.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const extName = path.extname(req.files[i].originalname).toString();
        const file = parser.format(extName, req.files[i].buffer);
        
        const result = await cloudinary.uploader.upload(file.content);
        uploadedFiles.push(result.url);
    }
    res.status(201).send(uploadedFiles);
})

module.exports = router;