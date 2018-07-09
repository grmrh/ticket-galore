var lookupEvents_api_controller = require('../controllers/lookup_events-api-controller');
var express = require('express');
var router = express.Router();

router.get('/api/lookupEvents', (req, res) => {
  //console.log("session stored \n", req.session.user_id, req.session.displayName);
  lookupEvents_api_controller.lookupEventAll(req, res);
});

module.exports = router;