var Ticket = require('./ticket');

module.exports = function(sequelize, DataTypes) {

  var TicketTrade = sequelize.define("ticket_trade", {
    ticket_trade_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    },

    ticket_name: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    location: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    event_name: {
      type: DataTypes.STRING,
      notEmpty: true
    }, 

    image_name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    
    image_stored_at: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    bid_ticket_id: {
      type: DataTypes.STRING,
      allowNull: true
    },

    bid_status: {
      type: DataTypes.ENUM('in_pool', 'trade_progress', 'claimed'),
      defaultValue: 'in_pool'
    },

    bid_time: {
      type: DataTypes.DATE,
      allowNull: true
      //defaultValue: CURRENT_TIMESTAMP
    },

    bid_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },

    // bid_user_id: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // }
  });


  TicketTrade.associate = function(models) {

    //foreign key ticket_for_bid_id is added to ticket_trade table
    // TicketTrade.belongsTo(models.ticket, {
    //   //as: 'forBidTicket',
    //   foreignKey: 'ticket_for_bid_id',
    //   targetKey: 'ticket_id',
    //   allowNull: false
    // });

    // //foreign key ticket_to_bid_id is added to ticket_trade table
    // TicketTrade.belongsTo(models.ticket, {
    //   //as: 'toBidTicket', 
    //   foreignKey: 'ticket_to_bid_id',
    //   targetKey: 'ticket_id',
    //   allowNull: true
    // });

    TicketTrade.hasOne(models.ticket, {
      foreignKey: 'ticket_trade_id',
      sourceKey: 'ticket_trade_id', 
      onDelete: "cascade"
    });

    // TicketTrade.belongsTo(models.ticket, {
    //   foreignKey: 'bid_ticket_id',
    //   targetKey: 'ticket_id'
    // })

    TicketTrade.belongsTo(models.user, {
      foreignKey: 'bid_user_id'
    })

    // TicketTrade.belongsToMany(models.ticket, {
    //   //as: 'forBidTicket', 
    //   foreignKey: 'ticket_for_bid_id',
    //   through: models.ticket_trade
    // });

    // TicketTrade.belongsToMany(models.ticket, {
    //   //as: 'toBidTicket', 
    //   foreignKey: 'ticket_to_bid_id',
    //   through: models.ticket_trade
    // });
  }

  return TicketTrade;
}