const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    assignedBus:{
        type:String,
        required:false
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Staff', staffSchema)