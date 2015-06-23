
var crypto = require('crypto');
var express = require('express');

module.exports = function(app) {

  app.use(express.static('./public'));

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public');
  });

  var users = require('./controllers/users_controller');

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

