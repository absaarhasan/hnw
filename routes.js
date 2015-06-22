

var crypto = require('crypto');
var express = require('express');



module.exports = function(app) {

  app.use(express.static('./public'));


  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public');
  });
  /*
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
*/

  var users = require('./controllers/users_controller');

  /*
  app.use('/static', express.static( './static')).
      use('/lib', express.static( '../lib')
  );

  */
  app.get('/research/jstech/', function(req, res){
    if (req.session.user) {
      res.render('index', {username: req.session.username,
                           msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/research/jstech/login');
    }
  });
  app.get('/research/jstech/user', function(req, res){
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/research/jstech/login');
    }
  });
  app.get('/research/jstech/signup', function(req, res){
    if(req.session.user){
      res.redirect('/research/jstech/');
    }
    res.render('signup', {msg:req.session.msg});
  });
  app.get('/research/jstech/login',  function(req, res){
    if(req.session.user){
      res.redirect('/research/jstech/');
    }
    res.render('login', {msg:req.session.msg});
  });
  app.get('/research/jstech/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/research/jstech/login');
    });
  });
  app.post('/research/jstech/signup', users.signup);
  app.post('/research/jstech/user/update', users.updateUser);
  app.post('/research/jstech/user/delete', users.deleteUser);
  app.post('/research/jstech/login', users.login);
  app.get('/research/jstech/user/profile', users.getUserProfile);

}

