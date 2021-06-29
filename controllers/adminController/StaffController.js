exports.postSearchStaff = (req, res, next) => {
    const staffEmail = req.body.staffEmail || '';
    if (staffEmail.trim().length > 0) {
        // fetch staff from database staff email
        return res.json({
            _id:"sdlkfsld",
            staffEmail: staffEmail,
        });
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.postAddNewStaff = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(req.body)
    res.status(200).json({
        message:'added staff'
    })
}
exports.putResetPassword = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(req.body)
    res.status(200).json({
        message:'staff password reset'
    });
}
exports.putChangeBus = (req, res, next) => {
    const mode = req.body.mode;
    const staffId = req.body.staffId;
    if(mode === 'remove') {

    }
    if(mode === 'change') {
        const busNumber = req.body.busNumber;
    }
    console.log(req.body)
    res.status(200).json({
        message:'changed Bus'
    })
}
exports.postDeleteStaff = (req, res, next) => {
    const _id = req.params.staffId;
    console.log(req.params)
    res.status(200).json({
        message:'deleted staff'
    })
}