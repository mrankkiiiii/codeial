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