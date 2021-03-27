const { Schema, model } = require("mongoose");

const opinionSchema = new Schema({
  describeOpinion: String,
  rating: Number,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Opinion", opinionSchema);
