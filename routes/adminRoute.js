const express = require('express');

const BusesController = require('../controllers/adminController/BusesController');
const StopsController = require('../controllers/adminController/StopsController');
const StaffController = require('../controllers/adminController/StaffController');
const UsersController = require('../controllers/adminController/UsersController');

const router = express.Router();

// /searchBuses routes
router.post('/searchBuses',BusesController.postSearchBuses);

// /searchStops routes
router.post('/searchStops',StopsController.postSearchStops);

// /searchStaff routes
router.post('/searchStaff',StaffController.postSearchStaff);

// /searchUsers routes
router.post('/searchUsers',UsersController.postSearchUsers);

module.exports = router;