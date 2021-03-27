const express = require("express");
const router = express.Router({ mergeParams: true });

const Dog = require("../models/Dog");
const User = require("../models/User");

router.get("/all-dogs", async (req, res) => {
  try {
    const all = await Dog.find();
    return res.send(all);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/dogs-by-id", async (req, res) => {
  try {
    const { idDog } = req.body;
    const dog = await Dog.findById(idDog);
    return res.send(dog);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/add-dog", async (req, res) => {
  try {
    const {
      describeDog,
      dogAge,
      dogName,
      breed,
      attitude,
      authorId,
    } = req.body;

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
router.put("/edit-dog", async (req, res) => {
  try {
    const dogId = req.body.dogId;
    const result = await Dog.findByIdAndUpdate(dogId, req.body);
    const updatedDog = await Dog.findById(dogId);
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
