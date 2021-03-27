const express = require("express");
const router = express.Router({ mergeParams: true });

const Post = require("../models/Post");
const User = require("../models/User");
const Dog = require("../models/Dog");

router.get("/all-posts", async (req, res) => {
  try {
    const all = await Post.find();
    for (let i = 0; i < all.length; i++){
    const ID_dogs = Post[i].dogsArray;
    let dogs = [];
      for (const idDog of ID_dogs) {
        let dog = await Dog.findById(idDog);
        dogs.push(dog);
      }
      all[i].dogsArray = dogs;
    }
    
    return res.send(all);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/post-by-id", async (req, res) => {
  try {
    const { idPost } = req.body;
    const post = await Post.findById(idPost);
    return res.send(post);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/add-post", async (req, res) => {
  try {
    const {
      describePost,
      contact,
      adressCity,
      adressDistrict,
      adressDetails,
      time,
      price,
      dogId,
      authorId,
    } = req.body;
    const newPost = new Post({
      describePost: describePost,
      contact: contact,
      adressCity: adressCity,
      adressDistrict: adressDistrict,
      adressDetails: adressDetails,
      time: time,
      price: price,
      dogId: dogId,
      authorId: authorId,
    });
    const result = await newPost.save();
    await User.findByIdAndUpdate(authorId, {
      $push: { postsArray: result._id },
    });
    return res.send(result);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/add-response", async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await Post.findByIdAndUpdate(postId, { $push: { responses: userId } });

    res.send(true);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete-post", async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await Post.findById(postId);
    await User.findByIdAndUpdate(post.authorId, {
      $pull: { postsArray: postId },
    });
    await Post.findByIdAndDelete(postId);
    return res.send(true);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/users-responded", async (req, res) => {
  try {
    const postId = req.body.postId;
    const post = await Post.findById(postId);
    const responded_ID_users = post.responses;
    let responded_users = [];

    for (const idUser of responded_ID_users) {
      let user = await User.findById(idUser);
      responded_users.push(user);
    }
    return res.send(responded_users);
  } catch (error) {
    return res.send({ error });
  }
});

module.exports = router;
