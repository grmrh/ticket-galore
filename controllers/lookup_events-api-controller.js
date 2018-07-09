var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');
var Sequelize = require('sequelize');
var exports = module.exports = {};


exports.lookupEventAll = function(req, res) {
  db.lookup_event.findAll()
      .then(function (dbLookupEvents) {
        //console.log("tickets.lookupEventAll \n", dbLookupEvents);
        res.json(dbLookupEvents);
      });
};
