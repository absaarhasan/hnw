
var mongoose = require('mongoose'),
    Poll = mongoose.model('Poll'),
    User = mongoose.model('User');

exports.addpoll = function(req, res, next){

    console.log('hit controller');
    var poll = new Poll({
        question: req.body.question ,
        author: [
                    {
                        user: req.session.user,
                        username: req.session.username
                    }
                ],
        tally: [
            {
                option1: 0,
                option2: 0,
                option3: 0,
                option4: 0,
                option5: 0,
                total: 0
            }
        ],
        options: [
                {
                    option1: req.body.option1,
                    option2: req.body.option2,
                    option3: req.body.option3,
                    option4: req.body.option4,
                    option5: req.body.option5,
                    total: req.body.total
                }
            ]
    });

  poll.save(function(err, data) {
        if (err){
            console.log("Poll Test Error");
            console.log(err);
            res.send(err);
            res.end();
        } else {
            var pollid = data._id;
            res.json({ message: 'New poll added', pollid: pollid });
            req.pollid = pollid;
            console.log('NEW POLL:');
            console.log(data);
            next();
        }
    });

};

exports.updateUserPolls = function(req, res){


    User
        .findOne({_id: req.session.user})
        .exec(function(err, user){
            if(err) {
                console.log('There has been an error.');
                console.log(err);
            } else {
                console.log('Everything appears to have worked.');
                user.polls.push({pollid: req.pollid});
                user.save();
                console.log(user);
            }
        });

    res.end();

};

exports.vote = function(req, res, next){


    Poll
        .findOne({_id: req.body.pollid})
        .exec(function(err, poll){
            if(err) {
                console.log('Could not find poll -- error!');
                console.log(err);
                res.send(err);
                res.end();
            } else {
                console.log('Poll found.');
                poll.votes.push({user: req.session.user , username: req.session.username , vote: req.body.option , comment: req.body.comment , posted : Date.now });

                poll.save();
                console.log(poll);
                res.json({ message: 'Vote cast!'});

                next();

            }
        });

};

exports.updateVoteTally = function(req, res, next){

    console.log("Poll id = " + req.body.pollid );

    console.log('option = ' + req.body.optionNumber);

    switch (req.body.optionNumber) {
        case "option1":
            console.log("Option 1 reached");
            Poll.findByIdAndUpdate( req.body.pollid , { $inc: { "tally.0.option1" : 1 }}).exec();
            break;
        case "option2":
            console.log("Option 2 reached");
            Poll.findByIdAndUpdate( req.body.pollid , { $inc: { "tally.0.option2" : 1 }}).exec();
            break;
        case "option3":
            Poll.findByIdAndUpdate( req.body.pollid , { $inc: { "tally.0.option3" : 1 }}).exec();
            break;
        case "option4":
            Poll.findByIdAndUpdate( req.body.pollid , { $inc: { "tally.0.option4" : 1 }}).exec();
            break;
        case "option5":
            Poll.findByIdAndUpdate( req.body.pollid , { $inc: { "tally.0.option5" : 1 }}).exec();
            break;
    }

    Poll
        .findByIdAndUpdate( req.body.pollid , { $inc: { "tally.0.total" : 1 }})
        .exec(function(err, data) {
            if (err) {
                console.log('Error, cant update poll tally');
                console.log(err);
            }
            else {
                console.log('Poll tally success');
                console.log(data);
            }
        });

    next();

};


exports.updateUserVotes = function(req, res){

    User
        .findOne({_id: req.session.user})
        .exec(function(err, user){
            if(err) {
                console.log('Not able to find the user to update their vote record');
                console.log(err);
                res.end();
            } else {
                console.log('Voting user found.');
                user.votes.push({pollid: req.body.pollid , vote: req.body.option });
                user.save();
                console.log('Their record has been updated');
                console.log(user);
                res.end();
            }
        });

};


