var tickets_api_controller = require('../controllers/tickets-api-controller');
var express = require('express');
var router = express.Router();


router.get('/api/tickets', (req, res) => {
  //console.log("session stored \n", req.session.user_id, req.session.displayName);
  tickets_api_controller.ticketsAll(req, res);
});

router.post('/api/tickets', (req, res) => {
  //console.log("session stored \n", req.session.user_id, req.session.displayName);
  tickets_api_controller.ticketCreate(req, res)
});

router.get('/api/tickets/:id', (req, res) => tickets_api_controller.ticketById(req, res));

router.put('/api/tickets', (req, res) => tickets_api_controller.ticketUpdate(req, res));

router.delete('/api/tickets/:id', (req, res) => tickets_api_controller.ticketDelete(req, res));

router.get('/api/tickets/user/:id/userInterests', (req, res) => tickets_api_controller.userInterestsByUserId(req, res));

router.post('/api/tickets/user/:id/userInterests', (req, res) => tickets_api_controller.userInterestCreate(req, res));

router.post('/api/tickets/ticketTrades', (req, res) => tickets_api_controller.ticketTradeCreate(req, res));

// router.get('/api/lookupEvents', (req, res) => {
//   //console.log("session stored \n", req.session.user_id, req.session.displayName);
//   tickets_api_controller.lookupEventAll(req, res);
// });

// router.post('/api/userInterests', (req, res) => tickets_api_controller.userInterestCreate(req, res));

module.exports = router;