var exports = module.exports = {};
var path = require("path");

exports.admin = function (req, res) {
  res.render('admin', {layout: 'main_admin'});
  //res.sendFile(path.join(__dirname, "../../public/admin.html"));
}
