var ticket_trades_api_controller = require('../controllers/ticket-trade-api-controller');
var express = require('express');
var router = express.Router();

router.post('/api/ticketTrades', (req, res) => ticket_trades_api_controller.ticketTradeCreate(req, res));
router.delete('/api/ticketTrades/:id', (req, res) => ticket_trades_api_controller.ticketTradeDelete(req, res));

router.get('/api/ticketTrades/:id', (req, res) => ticket_trades_api_controller.ticketTradeGetById(req, res));
router.put('/api/ticketTrades', (req, res) => ticket_trades_api_controller.ticketTradeUpdate(req, res));

module.exports = router;