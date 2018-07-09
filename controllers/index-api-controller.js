var db = require('../models');
var exports = module.exports = {};

// respond to GET /api/tickets
exports.ticketsAll = function (req, res) {
  var query = {};

  // check if "get by id" kind
  if (req.query.ticket_id) {
    query.ticket_id = req.query.ticket_id;
  }

  db.ticket.findAll({
        where: query,
        include: [db.User] }) 
      .then(function (dbTicket) {
    res.json(dbTicket);
  });
};

// respont to GET /api/tickets/:id
  exports.ticketById = function (req, res) {
    db.ticket.findOne({
      where: {
        ticket_id: req.params.id
      },
      include: [db.User] })
      .then(function (dbTicket) {
        res.json(dbTicket);
      });
  }

// respond to POST /api/tickets
exports.ticketCreate = function (req, res) {
  db.ticket.create(req.body)
      .then(dbTicket => res.json(dbTicket));
};

// respond to PUT /api/tickets
exports.ticketUpdate = function (req, res) {
  db.ticket.update(
    req.body, 
    {
      where: {
        ticket_id: req.body.id
      }
    }).then(function(dbTicket) {
      res.json(dbTicket);
    });
  };

  // respond to DELETE /api/tickets/:id
  exports.ticketDelete = function (req, res) {
    db.ticket.destroy({
      where: {
        ticket_id: req.params.id
      }
    }).then(dbTicket => res.json(dbTicket));
  }


