const express = require('express');

const ProfileController = require('../controllers/UserController/ProfileController');
const SearchController = require('../controllers/UserController/SearchController');
const TicketController = require('../controllers/UserController/TicketController');
const TrackController = require('../controllers/UserController/TrackController');

const isAuthenticatedUser = require('../controllers/AuthController/AuthController').isAuthenticatedUser


const router = express.Router();

router.post('/searchBuses', SearchController.postSearchBus);

router.post('/buyTicket', isAuthenticatedUser, TicketController.postBuyTicket);

router.get('/getHistory', isAuthenticatedUser, TicketController.getTicketHistory);

router.post('/track', TrackController.postTrackBus);


router.get('/profile', isAuthenticatedUser, ProfileController.getProfileSettings);
router.post('/profile', isAuthenticatedUser, ProfileController.postProfileSettings);


module.exports = router;