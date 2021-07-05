const bcrypt = require('bcrypt');
const User = require('../../models/User');
const saltRounds = 12;
exports.getUserWithId = (req, res, next) => {
    const _id = req.params.id;
    User.findById(_id)
        .then(user => {
            res.json({
                email: user.email
            })
        })
        .catch(err => {
            console.log(err)
        });
}
exports.getViewHistory = (req, res, next) => {
    const userId = req.params.userId;
    console.log(req.params)
    User.findById(userId)
        .then(user => {
            res.status(200).json(user.tickets)
        })
        .catch(err => {
            console.log(err)
        })
}
exports.postSearchUsers = (req, res, next) => {
    const userEmail = req.body.userEmail || '';
    const userPhone = req.body.userPhone || '';
    const isUserEmail = userEmail.trim().length > 0
    const isUserPhone = userPhone.trim().length > 0;
    if (!(isUserEmail || isUserPhone)) {
        return res.json({
            test: 'no valid params'
        });
    }
    if (isUserEmail) {
        // fetch user from database using email
        User.findOne({email: userEmail})
            .then(user => {
                if(!user) {
                    return Promise.reject('No user Found')
                }
                return res.json({
                    userEmail: user.email,
                    userId: user._id
                });
            })
            .catch(err => {
                console.log(err)
            })

    }
    if (isUserPhone) {
        // fetch user from database using phone number
        User.findOne({phone: userPhone})
            .then(user => {
                if(!user) {
                    return Promise.reject('No user Found')
                }
                return res.json({
                    phone: user.phone,
                    userId: user._id
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

}
exports.postAddNewUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.find({
        email: email
    })
        .then(users => {
            if (users.length > 0) {
                res.status(200).json({
                    message: 'User Already Exists'
                })
                return Promise.reject('User Exists');
            }
            return bcrypt.hash(password, saltRounds);
        })
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword
            })
            return user.save();
        })
        .then(savedUser => {
            res.status(200).json({
                message: 'added User',
                user: savedUser.email
            })
        })
        .catch(err => {
            console.log(err)
        })
    console.log(req.body)

}

exports.putResetPassword = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.find({email: email})
        .then(users => {
            if (!users.length > 0) {
                res.status(404).json({
                    message: 'No user Found with the given Email Found'
                });
                return Promise.reject('No user found')
            }
            return bcrypt.hash(password, saltRounds)
        })
        .then(hashedPassword => {
            return User.findOneAndUpdate({email: email}, {password: hashedPassword})
        })
        .then(updatedUser => {
            res.status(200).json({
                message: 'user password reset',
                userEmail: updatedUser.email
            });
        })
        .catch(err => {
            console.log(err);
        })
}
exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId
    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            res.status(200).json({
                message: "User Deleted"
            })
        })
        .catch(err => {
            console.log(err)
        })


}