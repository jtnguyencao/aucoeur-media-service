const mongoose = require('mongoose')
const roomSchema = mongoose.Schema(
    {
        applicationId: {
            type: String,
            required: [true, 'Room must have applicationId'],
        },
        name: {
            type: String,
            unique: true,
            required: [true, 'Room must have name'],
            trim: true,
        },
        floor: {
            type: Number,
            default: 0
        },
        numBeds: {
            type: Number,
            required: [true, 'Room must have number of beds']
        },
        capacity: {
            type: Number,
            required: [true, 'Room must have capacity']
        },
        type: {
            type: Number,
            default: 1
        },
        rating: Number,
        price: {
            type: Number,
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
module.exports = mongoose.model('room',roomSchema)