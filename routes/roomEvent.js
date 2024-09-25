const express = require('express')

const roomEventController = require("../controllers/roomEventController.js")
const router = express.Router()

router
    .route('/')
    .post(roomEventController.createRoomEvent)

router
    .route('/room/:roomId')
    .get(roomEventController.fetchAllRoomEvents)

router
    .route('/:id')
    .delete(roomEventController.deleteEvent)
    .post(roomEventController.updateEvent)

module.exports = router