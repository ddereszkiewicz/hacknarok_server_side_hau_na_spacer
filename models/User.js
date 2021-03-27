const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    password: String,
    firstName: String,
    lastName:String,
    email: String,
    postsArray:[{type: Schema.Types.ObjectId, ref:"Post"}],
    dogsArray:[{type: Schema.Types.ObjectId, ref:"Dog"}],
    opinionsArray:[{type: Schema.Types.ObjectId, ref:"Opinion"}],
    profileRating: Number,
    describeUser: String,
    userAge: Number,
    usersToRate:[{type: Schema.Types.ObjectId, ref:"User"}]

});

module.exports = model('User', userSchema);