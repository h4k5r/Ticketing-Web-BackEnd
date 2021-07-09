const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: false
    },
    verificationToken: {
        type: String,
        required: false
    },
    otp: {
        type: Number,
        required: false
    },
    otpValidity: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: false
    },
    resetToken: {
        type: {
            token: {
                type: String,
                required: false
            },
            expiry: {
                type: String,
                required: false
            }
        },
        required: false
    },
    tickets: {
        type: [
            {
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
            }
        ],
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);