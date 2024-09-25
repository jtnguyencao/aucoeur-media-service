const mongoose = require('mongoose')
const roomEventSchema = mongoose.Schema(
    {
        roomId: {
            type: String,
            required: [true, 'Room Event must have roomId'],
        },
        type: {
            type: Number,
            required: [true, 'Room Event must have type'],
        },
        note: {
            type: String,
            trim: true,
        },
        occupants: {
            type: Number,
            default: 0,
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now(),
        },
    }
)
module.exports = mongoose.model('roomEvent', roomEventSchema)
