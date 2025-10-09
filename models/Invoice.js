const mongoose = require('mongoose')

const SubProductSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  unit: { type: String, default: '' },
}, { _id: false })

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  subProducts: { type: [SubProductSchema], default: [] },
}, { _id: false })

const invoiceSchema = new mongoose.Schema({
  applicationId: { type: String, required: [true, 'Invoice must have applicationId'] },
  title: { type: String },
  invoiceNumber: { type: String, unique: true, sparse: true },
  date: { type: Date },
  validityDate: { type: Date },
  projectStartDate: { type: Date },
  daysToComplete: { type: Number },
  customerName: { type: String },
  customerAddress: { type: String },
  customerSiren: { type: String },
  customerTva: { type: String },
  customerHasMaterials: { type: Boolean, default: false },
  items: { type: [InvoiceItemSchema], default: [] },
  tva: { type: Number },
  acompte: { type: Number },
  resteDu: { type: Number },
  invoiceType: { type: String, enum: ['devis', 'facture'] },
  totalHT: { type: Number },
  totalTTC: { type: Number },
  remiseValue: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('invoice', invoiceSchema)