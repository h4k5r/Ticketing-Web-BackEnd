const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    busId: {
        type: String,
        required: true
    },
    busNumber: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    numberOfTickets: {
        type: String,
        required: true
    },
    bookedTime: {
        type: String,
        required: true
    },
    hasUsed: {
        type: Boolean,
        required: true
    }
},{timestamps:true});
module.exports = mongoose.model('Ticket',ticketSchema);