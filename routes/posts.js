const express = require("express");
const router = express.Router({ mergeParams: true });

const Post = require("../models/Post");
const User = require("../models/User");
const Dog = require("../models/Dog");

router.get("/all-posts", async (req, res) => {
  try {
    const all = await Post.find();
    return res.send(all);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("add-post", async (req, res) => {
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
    console.log(error);
    res.send(error);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     post = await Post.findById(id);
//     return res.send(post);
//   } catch (error) {
//     return res.send({ error });
//   }
// });

// router.post("/delete-post", async (req, res) => {
//   try {
//     const id = req.params.userId;
//     const post = new Post({ ...req.body, author: id });
//     const createdPost = await post.save();
//     await User.findByIdAndUpdate(id, { $push: { post: createdPost._id } });
//     return res.send(true);
//   } catch (error) {
//     return res.send(error);
//   }
// });

router.delete("/delete-post", async (req, res) => {
  try {
    const postId = req.body.postId;
    await Post.findByIdAndDelete(postId);
    return res.send(true);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
