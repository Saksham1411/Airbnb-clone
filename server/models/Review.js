const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema);