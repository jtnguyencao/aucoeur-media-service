const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()

// Set up connection event listeners ONCE at module level (before any connection)
mongoose.connection
    .on('error', (err) => {
        console.error('❌ MongoDB connection error:', err.message)
    })
    .on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected')
    })
    .once('open', () => {
        console.log('✅ MongoDB connected successfully')
    })

const connectToMongo = () => {
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI is not set in environment variables')
        return
    }

    // Don't reconnect if already connected or connecting
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        return
    }

    try {
        mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message)
    }
}

// Connect on module load
connectToMongo()

module.exports = connectToMongo
