var exports = module.exports = {};

exports.index = function (req, res) {
  res.render('index', {layout: 'main'});
}

exports.index1 = function (req, res) {
  res.render('index1', {layout: 'main'});
}