var index_controller = require('../../controllers/admin/index-controller');
var express = require('express');
var router = express.Router();


router.get('/admin', (req, res) => index_controller.admin);


module.exports = router;