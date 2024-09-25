const mongoose = require('mongoose')
const AccommodationSchema = mongoose.Schema(
    {
        applicationId: {
            type: String,
            required: [true, 'Accommodation must have applicationId'],
        },
        name: {
            type: String,
            unique: true,
            required: [true, 'Accommodation must have name'],
            trim: true,
        },
        numBeds: {
            type: Number,
            required: [true, 'Accommodation must have number of beds']
        },
        capacity: {
            type: Number,
            required: [true, 'Accommodation must have capacity']
        },
        house: {
            type: Number,
            default: 1
        },
        type: {
            type: Number,
            default: 1
        },
        rating: Number,
        price: {
            type: Number,
            default: 0
        },
        active: {
            type: Boolean,
            default: true
        },
        description: {
            type: String,
            trim: true,
        },
        additionalImages: [String],
        cover: String,
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    }
)
module.exports = mongoose.model('Accommodation',AccommodationSchema)