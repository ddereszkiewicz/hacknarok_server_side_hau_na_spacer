const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/all-users", async (req, res) => {
  try {
    const all = await User.find();
    return res.send(all);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/logging", async (req, res) => {
  try {
    const {  email,password } = req.body;
    const user = await User.find({
      email: email,
      password: password,
    });
    return res.send( user.length === 1 ? true : false)
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
        // postsArray:[],
        profileRating:0,
        // opinionsArray:[],
        // usersToRate:[],
        // dogsArray:[],
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
