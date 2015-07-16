var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: { type: String, unique: true, required: 'Email required', validate: [validateEmail, 'Please provide a valid email']  },
    username: { type: String, required: 'Username required'},
    hashed_password: { type: String, required: 'Password required'  }
});

function validateEmail(email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email)

}

mongoose.model('User', UserSchema);