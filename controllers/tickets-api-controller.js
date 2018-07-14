var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');
var Sequelize = require('sequelize');
var exports = module.exports = {};

var sequelize = new Sequelize('tickets_db', 'root', 'root', {dialect: 'mysql'});

// respond to GET /api/tickets
exports.ticketsAll = function (req, res) {
  var query = {};

  // check if "get by id" kind
  if (req.query.ticket_id) {
    query.ticket_id = req.query.ticket_id;
  }

  db.ticket.findAll({
        where: query,
        include: [db.user] }) 
      .then(function (dbTickets) {
        console.log("ticket.findAll \n", dbTickets);
    res.json(dbTickets);
  });
};


exports.ticketsByQueryParam = function(req, res) {
  var tickets = new Tickets();
  var queryParam = {};
  if (req.query.ticket_id) {
    queryParam.ticket_id = req.query.ticket_id;
  }
  if (req.query.ticket_name) {
    queryParam.ticket_name = req.query.ticket_name;
  }
  if (req.query.location) {
    queryParam.location = req.query.location;
  }
  
  tickets.getTicketsByQueryParam(queryParam)
    .then(dbTickets => {
      res.json(dbTickets)
    });
}


// respont to GET /api/tickets/:id
exports.ticketById = function (req, res) {
  db.ticket.findOne({
    where: {
      ticket_id: req.params.id
    },
    include: [db.user] })
    .then(function (dbTicket) {
      res.json(dbTicket);
    });
}

// respond to POST /api/tickets
exports.ticketCreate = function (req, res) {
  var Users = require('./user-data');
  var usrs = new Users();
  console.log("ticket create reg.body \n", req.body);

  var valuesToUpdate;
  // get user_id using req.email value
  usrs.getUserByEmail(req.body.email)
    .then(() => {
      valuesToUpdate = {
        'user_id': usrs.userSelected.user_id,
        'lookup_event_id':req.body.lookup_event_id
        //'user_id': req.session.user_id
      }
    });

  // U.getUserByEmail(req.body.email);
  // var user_id = U.userSelected.user_id;
  //req.body.user_id = userId;
 
  //console.log('session userId \n', U.getUserFromSessionStorage.user_id);
  db.ticket.create(req.body)
      .then(dbTicket => {
        console.log("after ticket create ticket_id: \n", dbTicket.ticket_id);
        //sequelize.query('Update ticket SET user_id = 1 where ticket_id = 1');
        
          
        // sequelize.query(`Update tickets SET user_id = ${U.getUserFromSessionStorage.user_id} 
        //                 WHERE ticket_id = ${dbTicket.ticket_id}`)
        //           .spread(results, metadata);
        // udpate created ticket with user_id value
        var tickets = new Tickets();
        tickets.updateTicketUserIdAndEventId(valuesToUpdate, dbTicket.ticket_id);
          // .then(dbT => { 
          //   console.log("ticket create \n", dbT);    
          //   res.json(dbT)
          // });
          //res.json(dbTicket);
          res.json({ticket_id: dbTicket.insertId});
      });
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

// respond to POST /api/userInterests
exports.userInterestCreate = function (req, res) {

  var userId = req.params.id;
  
  //console.log('session userId \n', U.getUserFromSessionStorage.user_id);
  db.user_interest.create(req.body)
      .then(dbUserInterest => {
        console.log("after user interest create user_interest_id: \n", dbUserInterest.insertedId);
       
        res.json({user_interest_id: dbUserInterest.insertedId});
      });
};

exports.userInterestsByUserId = function(req, res) {
  var query = {};

  // check if "get by id" kind
  if (req.query.user_id) {
    query.user_id = req.query.user_id;
  } 
  else if (req.query.id) {
    query.user_id = req.query.id;
  }
  else {
    query.user_id = req.params.id;
  }

  db.user_interest.findAll({
        where: query,
        include: [db.user, db.lookup_event] }) 
      .then(function (dbUserInterests) {
        console.log("userInterests findAll \n", dbUserInterests);
    res.json(dbUserInterests);
  });

  exports.ticketsTicketTradeDelete = function(req, res) {
    var ticketTradeIdToDelete = req.params.id;

    db.ticketTrade.destroy({
      where: {
        ticket_trade_id: ticketTradeIdToDelete
      }
    }).then(dbTickets => res.json(dbTickets));
  }
 
  
}

exports.ticketTradeUpdate = function(req, res) {
  var ticketTradeId = req.body.id;

  db.ticket_trade.update(
    req.body, 
    {
      where: {ticket_trade_id: ticketTradeId}
    }).then(function(dbTicketTradeUpdated) {
      res.json(dbTicketTradeUpdated);
    })
}



