require('dotenv').config();
const Passport = require("passport");
const UserModel = require("../models/UserData");
const jwt = require("passport-jwt");
const jwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_ADMIN,
};

const usersOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_USER,
}

const securityOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_SECURITY,
}

Passport.use(new jwtStrategy(opts, async (record, done) => {
    try {
        let data = await UserModel.findById(record.userData._id);
        if (data && data.role === 'admin') {
            return done(null, data);
        } else {
            return done(null, false, { message: 'Unauthorized access' });
        }
    } catch (error) {
        return done(error, false);
    }
}));

Passport.use("User", new jwtStrategy(usersOpts, async (record, done) => {
    try {
        let data = await UserModel.findById(record.userData._id);
        if (data && data.role === 'user') {
            return done(null, data);
        } else {
            return done(null, false, { message: 'Unauthorized access' });
        }
    } catch (error) {
        return done(error, false);
    }
}));

Passport.use("Security", new jwtStrategy(usersOpts, async (record, done) => {
    try {
        let data = await UserModel.findById(record.userData._id);
        if (data && data.role === 'security') {
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
    let reCheck = await UserModel.findById(id);
    reCheck ? done(null, reCheck) : done(null, false);
});