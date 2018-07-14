var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');
var Sequelize = require('sequelize');
var exports = module.exports = {};

// respond to POST /api/tickets/tiketTrades
exports.ticketTradeCreate = function (req, res) {

  var bid_ticket_id = req.body.bid_ticket_id;
  console.log("Inside ticketTradeCreate: 1 ", bid_ticket_id);
  var createdTicketTradeId;
  var ticketTradeId;

  //console.log('session userId \n', U.getUserFromSessionStorage.user_id);
  db.ticket_trade.create(req.body)
    .then(dbTicketTrade => {

      //console.log("after ticket trade create, new ticket_trade_id: \n", dbTicketTrade.ticket_trade_id);
      createdTicketTradeId = dbTicketTrade.ticket_trade_id;
      return dbTicketTrade;
    }).then((dbTicketTrade) => {

      console.log("Inside ticketTradeCreate: 2 ", dbTicketTrade.ticket_trade_id);
      //console.log(dbTicketTrade.ticket_trade_id);
      // ticketTradeId = dbTicketTradeId;
      // var content = {
      //   ticket_trade_id: dbTicketTradeId
      // };
      return dbTicketTrade;
    }).then((dbTicketTrade) => {

      db.ticket.update({
        ticket_trade_id: createdTicketTradeId
      }, {
        where: {
          ticket_id: bid_ticket_id
        }
      }).then(function (dbTicketUpdatedId) {

        res.json({
          ticket_trade_id: createdTicketTradeId
        });
      });
    })
};

// respond to DELETE /api/ticketTrades/:id
exports.tickeTradetDelete = function (req, res) {
  db.ticketTrade.destroy({
    where: {
      ticket_trade_id: req.params.id
    }
  }).then(dbTicketTrade => res.json(dbTicketTrade));
}

// respond to PUT /api/tickets
exports.ticketTradeUpdate = function (req, res) {
  db.ticketTrade.update(
    req.body, 
    {
      where: {
        ticket_trade_id: req.body.id
      }
    }).then(function(dbTicketTrade) {
      res.json(dbTicketTrade);
    });
  };

// respond to GET /api/ticketTrades/:id
exports.tickeTradetGetById = function (req, res) {
  db.ticketTrade.FindOne({
    where: {
      ticket_trade_id: req.params.id
    }
  }).then(dbTicketTrade => res.json(dbTicketTrade));
}


//respond to POST /api/tickets/tiketTrades
// exports.ticketTradeCreate = function (req, res) {

//   var bid_ticket_id = req.body.bid_ticket_id;
//   console.log("inside ticket trade create - bid_ticket_id", bid_ticket_id);
//   var createdTicketTrade;
//   var content;

//   //console.log('session userId \n', U.getUserFromSessionStorage.user_id);
//   db.ticket_trade.create(req.body)
//     .then(dbTicketTrade => {

//       //console.log("after ticket trade create, new ticket_trade_id: \n", dbTicketTrade.ticket_trade_id);
//       createdTicketTrade = dbTicketTrade;
//       return dbTicketTrade;

//     }).then((dbTicketTradeId) => {

//       console.log("inside ticket trade create - dbTicketTradeId", dbTicketTradeId); //3
//       //console.log(dbTicketTrade.ticket_trade_id); // undefined
//         return content = {ticket_trade_id: dbTicketTradeId};
//       }).then((content) => {
//         console.log("inside ticket trade create - content ", content);
//         var tickets = new Tickets();
//         return tickets.updateTicketTradeId(content, bid_ticket_id)
//           .then(function (dbTicketUpdatedId) {

//             res.json(content);

//         });
//     })
  //}
