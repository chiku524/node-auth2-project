const session = require('express-session');

const knexSessionStore = require('connect-session-knex')(session);

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const restricted = require('../auth/restricted-middleware.js');

const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');

const server = express();

const sessionConfig = {
    name: 'auth1session', 
    secret: 'nicopico',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../data/connection.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(session(sessionConfig));

server.use('/api/users', restricted, usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({api: 'up and running!'});
})

module.exports = server;