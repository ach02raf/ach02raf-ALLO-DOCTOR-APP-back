let jwt=require('jsonwebtoken');
let mongoose=require('mongoose');
let User=mongoose.model('User');

const {jwtkey} =require('../backend/keys');
module.exports=(req,res,next)=>{

let { authorization }=req.headers;
if(!authorization){

    return res.status(401).send({error:"acces refuser!!"});
}
let token =authorization.replace("Bearer ","");
jwt.verify(token,jwtkey,async (err,payload)=>{

    if(err){
        res.status(401).send({error:"erreur"});
    }
    let {userId}=payload;
    let user= await User.findById(userId);
    req.user= user ;
    next();
})
};
