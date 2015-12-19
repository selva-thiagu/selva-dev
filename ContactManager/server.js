/**
 *  File: server.js
 *
 * Description: This file starts the server with all the dependencies
 */

// modules =================================================
var express = require('express');
//mongoose
// config files
var db = require('./config/db-config');
var mongoose = require('mongoose');

// connect to our mongoDB database 
mongoose.connect(db.url); 

var http = require('http');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

// configuration ===========================================


var app = express();
// set our port
var port = process.env.PORT || 3000;


// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);



// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(methodOverride());


// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
// configure our routes
require('./routes')(app);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;
