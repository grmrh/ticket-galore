var index_controller = require('../controllers/index-controller');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => index_controller.index(req, res));
router.get('/index', (req, res) => index_controller.index(req, res));

module.exports = router;