const express = require('express');
const router = express.Router();
const Places = require('../models/Place');
const jwt = require('jsonwebtoken');

router.post('/places', async (req, res) => {
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { title, address, addedPhotos: photos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price } = req.body;
    // console.log(req.body);
    const place = await Places.create({
        owner: payload.userId,
        title, address, photos,
        description, perks, extraInfo, checkIn, checkOut, maxGuests,price
    })
    res.send(place);
})

// all places
router.get('/places',async(req,res)=>{
    const places = await Places.find({});
    // console.log('fefew');
    res.json({places});

})


//places for specific user
router.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.send('Not Authorized');
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const places = await Places.find({owner:userId});

    res.send(places);
})

router.get('/places/:placeId',async(req,res)=>{
    const {placeId} = req.params;
    const place = await Places.findOne({_id:placeId});
    res.send(place);
})

router.put('/places/:placeId',async(req,res)=>{
    const { token } = req.cookies;
    const {placeId} = req.params;
    // console.log(placeId);
    const { title, address, addedPhotos: photos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price } = req.body;
    if (!token) {
        return res.send('Not Authorized');
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const place = await Places.findOne({_id:placeId});
    // console.log(place.owner,"  ",userId);
    if(place.owner.equals(userId)){
        await Places.findOneAndUpdate({_id:placeId},{
            owner: userId,
            title, address, photos,
            description, perks, extraInfo, checkIn, checkOut, maxGuests,price
        })
        // console.log('done');
        return res.send('updated');

    }
    res.send('bad request');
})

//delete a specific page
router.delete('/places/:placeId',async(req,res)=>{
    const {placeId} = req.params;

    const place = await Places.deleteOne({_id:placeId});
    res.send('delete');
})

module.exports = router;