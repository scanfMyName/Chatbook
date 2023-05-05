const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const keys = require('./key');

const opt = {}; 
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opt, (jwt_payload, done) =>{
        // console.log(jwt_payload);
        User.findById(jwt_payload.id)
        .then(user => {
            if(user){
                return done(null, user)
            }
            return done(null, false)
        })
        .catch(err => console.log(err))
    }))
}

