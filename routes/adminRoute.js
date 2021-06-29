const express = require('express');

const BusesController = require('../controllers/adminController/BusesController');
const StopsController = require('../controllers/adminController/StopsController');
const StaffController = require('../controllers/adminController/StaffController');
const UsersController = require('../controllers/adminController/UsersController');

const router = express.Router();

// /Buses routes
router.get('/searchBus/:busId', BusesController.getBus);
router.post('/searchBuses', BusesController.postSearchBuses);
router.post('/addNewBus', BusesController.postAddNewBus);
router.put('/editBus', BusesController.putEditBus);
router.delete('/deleteBus/:busId',BusesController.deleteBus)

// /Stops routes
router.get('/searchStop/:stopId', StopsController.getStop);
router.post('/searchStops', StopsController.postSearchStops);
router.post('/addNewStop', StopsController.postAddNewStop);
router.put('/editStop', StopsController.putEditStop);
router.delete('/deleteStop/:stopId', StopsController.deleteStop);

// /Staff routes
router.post('/searchStaffs', StaffController.postSearchStaff);
router.post('/addNewStaff',StaffController.postAddNewStaff);
router.put('/resetStaff', StaffController.putResetPassword);
router.put('/changeBus', StaffController.putChangeBus);
router.delete('/deleteStaff/:staffId', StaffController.postDeleteStaff);

// /Users routes
router.get('/userHistory/:userId', UsersController.getViewHistory);
router.post('/searchUser', UsersController.postSearchUsers);
router.post('/addNewUser',UsersController.addNewUser);
router.put('/resetUser', UsersController.putResetPassword);
router.delete('/deleteUser/:userId', UsersController.deleteUser);

module.exports = router;