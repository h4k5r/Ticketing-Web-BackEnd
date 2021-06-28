const express = require('express');

const BusesController = require('../controllers/adminController/BusesController');
const StopsController = require('../controllers/adminController/StopsController');
const StaffController = require('../controllers/adminController/StaffController');
const UsersController = require('../controllers/adminController/UsersController');

const router = express.Router();

// /Buses routes
router.post('/searchBuses', BusesController.postSearchBuses);
router.get('/searchBus/:busId', BusesController.getBus);
router.post('/addNewBus', BusesController.postAddNewBus);
router.put('/editBus', BusesController.postEditBus);
router.delete('/deleteBus/:busId',BusesController.deleteBus)

// /Stops routes
router.post('/searchStops', StopsController.postSearchStops);
router.get('/searchStop/:stopId', StopsController.getStop);
router.post('/addNewStop', StopsController.postAddNewStop);
router.put('/editStop', StopsController.postEditStop);
router.delete('/deleteStop/:stopId', StopsController.deleteStop);



// /Staff routes
router.post('/searchStaff', StaffController.postSearchStaff);

// /Users routes
router.post('/searchUsers', UsersController.postSearchUsers);

module.exports = router;