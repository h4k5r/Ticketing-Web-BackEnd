exports.postSearchStaff = (req, res, next) => {
    const staffEmail = req.body.staffEmail || '';
    if (staffEmail.trim().length > 0) {
        // fetch staff from database staff email
        return res.json({
            staffEmail: staffEmail,
        });
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.postAddNewStaff = (req, res, next) => {

}
exports.postResetPassword = (req, res, next) => {

}
exports.postChangeBus = (req, res, next) => {

}
exports.postDeleteStaff = (req, res, next) => {

}