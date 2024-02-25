const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

router.post('/booking',async(req,res)=>{
    const{
        place,checkIn,checkOut,numberOfGuests,name,phone,price
    } = req.body;
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    const bookDetail = await Booking.create({
        user:payload.userId,place,checkIn,checkOut,numberOfGuests,name,phone,price
    })

    res.send(bookDetail);
})

router.get('/booking',async(req,res)=>{
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    const bookings = await Booking.find({user:payload.userId}).populate('place');
    res.send(bookings);
})
router.get('/booking/:id',async(req,res)=>{
    const {id} = req.params;
    // console.log(id);
    const booking = await Booking.findOne({_id:id}).populate('place');
    // console.log(booking);
    res.send(booking);
})

module.exports = router;