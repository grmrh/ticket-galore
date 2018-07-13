const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const router = require('express').Router();
const Users = require('../controllers/user-data');
const User = require('../models/user');

// const querystring = require('querystring');
// const url = require('url');
//const express = require('express');
//const session = require('express-session');

// console.log(process.env.CLIENT_ID);

// module.exports = (passport) => {

  router.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/auth/signin'
    }), (req, res) => {
      // req.session.token = req.user.token;
      // console.log('user token ', req.user.token);

      console.log('Inside redirect; ' + req.session.user.user_id);
      console.log('inside auth ', req.session.user.displayName);
      res.redirect('/tickets');
    }
  );


  /*
  scope: ['https://www.googleapis.com/auth/plus.signin',
   'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar', 
    'https://www.googleapis.com/auth/plus.profile.email']
  */
  // generate a url that asks permissions for Google+ and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'email'
  ];

  // authenticate with google
  router.get('/auth/google', passport.authenticate('google', {
    scope: scopes
  }));

  router.get('/auth/signin', (req, res) => {
    res.render('signin', {
      user: req.user
    });
  })

  router.get('/auth/signout', (req, res) => {
    req.signout();
    req.session = null;
    res.redirect('/');
  })

  // Route to landing page
  //router.get('/', (req, res) => res.sendFile('donlandingpage', { user: req.user, root : __dirname}));
  // router.get('/', (req, res) => {
  //   res.render('../views/index', {
  //     user: req.user,
  //     root: __dirname
  //   })
  // });


  // user.id is the id in user table
  passport.serializeUser((user, done) => {
    var sessionUser = {
      id: user.id,
      displayName: user.displayName,
      email: user.email
    };
    done(null, sessionUser);
  });

  //The sessionUser is different from database user. it's actually req.session.passport.user and comes from the session collection
  passport.deserializeUser((sessionUser, done) => {
    var users = new Users();
    users.getUserByUserId(sessionUser.id)
     .then(user => {
      done(null, user);
     })   
  });


  var callbackURL;
  if (process.env.NODE_ENV == "heroku_production") {
    callbackURL = 'https://pacific-fortress-96034.herokuapp.com/auth/google/callback';
  } else {
    callbackURL = 'http://localhost:8080/auth/google/callback';
  }

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: callbackURL,
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      // check if this user exists in the user table
      var users = new Users();
      users.getUserByUserIdentity(profile.id)
      .then(currentUser => {
        if(currentUser) {
          // found in the table
          console.log('user exists and is ' + currentUser);

          var user = {
            user_identity: currentUser.user_identity,
            displayName: currentUser.displayName,
            user_id: currentUser.user_id,
            email: currentUser.email
           }

           req.session.user = user; 
           done(null, currentUser);

        } else {
          // if not, create user
          var newUser = new User({
            first_name: profile.givenName,
            last_name: profile.familyName, 
            email: profile.email,
            user_identity: profile.id,
            displayName: profile.displayName
          });

          users.createUser(newUser)
           .then(newUser => {
             console.log('new user created: ' + newUser);

             var user = {
              user_identity: newUser.user_identity,
              displayName: newUser.displayName,
              user_id: newUser.user_id,
              email: newUser.email
             }

             req.session.user = user;

             done(null, newUser);
           })
        }
      })

      
    })
  );

module.exports = router;