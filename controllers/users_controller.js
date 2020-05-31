const User = require('../models/user');

module.exports.profile = function(req , res){
    User.findById(req.params.id, function(err,user){
        return res.render('users_profile',{
            title: 'Profile',
            profile_users: user
        });
    });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body, function(err,user){
            return res.redirect('back');
        });
    }
    else
    {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signIn = function(req,res){
    //restrict the signin page when user is signed in
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Sign In',
    });
}

module.exports.signUp = function(req,res){
    //restrict the signup page when user is signed in
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

// for the signout
module.exports.destroySession = function(req,res){
    req.flash('success', ' You have Logged out');
    req.logout();
    return res.redirect('/');
}