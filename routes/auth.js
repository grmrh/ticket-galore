const GoogleStrategy = require('passport-google-oauth2').Strategy;
const Users = require('../controllers/user-data');
const querystring = require('querystring');
const url = require('url');
//const express = require('express');
//const session = require('express-session');
const path = require('path');
// console.log(process.env.CLIENT_ID);

module.exports = (app, passport) => {

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/signin'
    }), (req, res) => {
      // req.session.token = req.user.token;
      // console.log('user token ', req.user.token);
      console.log('user profile ', req.user.profile.displayName);
      //console.log('user email ', req.user.profile.email);

      var userInfo = {
        first_name: req.user.profile.name.givenName,
        last_name: req.user.profile.name.familyName,
        email: req.user.profile.email,
        user_identity: req.user.profile.id, 
        displayName: req.user.profile.displayName
      }

      // sessionstorage.setItem('email', userInfo.email);
      // seesionstorage.setItem('user_identity', userInfo.user_identity);
      // sessionstorage.setItem('displayName', userInfo.displayName);

      console.log(userInfo);
      // check if user alreay in database
      //app.use(session({secret: 'super duper hidden', cookie: {maxAge: 60000}}));
      var users = new Users();

      users.getUserByUserIdentity(req.user.profile.id)
        .then(dbUser => {
          if (!users.userSelected) {
            users.getUserByEmail(req.user.profile.eamil)
              .then(dbUser => {
                if (!users.userSelected) {
                  users.createUser(userInfo)
                    .then(dbUser => {
                      //setSessionInfo(req.session, users.userInserted);
                      req.session.user_id = users.userInserted.user_id;
                      req.session.email = users.userInserted.email.toString();
                      req.session.user_identity = users.userInserted.user_identity.toString();                  
                      req.session.displayName = users.userInserted.displayName.toString();
                    })
                } 
                else{
                  //setSessionInfo(req.session, users.userSelected);
                  req.session.user_id = users.userSelected.user_id;
                  req.session.email = users.userSelected.email.toString();
                  req.session.user_identity = users.userSelected.user_identity.toString();                  
                  req.session.displayName = users.userSelected.displayName.toString();
                }
              })
          } else{
            //setSessionInfo(req.session, users.userSelected);
            req.session.user_id = users.userSelected.user_id;
            req.session.email = users.userSelected.email.toString();
            req.session.user_identity = users.userSelected.user_identity.toString();                  
            req.session.displayName = users.userSelected.displayName.toString();
          }
        }).then(() => req.session)
          .then(reqs =>  {
            console.log("Inside Auth: ", reqs.user_id, req.session.displayName, 
              req.session.email, req.session.user_identity);
            return req.session;
          })
          .then (reqs => {
            res.redirect(url.format({
              pathname: '/tickets',
              query: {
                "user_id": reqs.user_id,
                "email": reqs.email,
                "displayName": reqs.displayName,
                "user_identification": reqs.user_identification
            }}));
          });


      //console.log('user_id from sessionstorage \n', sessionstorage.getItem('user_id'));
      //res.redirect('/tickets');
      //router.get('/tickets', (req, res) => tickets_controller.tickets(req, res));
      //router.get('/api/tickets', (req, res) => tickets_api_controller.ticketsAll(req, res));
      //res.sendFile(path.join(__dirname + '/test.html'));
    }
  );

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'email'
  ];

  /*
  scope: ['https://www.googleapis.com/auth/plus.signin',
   'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar', 
    'https://www.googleapis.com/auth/plus.profile.email']
  */

  app.get('/auth/google', passport.authenticate('google', {
    scope: scopes
  }));

  app.get('/signin', (req, res) => {
    res.render('signin', {
      user: req.user
    });
  })

  app.get('/signout', (req, res) => {
    req.signout();
    req.session = null;
    res.redirect('/');
  })

  // Route to landing page
  //app.get('/', (req, res) => res.sendFile('donlandingpage', { user: req.user, root : __dirname}));
  app.get('/', (req, res) => {
    res.render('../views/index', {
      user: req.user,
      root: __dirname
    })
  });

  app.get('/', ensureAuthenticated, (req, res) => {
    res.render('/', {
      user: req.user
    });
  })

  passport.serializeUser((user, done) => {
    var sessionUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles
    };
    done(null, sessionUser);
  });

  //The sessionUser is different from database user. it's actually req.session.passport.user and comes from the session collection
  passport.deserializeUser((sessionUser, done) => {
    done(null, sessionUser);
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        return done(null, {
          profile: profile,
          accessToken: accessToken
        });
      });
    }));

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/signin');
  }

  function setSessionInfo(sess, userInfo) {
    sess.user_id = userInfo.user_id;
    sess.email = userInfo.email.toString();
    sess.user_identity = userInfo.user_identity.toString();                  
    sess.displayName = userInfo.displayName.toString();
    console.log("session data: \n", sess.user_id, sess.email, sess.user_identity, sess.displayName);
    return sess;
  }


};
