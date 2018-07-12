var tickets_web_controller = require('../controllers/tickets-web-controller');
var tickets_api_controller = require('../controllers/tickets-api-controller');
var router = require('express').Router();

// app.get('/', ensureAuthenticated, (req, res) => {
//   res.render('/', {
//     user: req.user
//   });
// })

function ensureAuthenticated(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/google');
    
  }
  //res.redirect('/signin');
  return next();
}


// router.get('/tickets', ensureAuthenticated, (req, res, next) => {
//   console.log("inside tickets route ", req.user);
//   tickets_web_controller.tickets(req, res)
// });

router.get('/tickets', (req, res, next) => {
  console.log("inside tickets route - req.session ", req.session.user);
  console.log("inside tickets route - req.session.displayname ", req.session.user.displayName);
  tickets_web_controller.tickets(req, res)
});

router.get('/lookupEvents', (req, res, next) => {tickets_api_controller.lookupEventAll(req, res)});


module.exports = router;