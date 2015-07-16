
var crypto = require('crypto');
var express = require('express');

module.exports = function(app) {

    app.use(express.static('./public'));

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public');
        res.end()
    });

    var users = require('./controllers/users_controller');
    var polls = require('./controllers/polls_controller');

    app.get('/research/jstech/logout', function(req, res){
        req.session.destroy(function(){
            console.log('user logged out');
            res.json({ session: false });
            res.end()
         //   res.redirect('/research/jstech/');
        });
    });

    app.get('/research/jstech/session', function(req, res){
        console.log('API reached');
        if(req.session.user){
            console.log('The user is logged in');
            res.json({ session: true, username: req.session.username, user: req.session.user });
            res.end()
        }else{
            console.log('The user is NOT logged in');
            res.json({ session: false });
            res.end()
        }
    });

    app.post('/research/jstech/register', users.register);
    app.post('/research/jstech/user/delete', users.deleteUser);
    app.post('/research/jstech/login', users.login);

    app.post('/research/jstech/addpoll', poll.addpoll);
    app.post('/research/jstech/vote', poll.vote);

}

