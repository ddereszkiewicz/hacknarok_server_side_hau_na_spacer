const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', async (req, res) => {
  try{
    const all=await User.find()
    return res.send(all)
  }
  catch(error){
    return res.send({error})
  }
});
router.post('/logging', async (req, res) => {
  try{
    const user=await User
    .aggregate()
    .match({login: {$eq:(req.body.login)},password: {$eq:(req.body.password)}})
    .length()
    
    return user ===1 ? true : false 
  }
  catch(error){
    return res.send({error})
  }
});
// router.get('/registration-raport', async (req, res) => {
//   try{
//     const raport=await User.aggregate()
//     .match({registrationDate:{$gte:new Date(req.query.date)}})
//     .group({_id:'$registrationDate',count: {$sum: 1}})
//     .project({_id:0,date:'$_id',count:1})
//     return res.send(raport)
//   }
//   catch(error){
//     return res.send({error})
//   }
// });
router.get("/mostPosts", async (req, res) => {
  try {
    const result = await User.aggregate()
      .unwind("post")
      .group({ _id: "$_id", count: { $sum: 1 }, login: { $first: "$login" } })
      .sort({ count: -1 })
      .limit(1);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.post('/', async (req, res) => {
  try{
    const {login,email,registrationDate}=req.body
    const newUser=new User({login,email,registrationDate})
    const wyn=await newUser.save()
    return res.send(wyn)
  }
  catch(error){
    return res.send({error})
  }
});


router.put('/:idUser', async (req, res) => {
  try{
    const id=req.params.idUser
    const all=await User.findByIdAndUpdate(id,req.body)
    return res.send(true)
  }
  catch(error){
    console.log(error);
    return res.send({error})
  }
});

router.delete('/:idUser', async (req, res) => {
  try{
    const id=req.params.idUser
    all=await User.findByIdAndDelete(id)
    return res.send(true)
  }
  catch(error){
    console.log(error);
    return res.send({error})
  }
});




module.exports = router;
