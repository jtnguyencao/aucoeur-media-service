const express = require('express')

const accommodationController = require("../controllers/accommodationController.js")
const router = express.Router()

// Protected write routes - authentication required
router
    .route('/')
    .post(accommodationController.createAccommodation)

router
    .route('/:id')
    .post(accommodationController.updateAccommodation)
    .delete(accommodationController.deleteAccommodation)

module.exports = router