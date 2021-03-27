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
    console.log(error);
    res.send(error);
  }
});

router.delete("/delete-post", async (req, res) => {
  try {
    const postId = req.body.postId;
    const authorId = req.body.authorId;
    await Post.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(authorId, { $pull: { postsArray: postId } });
    return res.send(true);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/users-responded", async (req, res) => {
  try {
    const postId = req.body.postId;
    //to może nie działać 
    const responded_users = await Post.aggregate()
      .match({ _id: postId })
      .lookup({
        from: "users",
        localField: "responses",
        foreignField: "_id",
        as: "users",
      })
      .project({ _id: 0, users: 1 });

    return res.send(responded_users);
  } catch (error) {
    return res.send({ error });
  }
});

module.exports = router;
