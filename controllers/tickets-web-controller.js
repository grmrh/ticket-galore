var db = require('../models');
var Users = require('./user-data');
var Tickets = require('./tickets-data');

var exports = module.exports = {};

exports.tickets = function (req, res) {

    console.log('Inside tickets web controller - req.session:', req.session.user);
    // var signedin_user = {
    //   "email": req.user.email,
    //   "displayName": req.user.displayName,
    //   "user_identification": req.user.id
    // }

    var query = {};
    // check if "get by id" kind
    if (req.query.ticket_id) {
      query.ticket_id = req.query.ticket_id;
    }

    var lookupEvents;
    var ticketsWithUserIdAndEventId;
    var myTickets;
    var myTicketTrades;
    var userInterests;
    var ticketTrades;
    var hbsObj;

    db.ticket.findAll({
        where: query,
        include: [db.user, db.lookup_event, db.ticket_trade]
      })
      .then(function (dbTickets) {
        () => dbTickets;
        //console.log("Tickets page - dbTickets \n", dbTickets);
        ticketsWithUserIdAndEventId = dbTickets;
        })
        .then(function () {
          db.ticket.findAll({
              where: {
                //user_id: signedin_user.user_id
                user_id: req.session.user.user_id
              },
              include: [db.user, db.lookup_event, db.ticket_trade]
            })
            .then(function (dbMyTickets) {

              //console.log("Tickets page - dbMyTickets \n", dbMyTickets);
              myTickets = dbMyTickets;
            })
            .then(function () {
              db.ticket_trade.findAll({
                  where: {
                    bid_user_id: req.session.user.user_id
                  },
                  include: [db.user]
                })
                .then(function (dbMyTicketTrades) {
    
                  //console.log("Tickets page - dbMyTickets \n", dbMyTickets);
                  myTicketTrades = dbMyTicketTrades;
                })
            .then(function () {
              db.user_interest.findAll({
                  where: {
                    user_id: req.session.user.user_id
                  },
                  include: [db.user, db.lookup_event]
                })
                .then(function (dbUserInterests) {

                  //console.log("Tickets page - dbUserInterests \n", dbUserInterests);
                  userInterests = dbUserInterests;
                })
                .then(function () {
                  db.lookup_event.findAll({})
                    .then(function (dbLookupEvents) {

                      //console.log("Tickets page - dbLookupEvents \n", dbLookupEvents);
                      lookupEvents = dbLookupEvents;
                    })
                    .then(function() {
                      db.ticket_trade.findAll({
                        include: [db.user]
                        // include: [{model: db.ticket, as: 'forBidTicket'},
                        //           {model: db.ticket, as: 'toBidTicket'}]
                      })
                      .then(function(dbTicketTrades) {

                        console.log("Tickets page - dbTicketTrades \n", dbTicketTrades);
                        ticketTrades = dbTicketTrades;

                        var hbsObj = {
                          tickets: ticketsWithUserIdAndEventId,
                          myTickets: myTickets,
                          myTicketTrades: myTicketTrades,
                          lookupEvents: lookupEvents,
                          userInterests: userInterests,
                          ticketTrades: ticketTrades,
                          signedin_user: req.session.user
                        };
  
                        res.render('tickets', hbsObj);
                      })
                    })
                })
            })     
          })
      })
    }



    // const dataForTiketsWeb = async (req, res, next) => {
    //   try {
    //     lookupEvents = await db.lookup_event.findAll();
    //     ticketsWithUserIdAndEventId = await db.ticket.findAll({
    //       where: query,
    //       include: [db.user, db.lookup_event]
    //     });
    //     myTickets = await db.ticket.findAll({
    //       where: {
    //         user_id: signedin_user.user_id
    //       },
    //       include: [db.user, db.lookup_event]
    //     });

    //     return hbsObj = {
    //       tickets: ticketsWithUserIdAndEventId,
    //       myTickets: myTickets,
    //       lookupEvents: lookupEvents,
    //       signedin_user: ''
    //     };
    //   } catch (err) {
    //     console.log(err.stack());
    //   }
    // }
    // dataForTiketsWeb();