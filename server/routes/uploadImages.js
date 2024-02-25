const express = require('express');
const router = express.Router();
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

router.post('/uploadByLink', async (req, res) => {
    const { link } = req.body;
    // console.log(link);
    const newName = Date.now()+'.jpg';
    options = {
        url: link,
        dest: 'E:/web project/AirBnB-clone/server/uploads/'+Date.now()+'.jpg',
    };
    const filename = await download.image(options);
    res.status(201).send('/uploads/'+newName);
})

const photosMiddleware = multer({dest:'uploads'});

router.post('/upload',photosMiddleware.array('photos',100) ,async (req,res)=>{
    // console.log(req.files);
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const{path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\','/uploads/'));
    }
    res.send(uploadedFiles);
})

module.exports = router;