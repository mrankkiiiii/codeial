const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// to generate random password
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: "919033175338-n73o5ds4708b3qcsov02lqneo5d58u3r.apps.googleusercontent.com",
        clientSecret: "YtoPKBL1ZWovuHzuxwfasP0d",
        callbackURL: "https://localhost:8000/users/auth/google/callback"
    }, function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){ 
                console.log('error in google-stratgey-passport',err);
                return;
            }
            console.log(profile);
            if(user){
                //if found this,then set this user is as req.user
                return done(null, user);
            } else {
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){ 
                        console.log('error in creating user google-stratgey passport',err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));
module.exports = passport;