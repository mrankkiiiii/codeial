const USer = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');
module.exports.createSession = async function(req,res){
    try {
        let user = await USer.findOne({email: req.body.email});   
        if(!user || user.password!=req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }
        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '100000'})
            }
        });
    } catch (error) {
        console.log('********',err);
        return res.json(501, {
            message: "Internal Servar Error"
        });
    }
}