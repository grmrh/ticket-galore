const db = require('../models');
const {table} = require('table');
const sessionStorage = require('sessionstorage');

class Users {
  constructor() {
    this.usersAll = [];
    this.usersByUser = [];
    this.usersByuser = [];
    this.usersOnMarket = [];
    this.usersOnMarketByUser = [];
    this.usersOnMarketByTicket = [];

    this.userSelected;
    this.userInserted;
    this.userUpdated;

    this.userInterestInserted;
  }

  getAllUsers() {
    this.usersAll = [];
    return db.user
      .findAll({include: [db.user]})
      .then (dbusers => {
        //console.log(table(dbusers));
        dbusers.forEach(t => this.usersAll.push(t));
        //console.log(this.usersAll);
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  getUserByUserIdentity(id) {
    this.userSelected = null;
    return db.user
      .findOne({
        where: {
          user_identity: id 
        }})
      .then (dbUser => {
        if (dbUser) {
        //console.log("getUserByIdentity in user-data.js \n", dbUser.user_id);
        //console.log("getUserByIdentity in user-data.js \n", dbUser.user);
        //console.log("getUserByIdentity in user-data.js \n", dbUser.user[0]);
        console.log("getUserByIdentity dbUser in user-data.js \n", dbUser);
        this.userSelected = dbUser;
        return dbUser;
        }
        else 
          return dbUser;
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  getUserByEmail(email) {
    this.userSelected = null;
    return db.user
      .findOne({
        where: {
          email: email 
        }})
      .then (dbUser => {
        if (dbUser) {
          
          //console.log("getUserByIdentity in user-data.js \n", dbUser.user_id);
        //console.log("getUserByIdentity in user-data.js \n", dbUser.user);
        //console.log("getUserByIdentity in user-data.js \n", dbUser.user[0]);
          //console.log("getUserByEmail in user-data.js \n", dbUser.user.user_id);
          console.log("getUserByEmail in user-data.js \n", dbUser);
          this.userSelected = dbUser;
          console.log(this.userSelected.email);
          return dbUser;
        }
        else 
          return dbUser;
      })
      .catch(err => {
        console.log(err.stack);
        process.exit(1);
      })
  }

  createUser(userInfo) {
    this.userInserted = null;
    return db.user.create(userInfo)
      .then(dbUser => {
        console.log("createUser in user-data.js \n", dbUser.user_id);
        this.userInserted = dbUser;
        return dbUser;
      });
  };
  
  setUserToSessionStorage(userInfo) {
    sessionStorage.clear();
    sessionStorage.setItem('user_id', userInfo.user_id);
    sessionStorage.setItem('displayName', userInfo.displayName);
    sessionStorage.setItem('email', userInfo.email);
    sessionStorage.setItem('user_identity', userInfo.user_identity);
    //sessionStorage.setItem('definitions', JSON.stringify(definitions));
  }

  getUserFromSessionStorage() {
    return {
      'user_id': sessionStorage.getItem('user_id'),
      'displayName': sessionStorage.getItem('displayName'),     
      'email': sessionStorage.getItem('email'),
      'user_identity': sessionStorage.getItem('user_identity')
      //definitions: JSON.parse(sessionStorage.getItem('definitions')),
      //searchedTime: sessionStorage.getItem('searchedTime')
    };
  }


  createUserInterest(userInterestInfo) {
    this.userInterestInserted = null;
    return db.user_interest.create(userInterestInfo)
      .then(dbUserInterest => {
        console.log("createUserInterest in user-data.js \n", dbUserInterest.user_interest_id);
        this.userinterestInserted = dbUserInterest;
        return dbUserInterest;
      });
  };
}

module.exports = Users;


