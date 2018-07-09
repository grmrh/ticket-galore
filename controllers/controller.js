
//--------------------------------------------------------------
var express = require("express");
console.log("you are in the controller.js")
// var router = express.Router();
var db = require("../models/index");
// create routes


// Sends to DOM
router.get("/", function (req, res) {
    
    user_interests.selectAll(function (data) {
      res.render('index', { user_interests: data });
    });
  });

  //Export routes
module.exports = router;