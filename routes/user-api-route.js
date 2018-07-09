var user_api_controller = require('../controllers/user-api-controller');
var express = require('express');
var router = express.Router();

router.get('/api/users', (req, res) => user_api_controller.usersAll(req, res));

router.post('/api/users', (req, res) => user_api_controller.userCreate(req, res));

router.get('/api/users/:id', (req, res) => user_api_controller.userById(req, res));

router.put('/api/users', (req, res) => user_api_controller.userUpdate(req, res));

router.delete('/api/users/:id', (req, res) => user_api_controller.userDelete(req, res));

module.exports = router;