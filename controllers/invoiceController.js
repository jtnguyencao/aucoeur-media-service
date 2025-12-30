const Invoice = require("../models/Invoice.js")

// GET
exports.fetchAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ applicationId: req.params.applicationId })
        res.status(200).json({
            invoices,
            totalNumber: invoices.length
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            invoice
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

// POST
exports.createInvoice = async (req, res) => {
    try {
        console.log('Creating invoice with data:', req.body);
        const newInvoice = await Invoice.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                invoice: newInvoice,
            }
        })
    } catch (err) {
        console.error('Error creating invoice:', err);
        if (err.code === 11000) {
            console.log('Duplicate key error details:', err.keyValue);
            res.status(400).json({
                status: 'fail',
                message: 'INVOICE_ALREADY_EXISTS',
                details: err.keyValue
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

exports.updateInvoice = async (req, res) => {
    try {
        console.log('Updating invoice:', req.params.id, 'with data:', req.body);
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        if (!invoice) {
            return res.status(404).json({
                status: 'fail',
                message: 'Invoice not found',
            })
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                invoice
            }
        })
    } catch (err) {
        console.error('Error updating invoice:', err);
        if (err.code === 11000) {
            console.log('Duplicate key error details:', err.keyValue);
            res.status(400).json({
                status: 'fail',
                message: 'INVOICE_ALREADY_EXISTS',
                details: err.keyValue
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

exports.deleteInvoice = async (req, res) => {
    try {
        await Invoice.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}