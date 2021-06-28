const express = require('express');

const BusesController = require('../controllers/adminController/BusesController');
const StopsController = require('../controllers/adminController/StopsController');
const StaffController = require('../controllers/adminController/StaffController');
const UsersController = require('../controllers/adminController/UsersController');

const router = express.Router();

// /Buses routes
router.post('/searchBuses',BusesController.postSearchBuses);
router.get('/searchBus/:busId',BusesController.getBus);
router.post('/addNewBus',BusesController.postAddNewBus);
router.post('/editBus',BusesController.postEditBus);

// /Stops routes
router.post('/searchStops',StopsController.postSearchStops);
router.get('/searchStop/:stopId',StopsController.getStop)

// /Staff routes
router.post('/searchStaff',StaffController.postSearchStaff);

// /Users routes
router.post('/searchUsers',UsersController.postSearchUsers);

module.exports = router;