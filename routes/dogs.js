const express = require("express");
const router = express.Router({ mergeParams: true });

const Dog = require("../models/Dog");

router.get("/all-dogs", async (req, res) => {
  try {
    const all = await Dogs.find();
    return res.send(all);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/add-dog", async (req, res) => {
  try {
    const { describeDog, dogAge, dogName, breed, attitude } = req.body;
    const newDog = new Dog({
      describeDog: describeDog,
      dogAge: dogAge,
      dogName: dogName,
      breed: breed,
      attitude: attitude,
    });
    const result = await newDog.save();
    await User.findByIdAndUpdate(authorId, {
      $push: { dogsArray: result._id },
    });

    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
});
router.post("/edit-dog", async (req, res) => {
  try {
    const idDog = req.body.idDog;
    const result = await Dog.findByIdAndUpdate(idDog, req.body);
    const updatedDog = await Dog.findById(idDog);
    return res.send(updatedDog);
  } catch (error) {
    return res.send({ error });
  }
});

router.delete("/delete-dog", async (req, res) => {
  try {
    const dogId = req.body.dogId;
    const authorId = req.body.authorId;
    await Dog.findByIdAndDelete(dogId);
    await User.findByIdAndUpdate(authorId, { $pull: { dogsArray: dogId } });
    return res.send(true);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
