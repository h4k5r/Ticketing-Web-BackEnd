exports.postSearchUsers = (req, res, next) => {
    const userEmail = req.body.userEmail || '';
    const userPhone = req.body.userPhone || '';
    const isUserEmail = userEmail.trim().length > 0
    const isUserPhone = userPhone.trim().length > 0;
    if (isUserEmail) {
        // fetch user from database using email
        return res.json({
            userEmail: userEmail,
        });
    }
    if (isUserPhone) {
        // fetch user from database using phone number
        return res.json({
            userPhone: userPhone
        });
    }
    return res.json({
        test: 'no valid params'
    });
}
exports.postViewHistory = (req, res, next) => {

}
exports.postResetPassword = (req, res, next) => {

}
exports.deleteUser = (req, res, next) => {

}