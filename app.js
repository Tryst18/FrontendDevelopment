var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = require('./ApplicationInstance');

var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var compression = require('compression');
var _ = require("underscore");
var mainRoutes = require('./backend/routes/MainRoutes');


app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'client')));
//app.use('/courses', express.static(path.resolve(__dirname, 'client')));
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(cookieParser());


app.use('/', mainRoutes);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(app.get('port'), function () {
    console.log('Application running in port '+ app.get('port'));
});