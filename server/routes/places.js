const express = require('express');
const router = express.Router();
const Places = require('../models/Places');
const jwt = require('jsonwebtoken');
router.post('/places', async (req, res) => {
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { title, address, addedPhotos: photos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body;
    console.log(req.body);
    const place = await Places.create({
        owner:payload.userId,
        title, address,photos,
        description, perks, extraInfo, checkIn, checkOut, maxGuests
    })
    res.send(place);
})

module.exports = router;