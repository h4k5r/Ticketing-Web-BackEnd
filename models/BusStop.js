const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('BusStop', busStopSchema)