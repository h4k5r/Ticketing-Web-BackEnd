const User = require('../../models/User');
exports.getProfileSettings = (req, res, next) => {
    const email = req.email;
    User.findOne({
        email:email
    })
        .then(user => {
            if(!user) {
                res.json({
                    error:true,
                    errorMessage:'No user with the logged in email found'
                });
                return Promise.reject('no user Found')
            }
            const name = user.name? user.name : '';
            res.json({
                name:name
            });
        })
        .catch(err => {
            console.log(err);
        })
}
exports.postProfileSettings = (req, res, next) => {
    const name = req.body.name;
    const email = req.email;
    User.findOne({email:email})
        .then(user => {
            if(!user) {
                res.json({
                    error:true,
                    errorMessage:'No user with the logged in email found'
                });
                return Promise.reject('no user Found')
            }
            user.name = name;
            return user.save();
        })
        .then(savedUser => {
            res.json({
                message:`updated name for the user ${savedUser.email}`,
                error:false
            })
        })
        .catch(err => {
            console.log(err);
        })

}