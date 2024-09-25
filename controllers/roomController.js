const Room = require("../models/Room.js")

// GET
exports.fetchAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ applicationId: req.params.applicationId })
        res.status(200).json({
            rooms,
            totalNumber: rooms.length
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            room
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

// POST
exports.createRoom = async (req, res) => {
    try {
        const newRoom = await Room.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                room: newRoom,
            }
        })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'fail',
                message: 'ROOM_ALREADY_EXISTS',
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                room
            }
        })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                status: 'fail',
                message: 'ROOM_ALREADY_EXISTS',
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id)
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