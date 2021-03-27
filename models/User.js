const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: String,
    password: String,
    firstName: String,
    lastName:String,
    email: String,
    postsArray:[{type: Schema.Types.ObjectId, ref:"Post"}],
    dogsArray:[{type: Schema.Types.ObjectId, ref:"Dog"}],
    opinionsArray:[{type: Schema.Types.ObjectId, ref:"Opinion"}],
    profileRating: Number,
    describe: String,
    userAge: Number,
    usersToRate:[{type: Schema.Types.ObjectId, ref:"User"}]

});

module.exports = model('User', userSchema);