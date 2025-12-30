const express = require('express')

const invoiceController = require("../controllers/invoiceController.js")
const router = express.Router()

router
    .route('/')
    .post(invoiceController.createInvoice)

router
    .route('/application/:applicationId')
    .get(invoiceController.fetchAllInvoices)

router
    .route('/:id')
    .get(invoiceController.getInvoice)
    .post(invoiceController.updateInvoice)
    .delete(invoiceController.deleteInvoice)

module.exports = router