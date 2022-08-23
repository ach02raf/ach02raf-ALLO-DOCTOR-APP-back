let  express =require('express');
let mongoose= require('mongoose');
let jwt= require('jsonwebtoken');
let  router = express.Router();
let User=mongoose.model('User');
let {jwtkey}=require('../backend/keys');


router.post('/inscri', async (req,res)=>{
    console.log('Post connect');

   let  {password,nom,prenom,tel,sexe,ville,cin,adresse,notification,message,mydoctor,photo,rvd}=req.body;
   try {
       let user;

            user = new User({password,nom,prenom,tel,sexe,ville,cin,adresse,notification,message,mydoctor,photo,rvd});
       await user.save();
      let token =jwt.sign({userId:user._id},jwtkey);
       res.send({token});

       console.log(' inscri posted');
   }
   catch(err){
       console.log(' inscri failed');
      return  res.send({error:'failed'});
   }
});
router.post('/cnx',async (req,res)=>{
    const {tel,password}=req.body;
    if(!tel || !password){
        return res.status(422).send({error:" user not found !!  "});
    }
   const user=await User.findOne({tel});
    if(!user){
        return res.status(422).send({error:"email not found !! "});
    }
    try{
        await user.comparePassword(password);
        let token =jwt.sign({userId:user._id},jwtkey);
        res.send({token});
    }
    catch(err){
        return res.status(422).send({error:"password not found !! "});
    }
console.log('connected');
});
router.post('/motpassoblier',async (req,res)=>{
    const {tel}=req.body;
    const user=await User.findOne({tel});
    if(!user){
        return res.status(422).send({error:"email not found !! "});
    }
    try{

        res.send({tel:user.tel,nom:user.nom,prenom:user.prenom,id:user.id});
    }
    catch(err){
        return res.status(422).send({error:"compte not found !! "});
    }
    console.log('connected');
});





router.post('/cnxfb',async (req,res)=>{
    const {tel,password}=req.body;
    if(!tel || !password){
        return res.status(422).send({error:" not found !!  "});
    }
    const user=await User.findOne({tel});
    if(!user){
        return res.status(422).send({error:" not found !! "});
    }
    try{
        await user.comparePassword(password);
        let token =jwt.sign({userId:user._id},jwtkey);
        res.send({token});
    }
    catch(err){
        return res.status(422).send({error:" not found !! "});
    }
    console.log('connected');
});



module.exports=router;
