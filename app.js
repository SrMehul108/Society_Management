const express = require('express');
const http = require('http');
const socketInstance = require('./socket/socketInstance');
const Passport = require("passport");
const session = require("express-session");
const passportjwt = require("./config/passport");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const server = http.createServer(app);  
const io = socketInstance.init(server);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        name: "JWTSESSION",
        secret: process.env.JWT_SECRET_ADMIN,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
    })
);
app.use(cors());
app.use(express.json());
app.use(Passport.initialize());
app.use(Passport.session());
app.use('/', require('./routes/index'));

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});