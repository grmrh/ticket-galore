const db = require('../models');
var Users = require('./user-data');

class Tickets {
  constructor() {
    this.ticketsAll = [];
    this.ticketsByUserIdentity = [];
    this.ticketsByTicketName = [];
    this.ticketsByQueryParam = [];
    this.ticketsOnMarketAll = [];
    this.ticketsOnMarketByUserIdentity = [];
    this.ticketsOnMarketByTicketName = [];
    this.eventLookupAll = [];

    this.ticketSelected;
    this.ticketInserted;
    this.ticketUpdated;
  }

  getAllTickets() {
    this.ticketsAll = [];
    return db.ticket
      .findAll({include: [db.user]})
      .then (dbTickets => {
        //console.log(table(dbTickets));
        var temp = {};
        dbTickets.forEach(t => {
          temp.ticket_name = dbTicket.ticket_name;
          temp.ticket_location = dbTicket.location;
          temp.price = dbTicket.price;
          temp.description = dbTicket.description;
          temp.user_id = dbTicket.user_id;
          temp.displayName = dbTicket.user.displayName;
          temp.email = dbTicket.user.email;
          temp.user_identity = dbTicket.user.user_identity;
          this.ticketsAll.push(temp)
        });
        return dbTickets;
        console.log(this.ticketsAll);
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  getTicketsByQueryParam(queryParam) {
    var query = {};

    // check if "get by id" kind
    if (queryParam.ticket_id) {
      query.ticket_id = queryParam.ticket_id;
    }
    if (queryParam.ticket_name) {
      query.ticket_name = queryParam.ticket_name;
    }
    if (queryParam.location) {
      query.location = queryParam.location;
    }

    this.ticketsByQueryParam = [];
    return db.ticket
      .findAll({
        where: query,
        include: [db.user] }) 
      .then (dbTickets => {
        //console.log(table(dbTickets));
        var temp = {};
        dbTickets.forEach(t => {
          temp.ticket_name = dbTicket.ticket_name;
          temp.ticket_location = dbTicket.location;
          temp.price = dbTicket.price;
          temp.description = dbTicket.description;
          temp.user_id = dbTicket.user_id;
          temp.displayName = dbTicket.user.displayName;
          temp.email = dbTicket.user.email;
          temp.user_identity = dbTicket.user.user_identity;
          this.ticketsByQueryParam.push(temp)
        });
        return dbTickets;
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  getTicketsByTicketName(ticketName) {
    this.ticketsByTicketName = null;
    return db.ticket
      .findAll({
        where: {
          ticket_name: ticketName 
        },
        include: [db.user] })
      .then (dbTickets => {
        //console.log(table(dbTickets));
        var temp = {};
        dbTickets.forEach(t => {
          temp.ticket_name = dbTicket.ticket_name;
          temp.ticket_location = dbTicket.location;
          temp.price = dbTicket.price;
          temp.description = dbTicket.description;
          temp.user_id = dbTicket.user_id;
          temp.displayName = dbTicket.user.displayName;
          temp.email = dbTicket.user.email;
          temp.user_identity = dbTicket.user.user_identity;
          this.ticketsByTicketName.push(temp)
        });
        return dbTickets;
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  getTicketsByUserIdentity(userIdentity) {
    this.ticketsByUserIdentity = [];
    // get user_id for given userIdentity
    var Users  = new Users();
    var userId; 
    Users.getUserByUserIdentity(userIdentity)
      .then(dbUser => {
        return userId = dbUser.user_id;
      });

    return db.ticket
      .findAll({
        where: {
          user_id: userId
        },
        include: [db.user] })
      .then (dbTickets => {
        //console.log(table(dbTickets));
        var temp = {};
        dbTickets.forEach(t => {
          temp.ticket_name = dbTicket.ticket_name;
          temp.ticket_location = dbTicket.location;
          temp.price = dbTicket.price;
          temp.description = dbTicket.description;
          temp.user_id = dbTicket.user_id;
          temp.displayName = dbTicket.user.displayName;
          temp.email = dbTicket.user.email;
          temp.user_identity = dbTicket.user.user_identity;
          this.ticketsByUserIdentity.push(temp)
        });
        return dbTickets;
        //console.log(this.ticketsAll);
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  updateTicketTradeId(updateObj, TicketId) {
    db.ticket.update(
      updateObj,
      {
        where: {
          ticket_id: TicketId
        }
      }).then(function(dbTicket) {
        console.log(dbTicket);
        return dbTicket;
      });
  }

  updateTicketUserIdAndEventId(updateObj, TicketId) {
    db.ticket.update(
      updateObj, 
      {
        where: {
          ticket_id: TicketId
        }
      }).then(function(dbTicket) {
        console.log(dbTicket);
        return dbTicket;
      });
  }
}



module.exports = Tickets;


