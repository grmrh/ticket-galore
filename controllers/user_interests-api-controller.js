var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');
var Sequelize = require('sequelize');
var exports = module.exports = {};


// respond to POST /api/tickets
exports.userInterestCreate = function (req, res) {

  //console.log('session userId \n', U.getUserFromSessionStorage.user_id);
  db.user_interest.create(req.body)
      .then(dbUserInterest => {
        //console.log("after userInterest create user_interest_id: \n", dbUserInterest.user_interest_id);
        //sequelize.query('Update ticket SET user_id = 1 where ticket_id = 1');
        
        res.json({user_interest_id: dbUserInterest.insertId});
      });
};