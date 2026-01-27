const express = require('express')

const accommodationController = require("../controllers/accommodationController.js")
const router = express.Router()

// Public read-only routes - no authentication required
router
    .route('/application/:applicationId')
    .get(accommodationController.fetchAllAccommodations)

router
    .route('/:id')
    .get(accommodationController.getAccommodation)

module.exports = router
