//source: http://www.passportjs.org/packages/passport-jwt/#extracting-the-jwt-from-the-request
//source: https://www.youtube.com/watch?v=Ne0tLHm1juE

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/User");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

const strategy = new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({email: jwt_payload.email}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

module.exports = (passport) => {
    passport.use(strategy);
}
