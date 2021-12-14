//source: http://www.passportjs.org/packages/passport-jwt/#extracting-the-jwt-from-the-request
//source: https://www.youtube.com/watch?v=Ne0tLHm1juE

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/User");
//Source to fix jwt TypeError: https://stackoverflow.com/questions/45525077/nodejs-typeerrorjwtstrategy-requires-a-secret-or-key/50787319
require('dotenv').config();

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
