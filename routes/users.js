const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Dog = require("../models/Dog");
const Post = require("../models/Post");
const Opinion = require("../models/Opinion");

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

    const user_ID_dogs = user.dogsArray;
    let dogs = [];
    for (const idDog of user_ID_dogs) {
      let dog = await Dog.findById(idDog);
      dogs.push(dog);
    }
    user.dogsArray = dogs;

    const user_ID_posts = user.postsArray;
    let posts = [];
    for (const idPost of user_ID_posts) {
      let post = await Post.findById(idPost);
      posts.push(post);
    }
    user.postsArray = posts;

    const user_ID_opinions = user.opinionsArray;
    let opinions = [];
    for (const idOpinion of user_ID_opinions) {
      let opinion = await Opinion.findById(idOpinion);
      opinions.push(opinion);
    }
    user.opinionsArray = opinions;

    const user_ID_rates = user.usersToRate;
    let rates = [];
    for (const idUser2 of user_ID_rates) {
      let rate = await User.findById(idUser2);
      rates.push(rate);
    }
    user.usersToRate = rates;

    const user_ID_jobs = user.jobsArray;
    let jobs = [];
    for (const idJob of user_ID_jobs) {
      let job = await Post.findById(idJob);
      jobs.push(job);
    }
    user.jobsArray = jobs;

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
        let post = await Post.findById(idPost);
        let newResponses = [];
        for (const idResponse of post.responses) {
          let user1 = await User.findById(idResponse);
          newResponses.push(user1);
        }
        post.responses = newResponses;
        posts.push(post);
      }
      user[0].postsArray = posts;

      const user_ID_opinions = user[0].opinionsArray;
      let opinions = [];
      for (const idOpinion of user_ID_opinions) {
        let opinion = await Opinion.findById(idOpinion);
        opinions.push(opinion);
      }
      user[0].opinionsArray = opinions;

      const user_ID_rates = user[0].usersToRate;
      let rates = [];
      for (const idUser of user_ID_rates) {
        let rate = await User.findById(idUser);
        rates.push(rate);
      }
      user[0].usersToRate = rates;

      const user_ID_jobs = user[0].jobsArray;
      let jobs = [];
      for (const idJob of user_ID_jobs) {
        let job = await Post.findById(idJob);
        jobs.push(job);
      }
      user[0].jobsArray = jobs;

      return res.send(user[0]);
    } else {
      return res.send(false);
    }
  } catch (error) {
    return res.send({ error });
  }
});

// const nodemailer = require("nodemailer");

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
        profileRating: (Math.random() * (1.00 - 5.00) + 5.00).toFixed(2),
        password: password,
        firstName: firstName,
        lastName: lastName,
        describeUser: describeUser,
        userAge: userAge,
      });
      const result = await newUser.save();
      // let transport = nodemailer.createTransport({
      //   host: "smtp.mailtrap.io",
      //   port: 2525,
      //   auth: {
      //     user: "bcd31c830cf25b",
      //     pass: "80620bc8c57556",
      //   },
      // });
      // const message = {
      //   from: "HauNaSpacer@poland.pl",
      //   to: email,
      //   subject: "Witamy na stronie HauNaSpacer.pl",
      //   text: `${firstName} Cieszymy się ,że zarejestrowałeś się na naszej stronie!`,
      // };
      // transport.sendMail(message, function (err, info) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(info);
      //   }
      // });
      return res.send(result);
    } else {
      return res.send(false);
    }
  } catch (error) {
    return res.send(false);
  }
});

router.post("/user-dogs", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const user_ID_dogs = user.dogsArray;
    let dogs = [];
    for (const idDog of user_ID_dogs) {
      let dog = await Dog.findById(idDog);
      dogs.push(dog);
    }
    user.dogsArray = dogs;
    return res.send(dogs);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/user-posts", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const user_ID_posts = user.postsArray;
    let posts = [];
    for (const idPost of user_ID_posts) {
      let post = await Post.findById(idPost);
      posts.push(post);
    }
    user.postsArray = posts;
    return res.send(posts);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/user-opinions", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const user_ID_opinions = user.opinionsArray;
    let opinions = [];
    for (const idOpinion of user_ID_opinions) {
      let opinion = await Opinion.findById(idOpinion);
      opinions.push(opinion);
    }
    user.opinionsArray = opinions;
    return res.send(opinions);
  } catch (error) {
    return res.send({ error });
  }
});

router.post("/user-to-rate-users", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    const user_ID_rates = user.usersToRate;
    let rates = [];
    for (const idUser of user_ID_rates) {
      let rate = await User.findById(idUser);
      rates.push(rate);
    }
    user.usersToRate = rates;
    return res.send(rates);
  } catch (error) {
    return res.send({ error });
  }
});

router.put("/edit-user", async (req, res) => {
  try {
    const idUser = req.body.idUser;
    const result = await User.findByIdAndUpdate(idUser, req.body);
    const user = await User.findById(idUser);

    const user_ID_dogs = user.dogsArray;
    let dogs = [];
    for (const idDog of user_ID_dogs) {
      let dog = await Dog.findById(idDog);
      dogs.push(dog);
    }
    user.dogsArray = dogs;

    const user_ID_posts = user.postsArray;
    let posts = [];
    for (const idPost of user_ID_posts) {
      let post = await Post.findById(idPost);
      posts.push(post);
    }
    user.postsArray = posts;

    const user_ID_opinions = user.opinionsArray;
    let opinions = [];
    for (const idOpinion of user_ID_opinions) {
      let opinion = await Opinion.findById(idOpinion);
      opinions.push(opinion);
    }
    user.opinionsArray = opinions;

    const user_ID_rates = user.usersToRate;
    let rates = [];
    for (const idUser2 of user_ID_rates) {
      let rate = await User.findById(idUser2);
      rates.push(rate);
    }
    user.usersToRate = rates;

    const user_ID_jobs = user.jobsArray;
    let jobs = [];
    for (const idJob of user_ID_jobs) {
      let job = await Post.findById(idJob);
      jobs.push(job);
    }
    user.jobsArray = jobs;

    return res.send(user);
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
