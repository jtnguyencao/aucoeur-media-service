const express = require('express')

const roomController = require("../controllers/roomController.js")
const router = express.Router()

// Public read-only routes - no authentication required
router
    .route('/application/:applicationId')
    .get(roomController.fetchAllRooms)

router
    .route('/:id')
    .get(roomController.getRoom)

module.exports = router
