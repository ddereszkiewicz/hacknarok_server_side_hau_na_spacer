const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Opinion = require("../models/Opinions");

router.get("/all-opinions", async (req, res) => {
  try {
    const all = await Opinion.find();
    return res.send(all);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/add-opinion", async (req, res) => {
  try {
    const { describeOpinion, rating, authorId, evaluatedId } = req.body;

    const newOpinion = new Opinion({
      describeOpinion: describeOpinion,
      rating: rating,
      authorId: authorId,
      evaluatedId: evaluatedId,
    });
    const result = await newOpinion.save();
    const user= await User.findById(evaluatedId)
    const numberOfOpinions=user.opinionsArray.lenght
    const newrating=(user.rating*(numberOfOpinions-1)+rating)/numberOfOpinions
    await User.findByIdAndUpdate(evaluatedId, { $push: { opinionsArray: result._id } });
    await User.findByIdAndUpdate(evaluatedId, {   rating: newrating });
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
});
//zobaczymy potem :(
// router.put("/edit-opinion", async (req, res) => {
//   try {
//     const idUser = req.body.idUser;
//     const result = await User.findByIdAndUpdate(idUser, req.body);
//     const updatedUser = await User.findById(idUser);
//     return res.send(updatedUser);
//   } catch (error) {
//     console.log(error);
//     return res.send({ error });
//   }
// });



module.exports = router;
