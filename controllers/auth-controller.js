var db = require('../models');

var exports = module.exports = {};

exports.userCreate = function (userinfo) {
  console.log("inside userCreate")
  console.log(`${userinfo.first_name} ${userinfo.last_name}`);

  db.user.create(userinfo)
      .then(dbUser => console.log(dbUser));
};