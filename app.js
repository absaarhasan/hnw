var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/ie', function(req, res) {
    res.sendFile(__dirname + '/public/please_upgrade.html');
});

app.get('/research/html', function(req, res) {
    res.sendFile(__dirname + '/public/html_intro.html');
});


app.get('/research/html/home', function(req, res) {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/research/html/errors', function(req, res) {
    res.sendFile(__dirname + '/public/errors.html');
});

app.get('/research/html/login', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/research/html/register', function(req, res) {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/research/html/addpoll', function(req, res) {
    res.sendFile(__dirname + '/public/addpoll.html');
});

app.get('/research/html/vote', function(req, res) {
    res.sendFile(__dirname + '/public/vote.html');
});

app.get('/research/html/poll', function(req, res) {
    res.sendFile(__dirname + '/public/poll.html');
});


app.listen(process.env.PORT || 5000);