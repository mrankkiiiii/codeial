const User = require('../models/user');

module.exports.profile = function(req , res){
    return res.render('users_profile',{
        title: 'Profile',
    });
}

module.exports.signIn = function(re,res){
    return res.render('user_sign_in',{
        title: 'Sign In',
    });
}

module.exports.signUp = function(re,res){
    return res.render('user_sign_up',{
        title: 'Sign Up',
    });
}
//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('Error in finding user in signing up'); return; }
        
        if(!user){

            User.create(req.body, function(err,user){
                if(err){console.log('Error in creating user while signing up'); return; }

                console.log("new user creayed",user);
                return res.redirect('/users/sign-in');
            });
        }
        else{
            console.log("user found",user);
            return res.redirect('back');
        }
    })
}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    // Todo LAter
}