const { Schema, model } = require("mongoose");

const dogSchema = new Schema({
  describeDog: String,
  dogAge: Number,
  dogName: String,
  breed: String,
  attitude: String,
});

module.exports = model("Dog", dogSchema);
