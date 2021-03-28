const express = require("express");
const router = express.Router({ mergeParams: true });

const Post = require("../models/Post");
const User = require("../models/User");
const Dog = require("../models/Dog");
const { findById } = require("../models/User");

router.get("/all-posts", async (req, res) => {
  try {
    const all = await Post.find();
    for (let i = 0; i < all.length; i++) {
      const id = all[i].dogId;
      let dog = await Dog.findById(id);
      all[i].dogId = dog;
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
      visible: true,
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

router.post("/accept-post", async (req, res) => {
  try {
    const workerId = req.body.workerId;
    const postId = req.body.postId;
    await Post.findByIdAndUpdate(postId, { visible: false });
    await User.findByIdAndUpdate(workerId, {
      $push: { jobsArray: postId },
    });
    const post = findById(postId);
    const id = post.dogId;
    let dog = await Dog.findById(id);
    post.dogId = dog;
    const idUser = post.authorId;
    let user = await User.findById(idUser);
    post.authorId = user;
    return res.send(post);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/delete-post", async (req, res) => {
  try {
    const workerId = req.body.workerId;
    const postId = req.body.postId;
    const post = await Post.findById(postId);

    await User.findByIdAndUpdate(post.authorId, {
      $pull: { postsArray: postId },
    });
    await User.findByIdAndUpdate(post.authorId, {
      $push: { usersToRate: workerId },
    });
    await User.findByIdAndUpdate(workerId, {
      $pull: { jobsArray: postId },
    });
    await Post.findByIdAndDelete(postId);

    return res.send(postId);
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
