var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}

exports.register = function(req, res){

  var user = new User({username:req.body.username});
  if(req.body.password){
    user.set('hashed_password', hashPW(req.body.password));
  }
  user.set('email', req.body.email);
  user.save(function(err, data) {
    if (err){
     // res.session.error = err;
      console.log("Registration Schema Error");
      console.log(err);
      res.send(err);
      res.end();
    } else {

      req.session.user = data._id;
      console.log(req.session.user);
      req.session.username = data.username;
  //    req.session.msg = 'Authenticated as ' + user.username;
      console.log("Registration successful");
      res.json({ message: 'Registration complete', session: true, username: req.session.username, user: req.session.user });
      res.end();
    }
  });
};

exports.login = function(req, res){
  User.findOne({ email: req.body.email })
  .exec(function(err, user) {
        if (err){
            console.log("Login DB error");
            console.log(err);
            res.json({ message: 'Oops ... server error!', session: false});
            res.end();
        } else if (!user){
            console.log("User not found");
            res.json({ message: 'Email or password are incorrect.', session: false});
            res.end();
        } else if (user.hashed_password === hashPW(req.body.password.toString())) {
            req.session.regenerate(function(){
                req.session.user = user._id;
                req.session.username = user.username;
                res.json({ message: 'Login success!', session: true, username: req.session.username, user: req.session.user });
                res.end();
            });
        } else {
          console.log("Password incorrect");
          res.json({ message: 'Email or password are incorrect.', session: false});
          res.end();
        }
  });
};


