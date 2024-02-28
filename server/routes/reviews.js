const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');

router.post('/review', async (req, res) => {
    const { content,placeId } = req.body;
    const { token } = req.cookies;
    if (!token) res.status(501).send('Not Logged in');
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const review = await Review.create({userId,content,placeId});
    res.send(review);
})

//get all reviews for a place
router.get('/review/:id',async(req,res)=>{
    const {id} = req.params;
    const reviews = await Review.find({placeId:id}).populate('userId');
    res.send(reviews);
})
module.exports = router;