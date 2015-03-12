var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/errors', function(req, res) {
    res.sendFile(__dirname + '/public/errors.html');
});

app.get('/design', function(req, res) {
    res.sendFile(__dirname + '/public/page_BUILDER.html');
});

app.get('/design2', function(req, res) {
    res.sendFile(__dirname + '/public/page_BUILDER2.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/addpoll', function(req, res) {
    res.sendFile(__dirname + '/public/addpoll.html');
});

app.get('/vote', function(req, res) {
    res.sendFile(__dirname + '/public/vote.html');
});

app.get('/poll', function(req, res) {
    res.sendFile(__dirname + '/public/poll.html');
});


app.listen(3000);