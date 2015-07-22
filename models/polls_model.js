var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Subdocument schema for poll author
var AuthorSchema = new Schema({
    user: { type: String, required: 'User ID required'  },
    username: { type: String, required: 'Username required'}

});

// Subdocument schema for poll options
var OptionsSchema = new Schema({
    option1: { type: String, required: 'A minimum of two options required' },
    option2: { type: String, required: 'A minimum of two options required' },
    option3: { type: String },
    option4: { type: String },
    option5: { type: String },
    total: { type: Number }

});

// Subdocument schema for votes tally
var TallySchema = new Schema({
    option1: { type: Number },
    option2: { type: Number },
    option3: { type: Number },
    option4: { type: Number },
    option5: { type: Number },
    total: { type: Number, index: true}
});

// Subdocument schema for votes
var VotesSchema = new Schema({
    user: { type: String, required: 'User ID required'  },
    username: { type: String, required: 'Username required'},
    vote: { type: String, required: 'Vote required'  },
    comment: { type: String, required: 'Comment required'  },
    posted: { type: Date }

});

// Polls schema

var PollsSchema = new Schema({
    question: { type: String, required: 'Poll question required' },
    author: [AuthorSchema],
    posted: { type: Date , index: true , default: Date.now},
    options: [OptionsSchema],
    tally: [TallySchema],
    votes: [VotesSchema]
})


/*
// Document schema for polls
exports.PollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    choices: [choiceSchema]
});

*/

mongoose.model('Poll', PollsSchema);