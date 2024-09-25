const Accommodation = require("../models/Accommodation.js")

// GET
exports.fetchAllAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find({ applicationId: req.params.applicationId })
        res.status(200).json({
            accommodations,
            totalNumber: accommodations.length
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            accommodation
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

// POST
exports.createAccommodation = async (req, res) => {
    try {
        const newAccommodation = await Accommodation.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                accommodation: newAccommodation,
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

exports.updateAccommodation = async (req, res) => {
    try {
        const accommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                accommodation
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

exports.deleteAccommodation = async (req, res) => {
    try {
        await Accommodation.findByIdAndDelete(req.params.id)
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