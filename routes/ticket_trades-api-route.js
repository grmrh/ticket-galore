var ticket_trades_api_controller = require('../controllers/ticket-trade-api-controller');
var express = require('express');
var router = express.Router();

router.post('/api/ticketTrades', (req, res) => ticket_trades_api_controller.ticketTradeCreate(req, res));

module.exports = router;