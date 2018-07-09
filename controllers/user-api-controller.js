var db = require('../models');
var exports = module.exports = {};

// respond to GET /api/users
exports.usersAll = function(req, res) {
  var query = {};
  if (req.query.user_id) {
    query.user_id = req.query.user_id;
  }
  db.user.findAll({
    where: query
  }).then(dbUser => res.json(dbUser));
}

// respont to GET /api/users/:id
exports.userById = function (req, res) {
  db.user.findOne({
    where: {
      user_id: req.params.id
    }})
    .then(function (dbUser) {
      res.json(dbUser);
    });
}

// respond to POST /api/users
exports.userCreate = function (req, res) {
  db.user.create(req.body)
    .then(dbUser => res.json(dbUser));
};

// respond to PUT /api/users
exports.userUpdate = function (req, res) {
  db.user.update(
    req.body, 
    {
      where: {
        user_id: req.body.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  };

// respond to DELETE /api/users/:id
exports.userDelete = function (req, res) {
  db.user.destroy({
    where: {
      user_id: req.params.id
    }
  }).then(dbUser => res.json(dbUser));
}


  



