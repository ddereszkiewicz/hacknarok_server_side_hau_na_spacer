const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  password: {
    type: String,
    match: [
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
      "Hasło musi posiadać przynajmniej 1 cyfrę, 1 małą literę, 1 wielką literę oraz być długości od 8 do 32 znaków",
    ],
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Proszę wprowadzić prawidłowy adres email."],
  },
  jobsArray: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  postsArray: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  dogsArray: [{ type: Schema.Types.ObjectId, ref: "Dog" }],
  opinionsArray: [{ type: Schema.Types.ObjectId, ref: "Opinion" }],
  profileRating: Number,
  describeUser: String,
  userAge: Number,
  usersToRate: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("User", userSchema);
