module.exports = function(sequelize, DataTypes) {

  var UserInterest = sequelize.define("user_interest", {  
    
    user_interest_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true   
    }
  });

    UserInterest.associate = function(models) {

      UserInterest.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'user_id',
        allowNull: false
      });

      UserInterest.belongsTo(models.lookup_event, {
        targetKey: 'lookup_event_id',
        foreignKey: 'lookup_event_id',
        onDelete: "cascade"
      });
    };
  
  return UserInterest;
 }