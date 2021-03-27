const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Dog = require("../models/Dog");
const Post = require("../models/Post");

router.get("/all-users", async (req, res) => {
  try {
    const all = await User.find();
    return res.send(all);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/user-by-id", async (req, res) => {
  try {
    const { idUser } = req.body;
    const user = await User.findById(idUser);
    return res.send(user);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/logging", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({
      email: email,
      password: password,
    });
    if (user.length === 1) {
      const user_ID_dogs = user[0].dogsArray;
      let dogs = [];

      for (const idDog of user_ID_dogs) {
        let dog = await Dog.findById(idDog);
        dogs.push(dog);
      }
      user[0].dogsArray = dogs;
      const user_ID_posts = user[0].postsArray;
      let posts = [];

      for (const idPost of user_ID_posts) {
        let post = await Posts.findById(idPost);
        posts.push(post);
      }
      user[0].postsArray = posts;

      const user_ID_opinions = user[0].opinionsArray;
      let opinions = [];

      for (const idOpinions of user_ID_opinions) {
        let opinion = await Posts.findById(idOpinions);
        opinions.push(opinion);
      }
      user[0].opinionsArray = opinions;

      return res.send(user[0]);
    } else {
      return res.send(false);
    }
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/add-user", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      describeUser,
      userAge,
    } = req.body;
    const isAny = await User.find({ email: email });

    if (isAny.length === 0) {
      const newUser = new User({
        email: email,
        profileRating: 0,
        password: password,
        firstName: firstName,
        lastName: lastName,
        describeUser: describeUser,
        userAge: userAge,
      });
      const result = await newUser.save();

      return res.send(result);
    } else {
      return res.send(false);
    }
  } catch (error) {
    return res.send(false);
  }
});

router.post("/users-dog", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const user_ID_dogs = user.dogsArray;
    let dogs = [];

    for (const idDog of user_ID_dogs) {
      let dog = await Dog.findById(idDog);
      dogs.push(dog);
    }
    return res.send(dogs);
  } catch (error) {
    return res.send({ error });
  }
});

router.put("/edit-user", async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const result = await User.findByIdAndUpdate(idUser, req.body);
    const updatedUser = await User.findById(idUser);
    return res.send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.send({ error });
  }
});

router.delete("/delete-user", async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const delUser = await User.findByIdAndDelete(idUser);
    return res.send(true);
  } catch (error) {
    console.log(error);
    return res.send({ error });
  }
});

module.exports = router;
