const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true
    },
    stops: {
        type: [{
            _id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    assignedAccount: {
        type:String,
        required:false
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Bus', busSchema)