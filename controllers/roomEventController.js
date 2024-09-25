const RoomEvent = require("../models/RoomCalendarEvent.js")

// GET
exports.fetchAllRoomEvents = async (req, res) => {
    const { minDate, maxDate } = req.query
    const roomId = req.params.roomId
    if (!roomId) {
        return res.status(400).json({
            status: 'fail',
            message: 'roomId is required'
        })
    }

    try {
        const query = {
            roomId: roomId,
            $or: [
                { startDate: { $gte: new Date(minDate), $lte: new Date(maxDate) } },
                { endDate: { $gte: new Date(minDate), $lte: new Date(maxDate) } },
                { startDate: { $lte: new Date(minDate) }, endDate: { $gte: new Date(maxDate) } }
            ]
        }

        const events = await RoomEvent.find(query)

        res.status(200).json({
            events,
            totalNumber: events.length
        })
    } catch (err) {
        console.error('Error fetching events:', err)
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

// POST
exports.createRoomEvent = async (req, res) => {
    try {
        const newRoomEvent = await RoomEvent.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                roomEvent: newRoomEvent,
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        await RoomEvent.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const roomEvent = await RoomEvent.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                roomEvent
            }
        })
    } catch (err) {
        console.error('Error updating event:', err)
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}
