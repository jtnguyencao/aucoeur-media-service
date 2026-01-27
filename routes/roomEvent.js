const express = require('express')

const roomEventController = require("../controllers/roomEventController.js")
const router = express.Router()

// Protected write routes - authentication required
// Only update and delete require authentication (back office operations)
router
    .route('/:id')
    .delete(roomEventController.deleteEvent)
    .post(roomEventController.updateEvent)

module.exports = router