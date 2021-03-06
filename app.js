var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
require('./models/users_model.js');
require('./models/polls_model.js');

var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/rapd';

mongoose.connect(uristring);

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'SECRET',
    cookie: {maxAge: 60*60*1000},
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
}));

require('./routes')(app);
app.listen(process.env.PORT || 5000);