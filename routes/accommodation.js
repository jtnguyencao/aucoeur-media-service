const express = require('express')

const accommodationController = require("../controllers/accommodationController.js")
const router = express.Router()

router
    .route('/')
    .post(accommodationController.createAccommodation)

router
    .route('/application/:applicationId')
    .get(accommodationController.fetchAllAccommodations)

router
    .route('/:id')
    .get(accommodationController.getAccommodation)
    .post(accommodationController.updateAccommodation)
    .delete(accommodationController.deleteAccommodation)

module.exports = router