const User = require('../../models/User')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const jwtKey = require('../../ApiKeys').jwtUserKey;
const jwtAdminKey = require('../../ApiKeys').jwtAdminKey;
const saltRounds = 12;
const jwtExpiry = 3600000;

exports.isAuthenticatedUser = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    try {
        const payload = jwt.verify(token, jwtKey);
        req.email = payload.email
        if (Date.now() > payload.exp) {
            res.json({
                email: payload.email,
                error: true
            });
            next();
        } else {
            res.json({
                error: true,
                errorMessage: 'Token Expired'
            })
        }
    } catch (e) {
        res.json({
            error: true,
            errorMessage: 'Invalid Token Not Authenticated'
        });
    }
}

exports.isAuthenticatedAdmin = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    try {
        const payload = jwt.verify(token, jwtKey);
        req.email = payload.email
        if (Date.now() > payload.exp) {
            res.json({
                email: payload.email,
                error: false,
            });
            next();
        } else {
            res.json({
                error: true,
                errorMessage: 'Token Expired'
            })
        }
    } catch (e) {
        res.json({
            error: true,
            errorMessage: 'Invalid Token Not Authenticated'
        })
    }
}

exports.postPhoneAuthentication = (req, res, next) => {
    const phone = req.body.phone;
    console.log(req.body);
    crypto.randomBytes(64, (err, buf) => {
        if (err) {
            return;
        }
        const token = buf.toString('hex');
        const OTP = Math.floor(Math.random() * 1000000);
        const validity = Date.now() + 3600000;
        User.findOne({phone: phone})
            .then(foundUser => {
                if (!foundUser) {
                    const newUser = new User({
                        phone: phone,
                        verificationToken: token,
                        otp: OTP,
                        otpValidity: validity
                    });
                    return newUser.save();
                }
                foundUser.verificationToken = token;
                foundUser.otp = OTP;
                foundUser.otpValidity = validity;
                return foundUser.save();
            })
            .then(savedUser => {
                return res.json({
                    message: `OTP sent to the Phone ${savedUser.phone}`,
                    verificationToken: savedUser.verificationToken
                });
                //send code
            })
            .catch(err => {
                console.log(err);
            })
    })
    //send request to a third party api with the phone number

}

exports.postOTPAuthentication = (req, res, next) => {
    const otp = req.body.otp;
    const receivedToken = req.body.token;
    console.log(req.body);
    User.findOne({
        verificationToken: receivedToken
    })
        .then(foundUser => {
            if (!foundUser) {
                return res.json({
                    error: true,
                    errorMessage: 'No Users With the Token found',
                });
            }
            let token = jwt.sign(
                {
                    phone: foundUser.phone
                },
                jwtKey,
                {
                    algorithm: 'HS256',
                    expiresIn: jwtExpiry
                });
            res.json({
                message: `OTP Verified`,
                token: token
            });
            foundUser.verificationToken = ''
            foundUser.otp = 0;
            return foundUser.save()
        })
        .then(savedUser => {

        })
        .catch(err => {
            console.log(err);
        });
    //send request with the otp
    //create a new user if no user exists
}

exports.postAuthUserWithEmailAndPassword = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        email: email,
    })
        .then(foundUser => {
            bcrypt.compare(password, foundUser.password, (err, result) => {
                if (!result || err) {
                    return res.json({
                        message: '',
                        error: true,
                        errorMessage: 'User not Authenticatted'
                    });
                }
                let token = jwt.sign(
                    {
                        email: foundUser.email
                    },
                    jwtKey,
                    {
                        algorithm: 'HS256',
                        expiresIn: jwtExpiry
                    });
                if (foundUser.isAdmin) {
                    token = jwt.sign(
                        {
                            email: foundUser.email
                        },
                        jwtKey,
                        {
                            algorithm: 'HS256',
                            expiresIn: jwtAdminKey
                        })
                }
                res.json({
                    message: 'User Found',
                    token: token,
                    error: false,
                });
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postCreateAccountEmail = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.find({
        email: email
    })
        .then(users => {
            if (users.length > 0) {
                res.json({
                    message: '',
                    error: true,
                    errorMessage: 'User with the given email already Exists'
                })
                return Promise.reject('User Exists')
            }
            return bcrypt.hash(password, saltRounds)
        })
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword
            })
            return user.save();
        })
        .then(savedUser => {
            res.json({
                message: 'create User',
                email: savedUser.email,
                error: false,
                errorMessage: ''
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postResetPassword = (req, res, next) => {
    const email = req.body.email;
    console.log(req.body);
    crypto.randomBytes(64, (err, buf) => {
        if (err) {
            console.log(err);
        }
        const token = buf.toString('hex');
        console.log(token)
        User.findOne({email: email})
            .then(user => {
                if (!user) {
                    res.json({
                        message: '',
                        error: true,
                        errorMessage: 'No User with the given mail Found'
                    })
                    return Promise.reject('No User with given email')
                }
                //send email with the resetLink and save token
                user.resetToken = {
                    token: token,
                    expiry: Date.now() + 3600000,
                }
                return user.save();
            })
            .then(savedUser => {
                res.json({
                    message: `sent reset link to the mail ${savedUser.email}`,
                    error: false,
                    errorMessage: ''
                });
            })
            .catch(err => {
                console.log(err)
            });
    })
}

exports.getNewPassword = (req, res, next) => {
    const resetToken = req.params.token;
    User.findOne({'resetToken.token': resetToken})
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: 'No Users with the email found',
                    error: true
                })
                return Promise.reject('No User with given email');
            }
            if (user.resetToken.expiry < Date.now()) {
                res.status(400).json({
                    message: '',
                    error: true,
                    errorMessage: 'Reset Link Expired',
                })
                return Promise.reject('Reset Link Expired');
            }
            res.json({
                message: 'user found',
                error: false,
            });
        })
        .catch(err => {
            console.log(err)
        });
}

exports.postNewPassword = (req, res, next) => {
    const resetToken = req.params.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    let user;
    User.findOne({
        'resetToken.token': resetToken
    })
        .then(foundUser => {
            user = foundUser;
            if (!foundUser) {
                res.json({
                    message: '',
                    error: true,
                    errorMessage: 'No user with the token'
                })
                return Promise.reject('No user with token')
            }
            return bcrypt.hash(password, saltRounds);
        })
        .then(hashedPassword => {
            user.password = hashedPassword;
            user.resetToken = {
                token: '',
                expiry: ''
            }
            console.log(user)
            return user.save();
        })
        .then(savedUser => {
            res.json({
                message: 'password Reset',
                user: savedUser.email,
                error: false,
                errorMessage: ''
            })
        })
        .catch(err => {
            console.log(err);
        });
}

