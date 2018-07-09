module.exports = function(sequelize, DataTypes) {
  var LookupEvent = sequelize.define("lookup_event", {

    lookup_event_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
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

    description: {
      type: DataTypes.STRING,
      notEmpty: false
    }, 

  });

  LookupEvent.associate = function(models) {
    
    LookupEvent.hasMany(models.ticket, {
      sourceKey: 'lookup_event_id',
      foreignKey: 'lookup_event_id',
      onDelete: "cascade"
    });
  };

  return LookupEvent;
}