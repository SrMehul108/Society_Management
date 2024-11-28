require('dotenv').config();
const Passport = require("passport");
const Admin = require("../models/Admin");
const jwt = require("passport-jwt");
const jwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_ADMIN,
};

Passport.use(new jwtStrategy(opts, async (record, done) => {
    try {
        let data = await Admin.findById(record.userData._id);
        if (data && data.role === 'admin') {
            return done(null, data);
        } else {
            return done(null, false, { message: 'Unauthorized access' });
        }
    } catch (error) {
        return done(error, false);
    }
}));

Passport.serializeUser((user, done) => {
    return done(null, user.id);
});

Passport.deserializeUser(async (id, done) => {
    let reCheck = await Admin.findById(id);
    reCheck ? done(null, reCheck) : done(null, false);
});