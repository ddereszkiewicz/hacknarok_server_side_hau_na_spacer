const { response } = require('express');
const express = require('express');
const router = express.Router({mergeParams: true});

const Post = require('../models/Post');
const User = require('../models/User');
router.get('/', async (req, res) => {
  try{
    all=await Post.find()
    return res.send(all)
  }
  catch(error){
    return res.send({error})
  }
});
router.get('/summary', async (req, res) => {
  try{
    summary=await Post.aggregate()
    .match({})
    .group({
        _id:null,
        avg:{$avg:'$responses'},
        all:{$sum:'$responses'},
        max:{$max:'$responses'},
        min:{$min:'$responses'},


    })
    .project({_id:0})

    return res.send(summary);
  }
  catch(error){
    return res.send(error)
  }
});
router.get('/authors', async (req, res) => {
  try{
    authors=await Post.aggregate()
    .match({})
    .lookup({from: 'users', localField: 'author', foreignField: '_id', as: 'users'})
    .group({_id:'$users.email', posts:{$sum: 1}})
    .project({_id:0,email:'$_id',posts:1})

    return res.send(authors);
  }
  catch(error){
    return res.send(error)
  }
});
router.get("/mostPosts", async (req, res) => {
  try {
    const result = await User.aggregate()
      .unwind("posts")
      .group({ _id: "$_id", count: { $sum: 1 }, login: { $first: "$login" } })
      .sort({ count: -1 })
      .limit(1);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
     try{
       const id=req.params.id
      post=await Post.findById(id)
      return res.send(post)
    }
    catch(error){
      return res.send({error})
    }
});

router.post('/:userId', async (req, res) => {
  try{
    const id=req.params.userId
   const post=new Post({...req.body,author:id})
   const createdPost = await post.save();
   await User.findByIdAndUpdate(id, { '$push': { 'post': createdPost._id } });
   return res.send(true)
 }
 catch(error){
   return res.send(error)
 }
});

router.delete('/:id', async (req, res) => {
  try{
    const id=req.params.id
   const delPost = await Post.findByIdAndDelete(id)
   await User.findByIdAndUpdate(req.params.idUser, { '$pull': { 'post':id } });
   return res.send(true)
 }
 catch(error){
   return res.send(error)
 }
  
 
});


module.exports = router;
