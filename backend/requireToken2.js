let jwt=require('jsonwebtoken');
let mongoose=require('mongoose');
let Doctor=mongoose.model('Doctor');

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
        let doctor= await Doctor.findById(userId);
        req.doctor= doctor ;
        next();
    })
};
