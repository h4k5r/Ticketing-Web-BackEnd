const express = require('express');

const authController = require('../controllers/AuthController/AuthController')
const router = express.Router();

router.post('/createUser',authController.postCreateAccountEmail);
router.post('/emailAuth',authController.postAuthUserWithEmailAndPassword);

router.get('/newPassword/:token',authController.getNewPassword);
router.post('/newPassword/:token',authController.postNewPassword);
router.post('/resetPassword',authController.postResetPassword);

router.post('/phoneAuth',authController.postPhoneAuthentication);
router.post('/otpVerify',authController.postOTPAuthentication);

router.get('/validateToken',authController.validateToken);


module.exports = router;
