var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Subdocument schema for user polls
var UserPollsSchema = new Schema({
    pollid: { type: String }
});

// Subdocument schema for user votes
var UserVotesSchema = new Schema({
    pollid: { type: String  },
    vote: { type: String }

});

// User schema

var UserSchema = new Schema({
    email: { type: String, unique: true, required: 'Email required', validate: [validateEmail, 'Please provide a valid email']  },
    username: { type: String, required: 'Username required'},
    hashed_password: { type: String, required: 'Password required' },
    polls: [UserPollsSchema],
    votes: [UserVotesSchema]
});

function validateEmail(email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email)

}

mongoose.model('User', UserSchema);