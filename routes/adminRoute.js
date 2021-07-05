const express = require('express');

const BusesController = require('../controllers/AdminController/BusesController');
const StopsController = require('../controllers/AdminController/StopsController');
const StaffController = require('../controllers/AdminController/StaffController');
const UsersController = require('../controllers/AdminController/UsersController');

const router = express.Router();

// /Buses routes
router.get('/searchBus/:busId', BusesController.getBus);
router.post('/searchBuses', BusesController.postSearchBuses);
router.post('/addNewBus', BusesController.postAddNewBus);
router.put('/editBus', BusesController.putEditBus);
router.delete('/deleteBus/:busId', BusesController.deleteBus)

// /Stops routes
router.get('/searchStop/:stopId', StopsController.getStop);
router.post('/searchStops', StopsController.postSearchStops);
router.post('/addNewStop', StopsController.postAddNewStop);
router.put('/editStop', StopsController.putEditStop);
router.delete('/deleteStop/:stopId', StopsController.deleteStop);

// /Staff routes
router.get('/getAssignedBus/:staffId', StaffController.getAssignedBus);
router.get('/searchStaff/:id', StaffController.getStaffWithId);
router.post('/searchStaffs', StaffController.postSearchStaff);
router.post('/addNewStaff', StaffController.postAddNewStaff);
router.put('/resetStaff', StaffController.putResetPassword);
router.put('/changeBus', StaffController.putChangeBus);
router.delete('/deleteStaff/:staffId', StaffController.deleteStaff);

// /Users routes
router.get('/userHistory/:userId', UsersController.getViewHistory);
router.get('/searchUser/:id', UsersController.getUserWithId);
router.post('/searchUser', UsersController.postSearchUsers);
router.post('/addNewUser', UsersController.postAddNewUser);
router.put('/resetUser', UsersController.putResetPassword);
router.delete('/deleteUser/:userId', UsersController.deleteUser);

module.exports = router;