const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const router = require('express').Router();
const Users = require('../controllers/user-data');
const User = require('../models/user');

const path = require('path');
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
      console.log('Inside redirect; ' + req.user);
      console.log('inside auth ', req.user.displayName);
      res.redirect('/tickets');

      // //console.log('user email ', req.user.profile.email);
      // var userInfo = {
      //   first_name: req.user.profile.name.givenName,
      //   last_name: req.user.profile.name.familyName,
      //   email: req.user.profile.email,
      //   user_identity: req.user.profile.id, 
      //   displayName: req.user.profile.displayName
      // }

      // console.log(userInfo);
      // // check if user alreay in database
      // //router.use(session({secret: 'super duper hidden', cookie: {maxAge: 60000}}));
      // var users = new Users();

      // user.getUserByUserIdentity(req.user.profile.id)
      //   .then(dbUser => {
      //     if (!users.userSelected) {
      //       users.getUserByEmail(req.user.profile.eamil)
      //         .then(dbUser => {
      //           if (!users.userSelected) {
      //             users.createUser(userInfo)
      //               .then(dbUser => {
      //                 //setSessionInfo(req.session, users.userInserted);
      //                 req.session.user_id = users.userInserted.user_id;
      //                 req.session.email = users.userInserted.email.toString();
      //                 req.session.user_identity = users.userInserted.user_identity.toString();                  
      //                 req.session.displayName = users.userInserted.displayName.toString();
      //               })
      //           } 
      //           else{
      //             //setSessionInfo(req.session, users.userSelected);
      //             req.session.user_id = users.userSelected.user_id;
      //             req.session.email = users.userSelected.email.toString();
      //             req.session.user_identity = users.userSelected.user_identity.toString();                  
      //             req.session.displayName = users.userSelected.displayName.toString();
      //           }
      //         })
      //     } else{
      //       //setSessionInfo(req.session, users.userSelected);
      //       req.session.user_id = users.userSelected.user_id;
      //       req.session.email = users.userSelected.email.toString();
      //       req.session.user_identity = users.userSelected.user_identity.toString();                  
      //       req.session.displayName = users.userSelected.displayName.toString();
      //     }
      //   }).then(() => req.session)
      //     .then(reqs =>  {
      //       console.log("Inside Auth: ", reqs.user_id, req.session.displayName, 
      //         req.session.email, req.session.user_identity);
      //       return req.session;
      //     })
      //     .then (reqs => {
      //       res.redirect(url.format({
      //         pathname: '/tickets',
      //         query: {
      //           "user_id": reqs.user_id,
      //           "email": reqs.email,
      //           "displayName": reqs.displayName,
      //           "user_identification": reqs.user_identification
      //       }}));
      //     });

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

  // router.get('/', ensureAuthenticated, (req, res) => {
  //   res.render('/', {
  //     user: req.user
  //   });
  // })

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
    callbackURL = 'https://pacific-fortress-96034.herokurouter.com/auth/google/callback';
  } else {
    callbackURL = 'http://localhost:8080/auth/google/callback';
  }

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: callbackURL,
      passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
      // check if this user exists in the user table
      var users = new Users();
      users.getUserByUserIdentity(profile.id)
      .then((currentUser) => {
        if(currentUser) {
          // found in the table
          console.log('user exists and is ' + currentUser);
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
           .then((newUser) => {
             console.log('new user created: ' + newUser);
             done(null, newUser);
           })
        }
      })

      
    })
  );

  // function ensureAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect('/signin');
  // }

// };

module.exports = router;