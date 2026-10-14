// Libs
const express = require('express');
const http = require('http');
const gzippo = require('gzippo');
const logger = require('morgan');
const httpAuth = require('http-auth');

// Server config
let env = process.env.NODE_ENV || 'development';

// Basic HTTP Auth
let basic = httpAuth.basic({
    realm: "Restricted Access! Please login to proceed"
  },
  (username, password, callback) => {
    callback( (username === "2cartoony4me" && password === "nothing2Chere"));
});

// Configure Express
let app = express();
app.use(logger());
// app.use(httpAuth.connect(basic));
app.use(gzippo.staticGzip('' + __dirname));

// hello.universe
let server = http.createServer(app);
server.listen(process.env.PORT || 5000);
