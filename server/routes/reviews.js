const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');
const { StatusCodes } = require('http-status-codes');

router.post('/review', async (req, res) => {
    const { content,placeId } = req.body;
    if(!content) return res.status(StatusCodes.BAD_REQUEST).send('fill all the fields');
    const { token } = req.cookies;
    if (!token) res.status(StatusCodes.BAD_REQUEST).send('Not Logged in');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const review = await Review.create({userId,content,placeId});
    res.status(StatusCodes.CREATED).send(review);
})

//get all reviews for a place
router.get('/review/:id',async(req,res)=>{
    const {id} = req.params;
    const reviews = await Review.find({placeId:id}).populate('userId');
    res.status(StatusCodes.OK).send(reviews);
})
module.exports = router;