const express = require('express')

const roomController = require("../controllers/roomController.js")
const router = express.Router()

router
    .route('/')
    .post(roomController.createRoom)

router
    .route('/application/:applicationId')
    .get(roomController.fetchAllRooms)

router
    .route('/:id')
    .get(roomController.getRoom)
    .post(roomController.updateRoom)
    .delete(roomController.deleteRoom)

module.exports = router