const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,

    },
    phone: {
        required: true,
        type: String,
    },
    price:{
        type:Number,
    },
    numberOfGuests:{
        type:Number,
    }

});

module.exports = mongoose.model('Booking',bookingSchema);