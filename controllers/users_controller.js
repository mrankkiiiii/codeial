const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function(req , res){
    User.findById(req.params.id, function(err,user){
        return res.render('users_profile',{
            title: 'Profile',
            profile_users: user
        });
    });
}

module.exports.update = async function(req,res){
    // previous code before adding multer and ajax

    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body, function(err,user){
    //         req.flash('success','Profile Updated');
    //         return res.redirect('back');
    //     });
    // }
    // else
    // {
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log('*****Multer Error',err);
                    return;
                }
                user.name = req.body.name
                user.email = req.body.email
                if(req.file)
                {
                     if(user.avatar)
                     { //check if the file exists or not
                        if (fs.existsSync(path.join(__dirname ,'..',user.avatar))) 
                        {
                            fs.unlinkSync(path.join(__dirname ,'..',user.avatar));                  
                        }
                     }
                    // this is saving the path of the uploaded file into the avatar field in the user 
                    user.avatar = User.avatarPath + '/' + req.file.filename; 
                }
                user.save();
                req.flash('success','Profile Updated');
                return res.redirect('back');
            });
        }catch (err) {
            req.flash('error',err);  
            return res.redirect('back');
        }
    }
    else{
        req.flash('error', 'Unauthorized!');
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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        //Error in finding user in signing up 
        if(err){req.flash('error',err); return; }
        if(!user){
            User.create(req.body, function(err,user){
                //Error in creating user while signing up
                if(err){req.flash('error',err);return; }

                console.log("new user created",user);
                req.flash('success', 'You have signed up, login to continue!');
                return res.redirect('/users/sign-in');
            });
        }
        else{
            req.flash('error', 'Email is already registered!');
            return res.redirect('back');
        }
    });
}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

// for the signout
module.exports.destroySession = function(req,res){  
    req.logout();
    req.flash('success', ' You have Logged out');
    return res.redirect('/');
}