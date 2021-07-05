const express = require('express');

const ProfileController = require('../controllers/UserController/ProfileController');
const SearchController = require('../controllers/UserController/SearchController');
const TicketController = require('../controllers/UserController/TicketController');
const TrackController = require('../controllers/UserController/TrackController');


const router = express.Router();

router.post('/searchBuses',SearchController.postSearchBus);

router.post('/buyTicket',TicketController.postBuyTicket);

router.get('/getHistory',TicketController.getTicketHistory);

router.post('/track',TrackController.postTrackBus);


router.get('/profile',ProfileController.getProfileSettings);
router.post('/profile',ProfileController.postProfileSettings);



module.exports = router;