var userInterests_api_controller = require('../controllers/user_interests-api-controller');
var express = require('express');
var router = express.Router();

router.post('/api/userInterests', (req, res) => {
  //console.log("session stored \n", req.session.user_id, req.session.displayName);
  userInterests_api_controller.userInterestCreate(req, res)
});

module.exports = router;