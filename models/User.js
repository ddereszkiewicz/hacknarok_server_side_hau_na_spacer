const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const userSchema = new Schema({
    login: String,
    email: String,
    registrationDate: Date,
    post:[{type: Schema.Types.ObjectId, ref:"Post"}]
});

module.exports = model('User', userSchema);