const Staff = require('../../models/Staff');
const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.getStaffWithId = (req,res,next) => {
    const _id = req.params.id;
    Staff.findById(_id)
        .then(staff => {
            res.json({
                email:staff.email
            })
        })
        .catch(err => {
            console.log(err)
        });
}
exports.getAssignedBus = (req, res, next) => {
    const _id = req.params.staffId;
    Staff.findById(_id)
        .then(staff => {
            return res.json({
                staff: {
                    assignedBus:staff.assignedBus
                }
            });
        })
        .catch(err => {
            console.log(err);
        })

}

exports.postSearchStaff = (req, res, next) => {
    const staffEmail = req.body.staffEmail || '';
    if (!(staffEmail.trim().length > 0)) {
        return res.json({
            test: 'no valid params'
        });
    }
    // fetch staff from database staff email
    Staff.find({
        email: staffEmail
    })
        .then(staffs => {
            if(!(staffs.length > 0)) {
                res.status(404).json({
                    message:'No staff With the given Mail'
                });
                return Promise.reject('No staff Found')
            }
            return res.json({
                _id: staffs[0]._id,
                staffEmail: staffs[0].email,
            });
        })
        .catch(err => {
            console.log(err);
        })

}

exports.postAddNewStaff = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    let staff;
    Staff.find({
        email: email
    })
        .then(existingStaff => {
            if (existingStaff.length > 0) {
                res.status(200).json({
                    message: 'Staff Already with the given Mail Exists'
                });
                return Promise.reject('Staff Account Exists')
            } else {
                return bcrypt.hash(password, saltRounds)
            }
        })
        .then(hashedPassword => {
            staff = new Staff({
                email: email,
                password: hashedPassword,
                assignedBus: ''
            })
            return staff.save()
        })
        .then(savedStaff => {
            res.status(200).json({
                message: 'added staff',
                staff: savedStaff.email
            })
        })
        .catch(err => {
            console.log(err)
        })
    console.log()

}

exports.putResetPassword = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    Staff.find({
        email: email
    })
        .then(staffs => {
            if (!(staffs.length > 0)) {
                res.status(200).json({
                    message: 'No staff With the given Mail'
                });
                return Promise.reject('No staff Found')
            } else {
                return bcrypt.hash(password, saltRounds)
            }
        })
        .then(hashedPassword => {
            return Staff.findOneAndUpdate(
                {email: email},
                {password: hashedPassword}
            )
        })
        .then(savedStaff => {
            res.status(200).json({
                message: 'Saved staff',
                staff: savedStaff.email
            });
        })
        .catch(err => {
            console.log(err);
        })

}

exports.putChangeBus = (req, res, next) => {
    const mode = req.body.mode;
    const staffId = req.body.staffId;
    if (mode === 'remove') {
        Staff.findByIdAndUpdate(staffId, {
            assignedBus: ''
        })
            .then(staff => {
                res.status(200).json({
                    message: 'Removed Bus',
                    staff: staff.email,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    if (mode === 'change') {
        const busNumber = req.body.busNumber;
        Staff.findByIdAndUpdate(staffId, {
            assignedBus: busNumber
        })
            .then(staff => {
                res.status(200).json({
                    message: 'changed Bus',
                    staff: staff.email,
                    busNumber: busNumber
                })
            })
            .catch(err => {
                console.log(err);

            })
    }
    console.log(req.body)

}

exports.deleteStaff = (req, res, next) => {
    const _id = req.params.staffId;
    Staff.findByIdAndDelete(_id)
        .then(deletedStaff => {
            res.status(200).json({
                message: 'deleted staff',
                staffMail: deletedStaff.email
            })
        })
        .catch(err => {
            console.log(err)
        })
}