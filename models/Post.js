const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  describePost: String,
  responses: [{ type: Schema.Types.ObjectId, ref: "User" }],
  contact: String,
  adressCity: String,
  adressDistrict: String,
  adressDetails: String,
  time: String,
  price: String,
  visible: Boolean,
  dogId: { type: Schema.Types.ObjectId, ref: "Dog" },
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Post", postSchema);
