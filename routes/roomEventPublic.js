const express = require('express')

const roomEventController = require("../controllers/roomEventController.js")
const router = express.Router()

// Public routes - no authentication required
// Front office needs to create reservations (events) without authentication
router
    .route('/')
    .post(roomEventController.createRoomEvent)

// Public read-only routes
router
    .route('/room/:roomId')
    .get(roomEventController.fetchAllRoomEvents)

module.exports = router
