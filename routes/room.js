const express = require('express')

const roomController = require("../controllers/roomController.js")
const router = express.Router()

// Protected write routes - authentication required
router
    .route('/')
    .post(roomController.createRoom)

router
    .route('/:id')
    .post(roomController.updateRoom)
    .delete(roomController.deleteRoom)

module.exports = router