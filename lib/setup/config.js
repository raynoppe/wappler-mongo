const package = require('../../package.json');
const fs = require('fs-extra');
const debug = require('debug')('server-connect:setup:config');
const { toSystemPath } = require('../core/path');

const config = {
    port: process.env.PORT || 3000,
    debug: false,
    secret: 'Need to be set',
    tmpFolder: '/tmp',
    createApiRoutes: true,
    compression: true,
    redis: false,
    static: {
        index: false
    },
    session: {
        name: package.name + '.sid',
        resave: false,
        saveUninitialized: false
    },
    cors: { // see https://github.com/expressjs/cors
        origin: false,
        methods: 'GET,POST',
        allowedHeaders: '*',
        credentials: true
    },
    globals: {},
    mail: {},
    auth: {},
    oauth: {},
    db: {},
    s3: {},
    jwt: {}
};

if (fs.existsSync('app/config/config.json')) {
    //Object.assign(config, fs.readJSONSync('app/config/config.json'));
    const userConfig = fs.readJSONSync('app/config/config.json');
    for (let option in userConfig) {
        if (typeof config[option] == 'object' && !Array.isArray(config[option]) && typeof userConfig[option] == 'object') {
            for (let sub in userConfig[option]) {
                config[option][sub] = userConfig[option][sub];
            }
        } else {
            config[option] = userConfig[option];
        }
    }
}

if (fs.existsSync('app/config/mail.json')) {
    config.mail = fs.readJSONSync('app/config/mail.json');
}

if (fs.existsSync('app/config/auth.json')) {
    config.auth = fs.readJSONSync('app/config/auth.json');
}

if (fs.existsSync('app/config/db.json')) {
    config.db = fs.readJSONSync('app/config/db.json');
}

if (fs.existsSync('app/config/globals.json')) {
    config.globals = fs.readJSONSync('app/config/globals.json');
}

// folders are site relative
config.tmpFolder = toSystemPath(config.tmpFolder);

if (config.debug) {
    require('debug').enable(typeof config.debug == 'string' ? config.debug : 'server-connect:*');
}

debug(config);

module.exports = config;